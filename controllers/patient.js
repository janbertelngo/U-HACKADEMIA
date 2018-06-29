let patientService = require('./../models/patientService')
module.exports.controller = function (app) {

    app.post('/patient', function(req, res) {
        var patient = {
            type: req.body.type,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            birthdate: req.body.birthdate,
            sex: req.body.sex,
            bloodType: req.body.bloodType,
            accountNumber: req.body.accountNumber
        }

        patientService.createPatient(patient, function(data){
            console.log(data)
            res.redirect('index')
        })
    })
}