let recordService = require('./../models/recordService')
let patientService = require('./../models/patientService')

let path = require('path')

let fs = require('fs')
module.exports.controller = function (app) {
    
    app.post('/record', function(req, res) {
        console.log("HERE")
        var record = {
            testType: req.body.testType,
            attachment: req.body.file,
            findings: req.body.findings,
            date: req.body.date
        }

        patientService.getPatientId({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }, function (data){
            if(data.status == "success"){
                record ["patient_id"] = data.data.patient_id
                recordService.createRecord(record, function(data){
                    return res.send(true)
                })
            }
        })
    })

    const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end(err);
};

const upload = multer({
  dest: "./../views/static/uploaded"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
  "/upload",
  upload.single("fileHA" /* name attribute of <file> element in your form */),
  (req, res) => {
    console.log("rr"+req.fileHA)
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./../views/static/uploaded/" + req.file.originalname);

    console.log("AG"+tempPath)
    console.log("A"+targetPath)

    if (path.extname(req.file.originalname).toLowerCase() === ".png" 
        || path.extname(req.file.originalname).toLowerCase() === ".jpg" 
        || path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);

    app.get("/records", function(req, res){
        if(req.session.type == "patient") {
            recordService.getAllRecords(req.session.uid, function(patient){
                res.send(patient.data)
            })
        }
    })

    app.put("/record", function(req, res){
        let recordID = req.body.rID
        console.log("rec"+recordID)
        console.log("params"+   req.params)
        if(req.session.type == "patient") {
            recordService.getRecord({pID: req.session.uid, rID: recordID}, function(patient){
                console.log("AHHHH")
                console.log(patient.data)
                res.render(*view*,{data:patient.data})
            })
        }
    })
}