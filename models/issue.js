var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var issueschema=new Schema({
    book_id:String,
    book_name:String,
    author_name:String,
    firstname:String,
    lastname:String,
    book_issued:String,
    book_return:String,
    availability:Boolean

});
var Issue=mongoose.model('Issue',issueschema);
module.exports=Issue;
