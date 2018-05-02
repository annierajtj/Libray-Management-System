var express = require('express');
var router = express.Router();
var Book = require('../models/book');


router.get('/', function (req, res, next) {

    var book_id = req.param("book_id");
    var book_name = req.param("book_name");
    var author_name = req.param("author_name");
    var price = req.param("price");
    var publisher = req.param("publisher");



        var library = new Book({

            book_id: book_id,
            book_name: book_name,
            author_name: author_name,
            price:price,
            publisher:publisher,
            availability:"true"
        });
        library.save(function (err) {
            console.log(err);
        });

    res.redirect('/book_action');


});

router.post('/', function (req, res, next) {
    var book_id = req.param("book_id");
    var book_name = req.param("book_name");
    var author_name = req.param("author_name");
    var price = req.param("price");
    var publisher = req.param("publisher");



    var library = new Book({

        book_id: book_id,
        book_name: book_name,
        author_name: author_name,
        price:price,
        Publisher:publisher,
        availability:"true"
    });
    library.save(function (err) {
        console.log(err);
    });

    res.send('Book added Successfully');

});

module.exports = router;
