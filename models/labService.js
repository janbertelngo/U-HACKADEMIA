let database = require('./../configuration/database')

let GET_LAB_QUERY = "SELECT * FROM LabAccount"

let GET_ONE_LAB_QUERY = "SELECT * FROM LabAccount WHERE lab_id = ?"

let INSERT_LAB_QUERY = "INSERT INTO LabAccount " +
                    "(firstName, lastName, username, password, + "
                    + "sex, type) VALUES (?, ?, ?, ?, ?, ?)"

module.exports.createLab = function (data, next) {
    let db = database.getDBInstance()
    db.run(INSERT_LAB_QUERY, 
        [data.firstName, data.lastName, data.username, data.password, data.sex, "labs"], 
        function(error) {
        if (error) 
            return next({status: 'error', data: error})
        next({status: 'success', data: this.lastID})
    })
}

module.exports.getAllLabs = function (next) {
    let db = database.getDBInstance()
    db.all(GET_LAB_QUERY, function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows})
    })
}
                    
module.exports.getLab = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_ONE_LAB_QUERY, [data], function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}
