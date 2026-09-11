const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const userSchema = new mongoose.Schema({
  email: String,
  role: String,
  status: Boolean
});

const User = mongoose.models.userDb || mongoose.model('userDb', userSchema, 'users');

async function findAdmin() {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URL);
    console.log("Connected to DB");
    
    const admin = await User.findOne({ role: 'admin' });
    if (admin) {
      console.log("FOUND_ADMIN_EMAIL:" + admin.email);
    } else {
      console.log("NO_ADMIN_FOUND");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

findAdmin();
