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

async function findUser() {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URL);
    console.log("Connected to DB");
    
    const user = await User.findOne({ role: 'handwerker', status: true });
    if (user) {
      console.log("FOUND_USER_EMAIL:" + user.email);
    } else {
      console.log("NO_USER_FOUND");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

findUser();
