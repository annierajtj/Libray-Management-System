var express = require('express');
var router = express.Router();
var User = require('../models/users');


router.get('/', function(req, res, next) {
    var firstname=req.param("firstname");
    var password=req.param("password");
    var remember=req.param("remember");
    var usertype=req.param("usertype");

    console.log(req.cookies);

        var sessionData = req.session;
        sessionData.user_name = firstname;


    if(firstname=== "admin" && password=== "admin") {

         if (remember) {

             res.cookie("user_name", firstname);
         }
         else {
             res.clearCookie('user_name');
         }

         res.redirect("/");


     }

    else
     {

         User.findOne({firstname: firstname}, function (err, user) {
             if (err) throw err;

             if (user.firstname === firstname && user.password === password) {

                 if (remember) {

                     res.cookie("user_name", firstname);
                 }
                 else {
                     res.clearCookie('user_name');
                 }

                 res.redirect("/");


                 }


         });

                    }


});

router.post('/', function(req, res, next) {

    var firstname=req.body.firstname;
    var password=req.body.password;

    if(firstname=== "admin" && password=== "admin") {

        if (remember) {

            res.cookie("user_name", firstname);
        }
        else {
            res.clearCookie('user_name');
        }

        res.redirect("/");


    }

    else if(usertype==="User")
    {

        User.findOne({firstname: firstname}, function (err, user) {
            if (err) throw err;

            if (user.firstname === firstname && user.password === password) {

                if (remember) {

                    res.cookie("user_name", firstname);
                }
                else {
                    res.clearCookie('user_name');
                }

                res.redirect("/");

                }



        });

    }

    else
    {
        res.send("invalid username or password");
    }




});


module.exports = router;
