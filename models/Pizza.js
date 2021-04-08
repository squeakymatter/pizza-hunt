const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal), //this is a "getter" to transform the data by default every time it's queried. It uses the dateFormat function in the utils folder. don't forget to tell Mongoose model to use getter by updating the toJSON object in the model options for PizzaSchema.
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        //tell mongoose to expect ObjectID and that its data comes from the Comment model
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    //tell schema that it can use virtuals by adding toJSON property to schema options
    toJSON: {
      virtuals: true,
      getters: true, //see line 15
    },
    id: false, //set to false because this is a virtual Mongoose returns and we don't need it
  }
);

//get total count of comments and replies on retrieval
//virtuals allows us to add more info to db response so that we don't ahve to add info manually with a helper before responding to API request. virtuals work like regular functions.
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
