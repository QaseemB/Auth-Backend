import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  providerID: { type: String, required: true, unique: true, enum: ['google', 'soundcloud', 'spotify']},
  accesToken: String,
  refreshToken: String,
}, {_id: false});




const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    sparse:true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  provider: {type: [providerSchema], default: []},
 }, {timestamps: true, versionKey: false },
);

function scrub(_, ret) {
  delete ret.password;
  delete ret._id;
  return ret;
}

userSchema.set('toJSON', {
  virtuals: true,
  transform: scrub
});

userSchema.set('toObject',{
  virtuals: true,
  transform: scrub
});

const USERS = mongoose.model("users",userSchema);

export default USERS
