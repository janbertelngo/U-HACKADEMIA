let accountService = require('./../models/accountService')
let patientService = require('./../models/patientService')

module.exports.controller = function (app) {

    app.post('/login', function(req, res) {
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        console.log(user)

        accountService.getDocAccount(user, function(data){
            if(data.status == "success"){
                req.session.uid = data.data.doctor_id
                req.session.type = data.data.type
                res.redirect('/doctor');
            } else {
                accountService.getLabAccount(user, function(data2){
                    if(data2.status == "success"){
                        req.session.uid = data2.data.lab_id
                        req.session.type = data2.data.type
                        res.redirect('/lab');
                    } else {
                        accountService.getPatAccount(user, function(data3){
                            if(data3.status == "success"){
                                req.session.uid = data3.data.patient_id
                                req.session.type = data3.data.type
                                res.redirect('/patient');
                            } else {
                                res.redirect('/');
                            }
                        })
                    }
                })
            }
        })
    })

    app.get('/user', function(req,res){
        console.log(req.session.type)
        console.log(req.session.uid)
        if(req.session.type == "patient") {
            patientService.getPatient(req.session.uid, function(patient){
                console.log(patient)
                console.log(patient.data)
                res.send(patient.data)
            })
        }
    })
}