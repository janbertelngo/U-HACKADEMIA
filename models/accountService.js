let database = require('./../configuration/database')

let GET_ACCOUNT_QUERY = "SELECT * FROM AccountDoctor D, AccountLab L, AccountPatient P " +
    "WHERE (D.username = ? AND D.password = ?) OR (L.username = ? AND L.password = ?) OR" +
    "(P.username = ? AND P.password = ?)"

module.exports.getAccount = function (data, next) {
    let db = database.getDBInstance()
    db.all(GET_ACCOUNT_QUERY, 
        [data.username, data.password, data.username, data.password,
        data.username, data.password], function(error, rows) {
        if (error) { 
            console.log("err")
            return next({status: 'error', data: error})
        }
        if (rows.length == 0)
            return next({status: 'success', data: undefined})
        next({status: 'success', data: rows[0]})
    })
}