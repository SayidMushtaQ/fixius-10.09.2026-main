const getDistanceAggrQuery = (long: number, lat: number) => {
  const query: any = [
    {
      $geoNear: {
        near: [long, lat],
        spherical: true,
        distanceField: "distance", // Field to store calculated distance
        key: "location.coordinates", // Field containing the coordinates
        distanceMultiplier: 0.001, // Convert distance to kilometers
      },
    },
    {
      $addFields: {
        distance: { $round: "$distance" }, // Round the distance to the nearest integer
      },
    },
  ];
  return query;
};
export default getDistanceAggrQuery;
