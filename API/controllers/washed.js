const mongoose = require('mongoose');

const Washed = require('../models/washed');

exports.washed_get_all = function (req, res, next) {
    Washed.find()
    .select('type brand texture date')
    .exec()
    .then(result => {
        console.log(result);
        return res.status(200).json({result});
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Sorry no items found"
        })
    })
}

exports.washed_create = function (req, res, next) {
    const washed = new Washed({
        type: req.body.type,
        brand: req.body.brand,
        texture: req.body.texture,
        date: req.body.date
    })
    return washed
    .save()
    .then(data => {
        res.status(200).json({
            message: "Washed item saved successfully"
        })
    })
    .catch(err => {
        console>log(err)
        return res.status(500).json({
            err: err
        })
    })
}

exports.washed_delete = function (req, res, next) {
    Washed.findByIdAndDelete(req.params.id)
    .exec()
    .then(result => {
        console.log(result);
        return res.status(200).json({
            message: "Washed Item deleted successfully"
        })
    })
    .catch(err => {
        res.status(500).json({err})
    });
}

exports.washed_get_washed = function (req, res, next) {
    const washedid = (req.params.washedid);
    Washed.findById(washedid)
    .exec()
    .then(data => {
        res.status(200).json({
            meesage: 'Washed item cannot be fouund'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err, err})
    });
}


