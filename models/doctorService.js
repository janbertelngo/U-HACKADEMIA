let database = require('./../configuration/database')

let GET_DOCTOR_QUERY = "SELECT * FROM DoctorAccount"

let INSERT_DOCTOR_QUERY = "INSERT INTO DoctorAccount " +
                    "(firstName, lastName, username, password, birthdate, + "
                    + "sex, workplace) VALUES (?, ?, ?, ?, ?, ?, ?)"	

module.exports.createDoctor = function (data, next) {
    let db = database.getDBInstance()
    db.run(INSERT_DOCTOR_QUERY, 
        [data.firstName, data.lastName, data.username, data.password], 
        function(error) {
        if (error) 
            return next({status: 'error', data: error})
        next({status: 'success', data: this.lastID})
    })
}