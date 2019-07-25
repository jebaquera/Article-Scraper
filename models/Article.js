var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` and `link` are required and of type String
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  // details: {
  //   type: String
  // },
  // saved: {
  //   type: Boolean,
  //   default: false
  // },

  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // Used to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
