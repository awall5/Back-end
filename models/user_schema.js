const mongoose = require("mongoose")

const{Schema,model} = mongoose;

const userSchema = new Schema(
  {
    Name: {
      type: String,
      trim:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required:true,
    },
    phoneNumber: {
      type: String,
      default: 0,
    },
    gender:{
        required:true,
        enum:['male','female'],
    },
    role:{
        type:String,
        enum:['User','Admin','Super-Admin'],
        default:'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const UserModel = model("user",userSchema);



export{UserModel};