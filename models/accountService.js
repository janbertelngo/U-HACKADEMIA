let database = require('./../configuration/database')

let GET_ACCOUNT_DOC_QUERY = "SELECT * FROM AccountDoctor D WHERE (D.username = ? AND D.password = ?)"

let GET_ACCOUNT_LAB_QUERY = "SELECT * FROM AccountLab L WHERE (L.username = ? AND L.password = ?)"

let GET_ACCOUNT_PAT_QUERY = "SELECT * FROM AccountPatient P WHERE (P.username = ? AND P.password = ?)"

module.exports.getDocAccount = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_ACCOUNT_DOC_QUERY, 
        [data.username, data.password], function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'error', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}

module.exports.getLabAccount = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_ACCOUNT_LAB_QUERY, 
        [data.username, data.password], function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'error', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}

module.exports.getPatAccount = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_ACCOUNT_PAT_QUERY, 
        [data.username, data.password], function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'error', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}