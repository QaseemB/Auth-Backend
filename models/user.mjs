import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    sparse:true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleID: {
    type: String,
    unique: true,
    sparse: true,
  },
  clientID:{
    type: String,
    unique: true,
    sparse: true,
  },

});

const USERS = mongoose.model("users",userSchema);

export default USERS
