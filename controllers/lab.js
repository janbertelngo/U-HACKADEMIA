let labService = require('./../models/labService')
module.exports.controller = function (app) {

    app.post('/lab', function(req, res) {
        var lab = {
            type: req.body.type,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            birthdate: req.body.birthdate,
            sex: req.body.sex,
            workplace: req.body.workplace
        }

        labService.createLab(lab, function(data){
            console.log(data)
            res.redirect('index')
        })
    })
}