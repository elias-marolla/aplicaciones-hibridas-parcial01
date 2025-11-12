import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    password: { 
      type: String, 
      required: true 
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
}, { 
  timestamps: true 
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;