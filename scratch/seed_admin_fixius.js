const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: { type: String, required: true },
  role: String,
  status: Boolean,
  active_status: String,
  address: {
    placeName: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  ip: String
}, { timestamps: true });

const User = mongoose.models.userDb || mongoose.model('userDb', userSchema, 'userdbs');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URL);
    console.log("Connected to DB");

    const email = "admin@fixius.de";
    const password = "Password123";
    
    // Hash password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      existing.password = hashedPassword;
      existing.role = "admin";
      existing.status = true;
      existing.active_status = "active";
      await existing.save();
      console.log(`Updated existing admin user: ${email}`);
    } else {
      const newAdmin = new User({
        name: "Fixius",
        lastName: "Admin",
        email: email,
        password: hashedPassword,
        role: "admin",
        status: true,
        active_status: "active",
        address: {
          placeName: "Berlin",
          zipCode: "10115",
          coordinates: { lat: 52.52, lng: 13.405 }
        },
        ip: "127.0.0.1"
      });
      await newAdmin.save();
      console.log(`Created new admin user successfully: ${email}`);
    }
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();
