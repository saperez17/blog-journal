const mongoose = require('mongoose')

var Schema =  mongoose.Schema;

const AuthorSchema = new Schema({
    firstName: String,
    lastName: String,
    country: String,
    languages: [{type: String}],
});

AuthorSchema
.virtual('url')
.get(function(){
    return '/author/' + this._id
})

AuthorSchema
.virtual('fullname')
.get(function(){
    return `${this.first_name} ${this.last_name}`
})

// Export model
module.exports = mongoose.model('Author', AuthorSchema);