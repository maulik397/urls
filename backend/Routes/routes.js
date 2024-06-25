const express = require('express')
const router= require('express').Router();
const passport = require('passport')
const CLIENT_URL = "http://localhost:5173/";
const User = require('../Models/User')

router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

  router.get('/logout',(req,res)=>{-
    req.logout(err => { 
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ message: 'Error logging out' });
        }
        req.session = null; 
        res.clearCookie('connect.sid', { path: '/' }); 

        res.redirect('http://localhost:5173/'); 
    });
  })
router.get('/login/success', async (req, res) => {
    if (req.isAuthenticated() && req.user) {
        try {
            let loginUser = null;

            // Check if it's a GitHub user
            if (req.user.GithubId) {
                loginUser = await User.findOne({ GithubId: req.user.GithubId });
            }

            // Check if it's a Google user
            if (req.user.GoogleId) {
                loginUser = await User.findOne({ GoogleId: req.user.GoogleId });
            }

            if (loginUser) {
                res.status(200).json({
                    success: true,
                    user: loginUser,
                        
                    
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});
router.get('/google',passport.authenticate('google',{
    //scopes 
    scope:['profile']
}) )    

//callback route for google
router.get('/google/callback',passport.authenticate('google',{
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
}));

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get('/github/callback',passport.authenticate('github',{
    successRedirect: CLIENT_URL,
    failureRedirect:'/login/failed',
}))



router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get('/facebook/callback',passport.authenticate('facebook',{
    successRedirect: CLIENT_URL,
    failureRedirect:'/login/failed',
}))


module.exports= router;
