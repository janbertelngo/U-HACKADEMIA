let database = require('./../configuration/database')

let GET_LAB_QUERY = "SELECT * FROM LabAccount"

let INSERT_LAB_QUERY = "INSERT INTO LabAccount " +
                    "(firstName, lastName, username, password, birtdate, + "
                    + "sex) VALUES (?, ?, ?, ?, ?, ?)"	