var express = require('express');
var router = express.Router();
var Issue = require('../models/issue');
var Book = require('../models/book');


router.get('/', function (req, res, next) {
    var firstname = req.param("firstname");
    var lastname = req.param("lastname");
    var author_name = req.param("author_name");
    var book_id = req.param("book_id");
    var book_name = req.param("book_name");
    var book_issued = req.param("book_issued");
    var book_return = req.param("book_return");

    var val=req.session.user_name;

    var library = new Issue({
        book_id: book_id,
        book_name: book_name,
        author_name:author_name,
        firstname: firstname,
        lastname: lastname,
        book_issued: book_issued,
        book_return: book_return,
        availability:"false"
    });

    Book.findOneAndUpdate({book_name:book_name},{availability:"false"}, function(err,bo) {
        if (err) throw err;


        library.save(function (err) {
            console.log(err);
        });

    });
    res.send('Book Issued Successfully');

});

router.post('/', function (req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var author_name = req.body.author_name;
    var book_id = req.body.book_id;
    var book_name = req.body.book_name;
    var book_issued = req.body.book_issued;
    var book_return = req.body.book_return;

    var val=req.session.user_name;

    var library = new Issue({
        book_id: book_id,
        book_name: book_name,
        author_name: author_name,
        firstname: firstname,
        lastname: lastname,
        book_issued: book_issued,
        book_return: book_return,
        availability:"false"
    });
    library.save(function (err) {
        console.log(err);
    });


    res.send('Book Issued Successfully');

});

module.exports = router;
