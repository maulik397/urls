const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy =require('passport-facebook').Strategy;

const User = require('../Models/User')
require('dotenv').config()

const GOOGLE_CLIENT_ID =process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET;

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://us.maulikdalwadi.tech/auth/google/callback"
},
(accessToken,refreshToken,profile,done)=>{
    //check if already exists 
        console.log('profile',profile)
        User.findOne({GoogleId:profile.id}).then((currentUser)=>{
            if(currentUser)
                {       
                      
                        done(null,currentUser);
                }
            else{

                //else create new 
                new User ({
                    username:profile.displayName,
                    GoogleId:profile.id, 
                    loginMethod: 'google',
                    profileImage: profile.photos[0].value,
                }).save().then((newUser)=>{
                    console.log('new user is',newUser)
                    done(null,newUser);
                })
            }
        })

}
));

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "https://us.maulikdalwadi.tech/auth/github/callback"
  },(accessToken,refreshToken,profile,done)=>{

    //check if user already exists 
    User.findOne({GithubId:profile.id}).then((currentUser)=>{
        if(currentUser)
            {       
                    done(null,currentUser);
            }
        else{

            //else create new 
           
            new User ({
                
                GithubId:profile.id, 
                username:profile.username,
                loginMethod: 'github',
                profileImage: profile.photos[0].value,
            }).save().then((newUser)=>{
                
                done(null,newUser);
            })
        }
       
    })
        
  }));

/*

  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  },(accessToken,refreshToken,profile,done)=>{

    //check if user already exists 
    User.findOne({facebookId:profile.id}).then((currentUser)=>{
        if(currentUser)
            {       
  
                    done(null,currentUser);
            }
        else{

            //else create new 
            new User ({
                username:profile.login,
                GithubId:profile.id, 
            }).save().then((newUser)=>{
                
                done(null,currentUser);
            })
        }
       
    })
   console.log("facebook user",profile);
        
  }));


*/

  

  
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
   
})
