var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bookSchema=new Schema({

    book_id:String,
    book_name:String,
    author_name:String,
    price:String,
    publisher:String,
    availability:Boolean
});
var Book=mongoose.model('Book',bookSchema);
module.exports=Book;
