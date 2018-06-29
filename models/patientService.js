let database = require('./../configuration/database')

let GET_PATIENT_QUERY = "SELECT * FROM PatientAccount"

let GET_ONE_PATIENT_QUERY = "SELECT * FROM PatientAccount WHERE patient_id = ?"

let INSERT_PATIENT_QUERY = "INSERT INTO PatientAccount " +
                    "(firstName, lastName, username, password, birthdate, + "
                    + "sex, bloodType, accountNumber, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

module.exports.createPatient = function (data, next) {
    let db = database.getDBInstance()
    db.run(INSERT_PATIENT_QUERY, 
        [data.firstName, data.lastName, data.username, data.password,
            data.birthdate, data.sex, data.bloodType, data.accountNumber, "patients"], 
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
