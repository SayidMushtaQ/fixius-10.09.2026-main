// import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PostalCode from '../backend/models/PostalCode';

// dotenv.config();

const uri = process.env.NEXT_MONGO_URL;

if (!uri) {
  console.error("❌ NEXT_MONGO_URL is not defined");
  process.exit(1);
}

mongoose.connect(uri)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const search = "121";
    console.log(`🔍 Searching for postal code: ${search}`);

    // Check exact match on Postal_Code (number)
    const exactMatch = await PostalCode.find({ Postal_Code: parseInt(search) });
    console.log(`🔢 Exact match count: ${exactMatch.length}`);
    if (exactMatch.length > 0) console.log(JSON.stringify(exactMatch[0], null, 2));

    // Check partial match logic from controller
    const numericSearch = parseInt(search);
    let controllerResult = [];
    if (!isNaN(numericSearch)) {
        // Use aggregation to match partial postal codes (convert number to string)
        controllerResult = await PostalCode.aggregate([
            {
                $addFields: {
                    postalCodeStr: { $toString: "$Postal_Code" }
                }
            },
            {
                $match: {
                    postalCodeStr: { $regex: new RegExp(`^${search}`) }
                }
            },
            { $limit: 20 }
        ]);
    }
    console.log(`🛠 Controller logic result count: ${controllerResult.length}`);

    // Check if it might be stored as string or if there are similar codes
    // const regexMatch = await PostalCode.find({ Postal_Code: { $regex: new RegExp(`^${search}`) } }).limit(5); // This will fail if Postal_Code is number
    // console.log(`🔤 Regex match count (if string): ${regexMatch.length}`); // Commented out as it will likely error on Number type

    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
