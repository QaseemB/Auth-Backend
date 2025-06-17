import mongoose from 'mongoose';


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
    validate: {
      validator: function (value) {
        const usingOAuth = this.googleID || this.spotifyID || this.soundcloudID;
        if (usingOAuth) return true;
        return !!value;
      },
      message: "password is required unless logged in via Google,Spotify, or soundcloud",
    },
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  googleID: {
    type: String,
    unique: true,
    sparse: true,
  },
  spotifyID:{
    type: String,
    unique: true,
    sparse: true,
  },
  soundcloudID:{
    type: String,
    unique: true,
    sparse: true,
  },

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
