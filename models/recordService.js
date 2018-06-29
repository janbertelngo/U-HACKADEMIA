let database = require('./../configuration/database')

// let GET_RECORD_QUERY = "SELECT * FROM Record"

let GET_PATIENT_RECORDS_QUERY = "SELECT * FROM Record as r, AccountPatient AS ap WHERE ap.patient_id = ? " +
                    " AND ap.patient_id = r.patient_id"

let GET_ONE_PATIENT_RECORD_QUERY = "SELECT * FROM Record as r, AccountPatient AS ap WHERE ap.patient_id = ? " +
" AND ap.patient_id = r.patient_id AND r.record_id = ?"

let INSERT_RECORD_QUERY = "INSERT INTO Record " +
                    "(patient_id, testType, attachment, findings, date) " +
                    "VALUES (?, ?, ?, ?, ?)"

module.exports.createRecord = function (data, next) {
    let db = database.getDBInstance()
    db.run(INSERT_RECORD_QUERY, 
        [data.patient_id, data.testType, data.attachment, data.findings, data.date], 
        function(error) {
        if (error) 
            return next({status: 'error', data: error})
        next({status: 'success', data: this.lastID})
    })
}

module.exports.getAllRecords = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_PATIENT_RECORDS_QUERY, [data],function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows})
    })
}
                    
module.exports.getRecord = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_ONE_PATIENT_RECORD_QUERY, [data], function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}