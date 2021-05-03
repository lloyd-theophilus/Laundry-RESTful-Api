const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

exports.admin_get_all_admins = function (req, res, next) {
    Admin.find()
    .select('username password phone')
    .exec()
    .then(result => {
        console.log(result);
        return res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            message: 'No admin found',
            err: err
        })
    })
}

exports.admin_signup = function (req, res) {
    //validating user details at signup
    Admin.find({username: req.body.username, password: req.body.password,
         phone: req.body.phone})
    .exec()
    .then(admin => {
        //creating new user of the user details length is greater or equal to 1
        if(!admin.length >=1){
            res.status(409).json({
                message: 'Admin username and password already exists.'
            });
        } else{
             //hashing user passwords at signup
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                err: err
            });
        } else {
            const admin = new Admin({
                username: req.body.username,
                phone: req.body.phone,
                password: hash
            });
            admin
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Admin created successfully'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    err: err
                });
            });
        }
    });
        }
    });

}

exports.admin_login = function (req, res, next) {
    Admin.find({username: req.body.username, password: req.body.password})
    .exec()
    .then(admin => {
        if(admin.length < 1){
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
    //validaing a plain text passoword from user input to query a user login details from the database
    bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
        if(err){
            return res.status(401).json({
                message: 'Authentication failed'
            });
        } else if(result) {
            //parse users username and password to the client using JWT
           const token = jwt.sign(
               {
                username: admin[0].username,
                Password: admin[0].password,
                phone: admin[0].phone
            },
            "" + process.env.JWT_KEY,
            {
                expiresIn: '1hr'
            }
            );
            return res.status(200).json({
                message: 'Authentication successful',
                token: token
            })
        } else {
            return res.status(401).json({
                message: 'Authentication failed'
            });
        };

        });
    })
    .catch(err => {
        console.log(err);
         res.status(500).json({
         err: err
     });
    });
}

exports.admin_delete_admin = function (req, res, next) {
    Admin.remove({username: req.params.username, phone: req.params.phone})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Admin deleted successfully!'
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            err: err
        });
    });
}



