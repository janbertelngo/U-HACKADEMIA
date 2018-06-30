let database = require('./../configuration/database')

let GET_PATIENT_QUERY = "SELECT * FROM AccountPatient"

let GET_ONE_PATIENT_QUERY = "SELECT * FROM AccountPatient WHERE patient_id = ?"

let INSERT_PATIENT_QUERY = "INSERT INTO AccountPatient " +
                    "(firstName, lastName, username, password, birthdate, "
                    + "sex, bloodType, accountNumber, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"

let GET_PATIENT_ID_QUERY = "SELECT patient_id FROM AccountPatient AS ap WHERE ap.firstName = ? AND ap.lastName = ?"

let GET_PATIENT_NAME_QUERY = "SELECT * FROM AccountPatient AS ap WHERE ap.lastName = ? AND ap.firstName = ?"

module.exports.getPatientId = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_PATIENT_ID_QUERY, 
        [data.firstName, data.lastName], 
        function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'error', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}

module.exports.getPatientName = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_PATIENT_NAME_QUERY, 
        [data.firstName, data.lastName], 
        function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'error', data: undefined})
        next({status: 'success', data: rows})
    })
}

module.exports.createPatient = function (data, next) {
    let db = database.getDBInstance()
    db.run(INSERT_PATIENT_QUERY, 
        [data.firstName, data.lastName, data.username, data.password,
            data.birthdate, data.sex, data.bloodType, data.accountNumber, data.type], 
        function(error) {
        if (error) 
            return next({status: 'error', data: error})
        next({status: 'success', data: this.lastID})
    })
}

module.exports.getAllPatients = function (next) {
    let db = database.getDBInstance()
    db.all(GET_PATIENT_QUERY, function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows})
    })
}
                    
module.exports.getPatient = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_ONE_PATIENT_QUERY, [data], function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}
