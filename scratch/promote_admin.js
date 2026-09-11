const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const userSchema = new mongoose.Schema({
  email: String,
  role: String
});

const User = mongoose.models.userDb || mongoose.model('userDb', userSchema, 'userdbs');

async function promoteAdmin() {
  try {
    await mongoose.connect(process.env.NEXT_MONGO_URL);
    console.log("Connected to DB");
    
    const res = await User.updateOne({ email: 'mexeba8248@hilostar.com' }, { role: 'admin' });
    console.log("Promotion result:", res);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

promoteAdmin();
