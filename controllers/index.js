const axios = require("axios");
const db = require("../models");
const express = require("express");
const path = require("path");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = db.User;
const Album = db.Album;

// Landing page
router.get("/", (req, res) => {
    res.render("welcome");
})

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("dashboard", {
        user: req.user
    });
})

router.post("/dashboard/album", ensureAuthenticated, (req, res) => {
    console.log(req.user);
    console.log("create album");
    console.log(req.body);
    const title = req.body.title;
    let errors = [];
    if (!title) {
        console.log("erro");
        errors.push({
            msg: "Please enter a title for your album"
        });
    }
    if (errors.length > 0) {
        res.render("dashboard", {
            errors, 
            user: req.user 
        })
    } else {
        console.log("good job at title");
        Album.findOne({ title: title })
            .then(album => {
                if(album) {
                    errors.push({
                        msg: "Please enter a unique album title"
                    })
                    res.render("dashboard", {
                        errors,
                        user: req.user
                    })
                } else {
                    console.log("this is a unique album title");
                    Album.create({ title: title })
                        .then(album => {
                            return User.findOneAndUpdate({
                                _id: req.user._id
                            }, { $push: { album: album._id} }, 
                            { new: true });
                        })
                        .then(album => {
                            req.flash(
                                "success_msg",
                                "Album created"
                            );
                            console.log("hello from line 66");
                            console.log(album);
                            console.log("album created")
                            res.send("you did it");
                        }) 
                            
                }
            })
    }
})

module.exports = router;