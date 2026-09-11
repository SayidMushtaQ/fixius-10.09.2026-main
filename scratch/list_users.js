const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  status: Boolean
});

const User = mongoose.models.userDb || mongoose.model('userDb', userSchema, 'userdbs');

async function listUsers() {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URL);
    console.log("Connected to DB");
    
    const users = await User.find();
    console.log(`Found ${users.length} users:`);
    users.forEach(u => {
      console.log(`- ${u.name} | ${u.email} | Role: ${u.role} | Status: ${u.status}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

listUsers();
