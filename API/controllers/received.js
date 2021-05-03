const mongoose = require('mongoose');

const Received = require('../models/received');

exports.receive_get_all = function (req, res, next) {
    Received.find()
    .select('type brand texture date branch amount')
    .exec()
    .then(result => {
        return res.status(200).json({result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Received items could not be display due to an error",
            err: err
        })
    })
}

exports.received_create = function (req, res, next) {
    const received = new Received({
        type: req.body.type,
        brand: req.body.brand,
        texture: req.body.texture,
        date: req.body.date,
        amount: req.body.amount,
        branch: req.body.branch
    })
    received
    .save()
    .then(data => {
        res.status(200).json({
            message: 'Received item infomation created successfully'
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json({
            err: err
        })
    })
}

exports.received_delete = function (req, res, next) {
    Received.findByIdAndDelete(req.params.id)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Received Item deleted successfully'
        })
    })
    .catch(err => {
        res.status(500).json({
            err: err
        })
    })
}

exports.received_get_received = function (req, res, next) {
    const receivedid = (req.params.receivedid);
    Received.findById(receivedid)
    .exec()
    .then(data => {
        res.status(200).json({
            message: 'The Received item cannot be found'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({err, err})
    });
}


