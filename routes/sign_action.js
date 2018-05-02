var express = require('express');
var router = express.Router();
var User = require('../models/users');


router.get('/', function (req, res, next) {
    var firstname = req.param("firstname");
    var lastname = req.param("lastname");
    var age = req.param("age");
    var gender =req.param("gender");
    var address = req.param("address");
    var joining_date = req.param("joining_date");
    var password = req.param("password");
    var cpassword = req.param("cpassword");
   /* var book_id = req.param("book_id");
    var book_name = req.param("book_name");
    var author_name = req.param("author_name");
    var book_issued = req.param("book_issued");
    var book_return = req.param("book_return");
*/

    console.log(req.cookies);


    if (password === cpassword) {


        if (req.session != null) {
            var sessionData = req.session;
            sessionData.userID = Math.random() * 100000;
            sessionData.user_name = firstname;
            sessionData.isAuthenticated = 'false';

        }


        var library = new User({
            firstname: firstname,
            lastname: lastname,
            age: age,
            gender:gender,
            address:address,
            joining_date: joining_date,
            password: password
            /*book_id: book_id,
            book_name: book_name,
            author_name: author_name,
            book_issued: book_issued,
            book_return: book_return*/
        });



        library.save(function (err) {
            console.log(err);
        });

    }
    else {
    res.send('confirm password');

    }


    res.redirect('/sign_up');

});

router.post('/', function (req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var age = req.body.age;
    var gender = req.body.gender;
    var address = req.body.address;
    var joining_date = req.body.joining_date;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
   /* var book_id = req.body.book_id;
    var book_name = req.body.book_name;
    var author_name = req.body.author_name;
    var book_issued = req.body.book_issued;
    var book_return = req.body.book_return;
*/

    if (password === cpassword) {



        if (req.session != null) {
            var sessionData = req.session;
            sessionData.userID = Math.random() * 100000;
            sessionData.user_name = firstname;
            sessionData.isAuthenticated = 'false';

        }


        var library = new User({
            firstname: firstname,
            lastname: lastname,
            age: age,
            gender:gender,
            address:address,
            joining_date: joining_date,
            password: password
       /*     book_id: book_id,
            book_name: book_name,
            author_name: author_name,
            book_issued: book_issued,
            book_return: book_return */
        });
        library.save(function (err) {
            console.log(err);
        });

    }
    else {
        alert('confirm password');

    }


    res.redirect('/');
});

module.exports = router;
