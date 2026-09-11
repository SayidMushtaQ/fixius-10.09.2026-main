import { connectDb } from "@/backend/middleware/db";
import PostalCode from "@/backend/models/PostalCode";
import userDb from "@/backend/models/userModel";

function generateSearchVariations(term: string): string[] {
  const variations = new Set<string>();
  variations.add(term);

  // Common German replacements
  const replacements: [string, string][] = [
    ["ae", "ä"],
    ["oe", "ö"],
    ["ue", "ü"],
    ["ss", "ß"],
  ];

  function generate(current: string, index: number) {
    if (index >= replacements.length) {
      variations.add(current);
      return;
    }

    const [search, replace] = replacements[index];
    if (current.includes(search)) {
      generate(current.replace(new RegExp(search, "g"), replace), index + 1);
    }
    generate(current, index + 1);
  }

  generate(term, 0);
  return Array.from(variations);
}

export type SearchHandymenParams = {
  service: string;
  city: string;
  pageSize?: number;
  pageNumber?: number;
  rating?: string;
  distance?: number;
};

export type SearchHandymenResult = {
  users: any[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export async function searchHandymen({
  service,
  city,
  pageSize = 10,
  pageNumber = 1,
  rating,
  distance,
}: SearchHandymenParams): Promise<SearchHandymenResult> {
  await connectDb();

  const emptyResult: SearchHandymenResult = {
    users: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: pageNumber,
  };

  if (!service || !city) {
    return emptyResult;
  }

  let currentLatitude: number | null = null;
  let currentLongitude: number | null = null;

  const userInCity = await userDb.findOne({
    "address.placeName": city,
    "address.coordinates.lat": { $exists: true },
  });

  if (userInCity) {
    currentLatitude = userInCity.address.coordinates.lat;
    currentLongitude = userInCity.address.coordinates.lng;
  } else {
    const postal = await PostalCode.findOne({ Place_Name: city });
    if (postal && postal.Latitude && postal.Longitude) {
      currentLatitude = Number(postal.Latitude);
      currentLongitude = Number(postal.Longitude);
    }
  }

  if (!currentLatitude || !currentLongitude) {
    return emptyResult;
  }

  const R = 6371; // Radius of Earth in KM
  const distanceInKiloMeters = distance || 50;

  const serviceString = String(service).split("-").join(" ");

  const lastStage: any = [
    {
      $sort: {
        distance: 1,
        avgRating: -1,
        "craftsman.statusOrder": 1,
      },
    },
  ];

  if (rating) {
    lastStage.unshift({
      $match: {
        avgRating: {
          $gte: Number(rating),
        },
      },
    });
  }

  const finalPipeline: any = [
    {
      $match: {
        role: "handwerker",
        "address.coordinates.lat": { $exists: true },
        "address.coordinates.lng": { $exists: true },
      },
    },
    {
      $addFields: {
        distance: {
          $multiply: [
            R,
            {
              $acos: {
                $max: [
                  -1,
                  {
                    $min: [
                      1,
                      {
                        $add: [
                          {
                            $multiply: [
                              { $cos: { $degreesToRadians: "$address.coordinates.lat" } },
                              { $cos: { $degreesToRadians: currentLatitude } },
                              {
                                $cos: {
                                  $subtract: [
                                    { $degreesToRadians: "$address.coordinates.lng" },
                                    { $degreesToRadians: currentLongitude },
                                  ],
                                },
                              },
                            ],
                          },
                          {
                            $multiply: [
                              { $sin: { $degreesToRadians: "$address.coordinates.lat" } },
                              { $sin: { $degreesToRadians: currentLatitude } },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        distance: { $lte: distanceInKiloMeters },
      },
    },
    {
      $lookup: {
        from: "postalcodes",
        localField: "address",
        foreignField: "_id",
        as: "postalData",
      },
    },
    {
      $unwind: {
        path: "$postalData",
        preserveNullAndEmptyArrays: true,
      },
    },
    { $addFields: { admin_name: "$postalData.Admin_Name" } },
    {
      $lookup: {
        from: "craftsmen",
        localField: "craftsman",
        foreignField: "_id",
        as: "craftsman",
      },
    },
    {
      $unwind: "$craftsman",
    },
    {
      $match: {
        "craftsman.services": {
          $regex: new RegExp(generateSearchVariations(serviceString).join("|"), "i"),
        },
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "craftsman.reviews",
        foreignField: "_id",
        as: "reviews",
      },
    },
    {
      $unwind: {
        path: "$reviews",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        profile_photo: { $first: "$profile_photo" },
        address: { $first: "$address" },
        admin_name: { $first: "$admin_name" },
        role: { $first: "$role" },
        craftsman: { $first: "$craftsman" },
        distance: { $first: "$distance" },
        avgRating: { $avg: "$reviews.rating" },
      },
    },
    {
      $addFields: {
        "craftsman.statusOrder": {
          $switch: {
            branches: [
              {
                case: { $eq: ["$craftsman.status", "verified"] },
                then: 0,
              },
              {
                case: { $eq: ["$craftsman.status", "unverified"] },
                then: 1,
              },
            ],
            default: 2,
          },
        },
      },
    },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        data: lastStage,
      },
    },
  ];

  const results = await userDb.aggregate(finalPipeline);

  if (!results || results.length === 0) {
    return emptyResult;
  }

  const totalCount = results[0]?.totalCount[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / Number(pageSize));
  const users = results[0]?.data || [];

  return {
    users,
    totalCount,
    totalPages,
    currentPage: Number(pageNumber),
  };
}
