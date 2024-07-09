const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    filename: { type: String, default: "defaultimage" },
    url: {
      type: String,
      default: "https://unsplash.com/photos/blue-outdoor-pool-hDbCjHNdF48", // Example valid image URL
      set: (v) => v === "" ? "https://unsplash.com/photos/blue-outdoor-pool-hDbCjHNdF48" : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
     {
    type: Schema.Types.ObjectId,
    ref: "Review"
  }
]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
