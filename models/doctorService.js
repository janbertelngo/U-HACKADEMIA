let database = require('./../configuration/database')

let GET_DOCTOR_QUERY = "SELECT * FROM DoctorAccount"

let GET_ONE_DOCTOR_QUERY = "SELECT * FROM DoctorAccount WHERE doctor_id = ?"

let INSERT_DOCTOR_QUERY = "INSERT INTO DoctorAccount " +
                    "(firstName, lastName, username, password, birthdate, + "
                    + "sex, workplace, type) VALUES (?, ?, ?, ?, ?, ?, ?)"	

module.exports.createDoctor = function (data, next) {
    let db = database.getDBInstance()
    db.run(INSERT_DOCTOR_QUERY, 
        [data.firstName, data.lastName, data.username, data.password, data.birthdate,
            data.sex, data.workplace, "doctors"], 
        function(error) {
        if (error) 
            return next({status: 'error', data: error})
        next({status: 'success', data: this.lastID})
    })
}

module.exports.getAllDoctors = function (next) {
    let db = database.getDBInstance()
    db.all(GET_DOCTOR_QUERY, function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows})
    })
}

module.exports.getDoctor = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_ONE_DOCTOR_QUERY, [data], function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}
