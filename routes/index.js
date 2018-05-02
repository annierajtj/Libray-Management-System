var express = require('express');
var router = express.Router();
var User=require('../models/users');
var Book=require('../models/book');
var Issue=require('../models/issue');

/* GET home page. */
router.get('/', function(req, res, next) {
  var val=req.session.user_name;
  res.render('index',{val:val});
});

router.get('/about_us', function(req, res, next) {
  var val=req.session.user_name;

  res.render('about_us',{val:val});
});

router.get('/contact_us', function(req, res, next) {
  var val=req.session.user_name;

  res.render('contact_us',{val:val});
});

router.get('/library_admin', function(req, res, next) {
  var val=req.session.user_name;

  res.render('library_admin', {val:val});
});

router.get('/add_book', function(req, res, next) {
  var val=req.session.user_name;

  res.render('add_book',{val:val});
});


router.get('/library_books', function(req, res, next) {

  var val=req.session.user_name;

  res.render('library_books',{val:val});
});

router.get('/library_user', function(req, res, next) {


  var val=req.session.user_name;

  res.render('library_user',{val:val});
});

router.get('/login', function(req, res, next) {

  res.render('login');
});

router.get('/issue_book', function(req, res, next) {
  var val=req.session.user_name;

  res.render('issue_book',{val:val});
});

router.get('/all_book', function(req, res, next) {
  var val=req.session.user_name;


  Book.find({}, function(err, bo) {
    if (err) throw err;

    Issue.find({}, function(err, av) {
      if (err) throw err;


      res.render('all_book', {bo: bo, av: av,val:val});

    });
  });
});

router.get('/book_action', function(req, res, next) {

  var val=req.session.user_name;

  Book.find({}, function(err, bo) {
    if (err) throw err;

      res.render('book_action', {bo: bo,val:val});

    });
  });

router.get('/profile', function(req, res, next) {

  var val=req.session.user_name;

  var firstname=req.param("firstname");

  User.find({firstname:val}, function(err, user) {
    if (err) throw err;

    console.log(user);


    res.render('profile', {user:user,val:val});

    });

});

router.get('/member_history', function(req, res, next) {

  var val=req.session.user_name;

  var firstname=req.param("firstname");

  Issue.find({firstname:val}, function(err,issues) {
    if (err) throw err;

    console.log(issues);


    res.render('member_history', {issues:issues,val:val});

  });

});




router.get('/sign_up', function(req, res, next) {

  var val=req.session.user_name;

  res.render('sign_up',{val:val});
});



router.get('/available', function(req, res, next) {

  var val = req.session.user_name;


    Book.find({availability:"true"}, function (err, bo) {
      if (err) throw err;


      res.render('available', {bo:bo, val: val});
    });

});


router.get('/logout', function(req, res, next) {

  var cookie=req.param("cookie");

  res.clearCookie('library.sid');
  res.clearCookie("user_name");

  res.redirect("/");


  res.render('logout');
});

router.get('/register', function(req, res, next) {

  var val=req.session.user_name;

  User.find({}, function(err, ad) {
    if (err) throw err;


    res.render('register', {ad: ad,val:val});

  });
  });


router.get('/edit_member', function(req, res, next) {

     var firstname = req.param("firstname");
  var address = req.param("address");
  var age = req.param("age");

  var val=req.session.user_name;

  User.findOneAndUpdate({firstname:firstname},{address:address}, function(err,user) {
    if (err) throw err;

      console.log(user);


    res.render("edit_member",{user:user,val:val});

    //res.send("Updated Successfully");

  });


});

router.get('/delete_member', function(req, res, next) {

  var val=req.session.user_name;
 var firstname = req.param("firstname");
 var address = req.param("address");

  User.findOneAndRemove({firstname:firstname}, function(err,user) {
    if (err) throw err;

    console.log(user);

    res.render("delete_member",{user:user,val:val});
  });
// res.send("Deleted Successfully");
});


router.get('/return_book', function(req, res, next) {

  var val=req.session.user_name;
  var book_id=req.param("book_id");
  var firstname = req.param("firstname");


  Book.findOneAndUpdate({book_id: book_id},{availability: "true"}, function (err, bo) {
    if (err) throw err;

    console.log(bo);

    Issue.findOneAndRemove({firstname:firstname}, function(err,issues) {
    if (err) throw err;



      res.render("return_book", {issues: issues,bo:bo, val: val});

    });
  });

  res.send("Book Returned Successfully");

});

router.get('/history', function(req, res, next) {

  var val=req.session.user_name;


  Issue.find({ }, function(err,issues) {
    if (err) throw err;

      res.render("history",{issues:issues,val:val});

    });


  });

router.get('/edit_book', function(req, res, next) {

  var val=req.session.user_name;

  var book_name=req.param("book_name");
 // var publisher=req.param("publisher");
  var price=req.param("price");

  Book.findOneAndUpdate({book_name:book_name},{price:price},function(err,bo) {
    if (err) throw err;

    console.log(bo);


    res.render("edit_book",{bo:bo,val:val});


  });

 // res.send("Book Updated Successfully");
});

/*router.get('/update_action', function(req, res, next) {

  var val=req.session.user_name;

  var firstname=req.param("firstname");

  User.update({firstname:val},req.body, function(err, user) {
    if (err) throw err;

    console.log(user);


    //res.send("Updated Successfully");

    res.render("update_action",{user:user,val:val});


  });
});*/

router.get('/del_book', function(req, res, next) {

  var val=req.session.user_name;

  var book_name=req.param("book_name");
  // var publisher=req.param("publisher");
  var price=req.param("price");

  Book.findOneAndRemove({book_name:book_name},{price:price}, function(err,bo) {
    if (err) throw err;



    console.log(bo);


    res.render("del_book",{bo:bo,val:val});


  });
  //res.send("Book Deleted Successfully");
});


module.exports = router;
