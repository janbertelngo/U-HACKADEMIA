var path = require('path');
var express = require('express');

module.exports.controller = function(app) {
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', function(req, res) {
        res.render('index')
    });
    app.get('/signup', function(req, res) {
        res.render('signup')
    });
    app.get('/lab', function(req, res) {
        res.render('addrecord')
    }); 
    app.get('/lab/1/addrecord', function(req, res) {
        res.render('addrecord')
    }); 
}