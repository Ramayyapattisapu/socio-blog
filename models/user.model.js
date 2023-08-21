module.exports = mongoose => {

  const Schema = mongoose.Schema
  var userSchema = new Schema(
    {
      
      email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

      },
      password: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true,
        maxlength: 32,
      },
      phoneNumber: {
        type: Number
      },
      friends: {
        type: Array,
        default: []
      },
      location: String,
      occupation: String,

    },
    {   
      timestamps: true
    },
    
  );

  // Schema.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const userinfo = mongoose.model("USER", userSchema);
  return userinfo;
};