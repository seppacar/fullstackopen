const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    maxLength: 12,
    validate: {
      validator: function (v) {
        return (
          (v[3] === "-" || v[4] === "2") &&
          v.length >= 8 &&
          v.split("-").length - 1 === 1
        );
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

const opts = { runValidators: true };

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
