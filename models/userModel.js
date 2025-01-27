import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date_of_birth: { type: String, required: false },
    role: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

export default User;