
/* database setup */
let values = require('./config')
let tables = require('./tables')
let path = require('path')
let fs = require('fs');
let sqlite3 = require('sqlite3').verbose()

let getDBInstance = function () {

    if (!fs.existsSync(values.database.location)){
        fs.mkdirSync(values.database.location);
    }

    return new sqlite3.Database(path.join(values.database.location, values.database.name), (error, result) => {
        if (error) {
            console.log("[" + (new Date()).toLocaleString() + "] " + error)
            logger.logToFile("Error ", "Database Failure\n" + error)
        }
    })
} 

function createTableQuery (table, name) {
    let columns = table.columns
    let query = "CREATE TABLE IF NOT EXISTS " + name + " ( "
    query += columns.map(function(column) {
        return column.name + " " + column.type + " " + column.constraint
    }).join(", ") + ")"
    return query
}



function createTable(name, next) {
    let db = getDBInstance()
    db.run(createTableQuery(tables[name], name), function(error, row) {
        if (error) {
            console.log("[" + (new Date()).toLocaleString() + "] create table" +  error)
            return next(false)
        }
        return next(true)
    })
    //db.close()
}



function initializeTable(name) {
    createTable(name)
}

function setupDatabase () {
    for (name in tables) {
        console.log(name)
        initializeTable(name)
    }
}
module.exports.getDBInstance = getDBInstance
setupDatabase()