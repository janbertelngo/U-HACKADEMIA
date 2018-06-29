let doctorService = require('./../models/doctorService')
module.exports.controller = function (app) {

    app.post('/doctor', function(req, res) {
        var doctor = {
            type: req.body.type,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            birthdate: req.body.birthdate,
            sex: req.body.sex,
            workplace: req.body.workplace
        }

        doctorService.createDoctor(doctor, function(data){
            console.log(data)
        })
    })
}