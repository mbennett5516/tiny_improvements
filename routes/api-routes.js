const db = require('../models');

module.exports = function (app) {

    //GET ALL USERS
    app.get('/api/user', function (req, res) {
        db.User.find({})
            .populate("kudos")
            .then(function (data) {
                // console.log(data);
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    //GET A SPECIFIC USER BY ID
    app.get('/api/user/:_id', function (req, res) {
        db.User.findById({ _id: req.params._id })
            .populate("kudos")
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    //CREATE A NEW USER
    app.post('/api/user', function (req, res) {
        db.User.create(req.body)
            .then(function (data) {
                console.log(data);
                res.json({ success: true });
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    //UPDATE A USER
    app.put('/api/user/:_id', function (req, res) {
        db.User.findOneAndUpdate({ _id: req.params._id }, req.body)
            .populate('kudos')
            .then(function (data) {
                console.log(data);
                res.json({ success: true });
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    //DELETE A USER
    app.delete('/api/user/:id', function(req, res){
        db.User.deleteOne({_id: req.params.id})
        .then(function(data){
            res.json({success: true});
        }).catch(function(error){
            res.json({error: error});
        });
    });

    //ADD A KUDO
    app.post('/api/kudo', function (req, res) {
        db.Kudo.create(req.body)
            .then(function (data) {
                console.log(data);
                res.json(data);
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    //GET ALL KUDOS
    app.get('/api/kudo', function(req, res){
        db.Kudo.find({})
        .populate('sender')
        .populate('recipient')
        .then(function(data){
            res.json(data);
        }).catch(function(error){
            res.json({error: error});
        });
    });

    //GET A SPECIFIC KUDO
    app.get('/api/kudo/:id', function(req, res){
        db.Kudo.findById({_id: req.params.id})
        .populate('sender')
        .populate('recipient')
        .then(function(data){
            res.json(data);
        }).catch(function(error){
            res.json({error:error});
        });
    });

    //GET KUDOS SENT TO A SPECIFIC PERSON
    app.get('/api/user/kudo/:id', function(req, res){
        db.Kudo.find({recipient: req.params.id})
        .populate('sender')
        .populate('recipient')
        .then(function(data){
            console.log(data);
            res.json(data);
        }).catch(function(error){
            res.json({error: error});
        });
    });

    //UPDATE A KUDO
    app.put('/api/kudo/:id', function(req, res){
        db.Kudo.updateOne({_id: req.params.id}, req.body)
        .then(function(data){
            res.json({success: true});
        }).catch(function(error){
            res.json({error: error});
        });
    });

    //DELETE A KUDO
    app.delete('/api/kudo/:id', function(req, res){
        db.Kudo.deleteOne({_id: req.params.id})
        .then(function(data){
            res.json({success: true});
        }).catch(function(error){
            res.json({error: error});
        });
    });
}