const mongoose = require('mongoose')

var Schema =  mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: String,
    date_of_publish: {type: Date, default: Date.now},
    author:{
        type: Schema.Types.ObjectId, ref:'Author', required:false
    }
});

PostSchema
.virtual('url')
.get(function(){
    return '/post/' + this._id
})

// Export model
module.exports = mongoose.model('Post', PostSchema);