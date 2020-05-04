var mongoose = require('mongoose');

//Schema
var typeSchema = mongoose.Schema({
    name: {type: String, required: true},
    date_created:{type: Date, default: Date.now}
});

var Type = module.exports = mongoose.model('Type', typeSchema);

//Add and Get
module.exports.getTypes = function(callback, limit){
    Type.find(callback).limit(limit);
}

//Get single type
module.exports.getTypeById = function(id, callback){
    Type.findById(id, callback);
}

module.exports.addType = function(type, callback){
    Type.create(type, callback);
}

//Update
module.exports.updateType = function(id, type, options, callback){
    var query = {_id: id};
    var update = {
        name: type.name
    }
    Type.findOneAndUpdate(query, update, options, callback);
}


//Delete
module.exports.deleteType = function(id, callback){
    var query = {_id: id};
    Type.remove(query, callback);
}
