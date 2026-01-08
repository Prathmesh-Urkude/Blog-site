import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicUrl: {
        type: String,
        default: "/public/images/avatar.png"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
{timestamps: true});

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return;

    const saltRounds = 10;
    this.password = await bcrypt.hash(user.password, saltRounds);
});

const User = mongoose.model('User', userSchema);

export default User;