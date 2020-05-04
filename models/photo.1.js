var mongoose = require('mongoose');

//Schema
var photoSchema = mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    photographer: {type: String, required: true},
    image_url: {type: String, required: true},
    date_created: {type: Date, default: Date.now}
});

var Photo = module.exports = mongoose.model('Photo', photoSchema);

//Get all photos
module.exports.getPhotos = function(callback, limit){
    Photo.find(callback).limit(limit);
}

//Get single photo
module.exports.getPhotoById = function(id, callback){
    Photo.findById(id, callback);
}

//Post
module.exports.addPhoto = function(photo, callback){
    Photo.create(photo, callback);
}

//Delete
module.exports.deletePhoto = function(id, callback){
    var query = {_id: id};
    Photo.remove(query, callback);
}
