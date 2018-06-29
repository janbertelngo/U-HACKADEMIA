let recordService = require('./../models/recordService')
let patientService = require('./../models/patientService')
module.exports.controller = function (app) {

    app.post('/record', function(req, res) {
        var record = {
            patient_id: req.body.patient_id,
            testType: req.body.testType,
            attachment: req.body.attachment,
            findings: req.body.findings,
            date: req.body.year+"-"+req.body.month+"-"+req.body.day
        }

        patientService.getPatientId({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }, function (data){
            if(data.status == "success"){
                record ["patient_id"] = data.data
                recordService.createRecord(record, function(data){
                    console.log(data)
                })
            }
        })

        recordService.createRecord(record, function(data){
            console.log(data)
        })
    })
}