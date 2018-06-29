let recordService = require('./../models/recordService')
module.exports.controller = function (app) {

    app.post('/record', function(req, res) {
        var lab = {
            patient_id: req.body.patient_id,
            testType: req.body.testType,
            attachment: req.body.attachment,
            findings: req.body.findings,
            date: req.body.date
        }

        recordService.createRecord(record, function(data){
            console.log(data)
        })
    })
}