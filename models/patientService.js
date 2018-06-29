let database = require('./../configuration/database')

let GET_PATIENT_QUERY = "SELECT * FROM PatientAccount"

let INSERT_PATIENT_QUERY = "INSERT INTO PatientAccount " +
                    "(firstName, lastName, username, password, birtdate, + "
                    + "sex, bloodType, accountNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"	