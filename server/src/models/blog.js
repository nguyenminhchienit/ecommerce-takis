const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numberViews:{
        type:Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    image: {
        type:String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhelp.kajabi.com%2Fhc%2Fen-us%2Farticles%2F360037063694-How-to-Design-Your-Blog-Homepage&psig=AOvVaw1Nm1DYB-at9m1AeHsRjUdv&ust=1697042084571000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjG48b064EDFQAAAAAdAAAAABAK'
    },
    author: {
        type:String,
        default: 'Admin'
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//Export the model
module.exports = mongoose.model('BlogSchema', blogSchema);