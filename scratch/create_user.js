const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  role: { type: String, enum: ['kunde', 'handwerker', 'admin'] },
  password: { type: String },
  status: { type: Boolean, default: true },
  active_status: { type: String, default: 'active' },
  ip: { type: String, default: '127.0.0.1' },
  address: {
    placeName: String,
    zipCode: String
  },
  craftsman: { type: mongoose.Schema.Types.ObjectId, ref: 'Craftsman' }
}, { timestamps: true });

const craftsmanSchema = new mongoose.Schema({
  company_name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'userDb' },
  status: { type: String, default: 'verified' }
}, { timestamps: true });

const User = mongoose.models.userDb || mongoose.model('userDb', userSchema, 'users');
const Craftsman = mongoose.models.Craftsman || mongoose.model('Craftsman', craftsmanSchema, 'craftsmen');

async function createTestUser() {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URL);
    console.log("Connected to DB");
    
    const email = 'premium_handwerker@example.com';
    const existing = await User.findOne({ email });
    if (existing) {
       console.log("User already exists. Deleting...");
       await User.deleteOne({ _id: existing._id });
       if (existing.craftsman) {
         await Craftsman.deleteOne({ _id: existing.craftsman });
       }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('TestPassword123!', salt);

    const newUser = new User({
      name: 'Max',
      lastName: 'Mustermann',
      email: email,
      role: 'handwerker',
      password: hashedPassword,
      status: true,
      active_status: 'active',
      ip: '127.0.0.1',
      address: {
        placeName: 'Berlin',
        zipCode: '10115'
      }
    });

    const newCraftsman = new Craftsman({
      company_name: 'Mustermann Handwerk GmbH',
      user: newUser._id,
      status: 'verified'
    });

    newUser.craftsman = newCraftsman._id;

    await newCraftsman.save();
    await newUser.save();

    console.log("SUCCESS: Created user premium_handwerker@example.com with password TestPassword123!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

createTestUser();
