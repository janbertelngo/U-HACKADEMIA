module.exports.controller = function(app) {
    app.get('/', function(req, res) {
        res.render('index')
    });
    app.get('/signup', function(req, res) {
        res.render('signup')
    });
    app.get('/patient', function(req, res) {
        res.render('userview')
    });
    app.get('/patient/1', function(req, res) {
        res.render('userview')
    });
    app.get('/doctor/1', function(req,res) {
        res.render('doctorview');
    });
}