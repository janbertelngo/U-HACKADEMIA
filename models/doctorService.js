let database = require('./../configuration/database')

let GET_DOCTOR_QUERY = "SELECT * FROM DoctorAccount"

let INSERT_DOCTOR_QUERY = "INSERT INTO DoctorAccount " +
                    "(firstName, lastName, username, password, birtdate, + "
                    + "sex, workplace) VALUES (?, ?, ?, ?, ?, ?, ?)"	