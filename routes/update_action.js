var express = require('express');
var router = express.Router();
var User = require('../models/users');


router.get('/', function(req, res, next) {
    var firstname=req.param("firstname");
    var val=req.session.user_name;


    User.update({firstname:val},req.body, function(err, user) {
        if (err) throw err;

        console.log(user);


        //res.send("Updated Successfully");

    });


    });

router.post('/', function(req, res, next) {

    var val=req.session.user_name;

    var firstname=req.param("firstname");

    User.update({firstname:val},req.body, function(err, user) {
        if (err) throw err;

        console.log(user);


        //res.send("Updated Successfully");
    });


    });


module.exports = router;
