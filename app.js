var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

//linking models
Type = require('./models/type.js');
Photo = require('./models/photo.js');

//mongoose connection
var dbURL = 'mongodb://localhost:27017/photostore';
mongoose.connect(dbURL, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Connected to DB!');
    }
});

var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Try using /api/photos or /api/types')
});

//In the post requests, authentication and security measures are not taken as this is a simple
//project, however, it may be added in the future.
app.get('/api/types', function(req, res){
    Type.getTypes(function(err, types){
        if(err){
            throw err;
        }
        res.json(types);
    });
});

app.get('/api/types/:_id', function(req, res){
    Type.getTypeById(req.params._id, function(err, type){
        if(err){
            throw err;
        }
        res.json(type);

    });
});

app.post('/api/types', function(req, res){
    var type = req.body;
    Type.addType(type, function(err, types){
        if(err){
            throw err;
        }
        res.json(types);

    });
});

app.put('/api/types/:_id', function(req, res){
    var id = req.params._id;
    var type = req.body;
    Type.updateType(id, type, {}, function(err, types){
        if(err){
            throw err;
        }
        res.json(types);

    });
});

app.delete('/api/types/:_id', function(req, res){
    var id = req.params._id;
    Type.deleteType(id, function(err, types){
        if(err){
            throw err;
        }
        res.json(types);

    });
});

///////////////////////// Photos//////////////////////////////////////

app.get('/api/photos', function(req, res){
    Photo.getPhotos(function(err, photos){
        if(err){
            throw err;
        }
        res.json(photos);

    });
});

app.post('/api/photos', function(req, res){
    var photo = req.body;
    Photo.addPhoto(photo, function(err, photo){
        if(err){
            throw err;
        }
        res.json(photo);

    });
});

app.get('/api/photos/:_id', function(req, res){
    Photo.getPhotoById(req.params._id, function(err, photo){
        if(err){
            throw err;
        }
        res.json(photo);

    });
});

app.put('/api/photos/:_id', function(req, res){
    var id = req.params._id;
    var photo = req.body;
    Photo.updatePhoto(id, photo, {}, function(err, photo){
        if(err){
            throw err;
        }
        res.json(photo);

    });
});

app.delete('/api/photos/:_id', function(req, res){
    var id = req.params._id;
    Photo.deletePhoto(id, function(err, types){
        if(err){
            throw err;
        }
        res.json(types);

    });
});

app.listen(3000);

console.log('Starting app')
