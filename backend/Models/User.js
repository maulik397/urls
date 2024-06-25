const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userschema = new Schema ({

    username:String,

    GoogleId :String,
    
    GithubId:String,

    loginMethod: String,

    profileImage: String,

},{timestamps:true});



const User = mongoose.model('User',userschema);

module.exports = User;
