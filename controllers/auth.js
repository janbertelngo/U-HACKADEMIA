let accountService = require('./../models/accountService')

module.exports.controller = function (app) {

    app.post('/login', function(req, res) {
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        console.log(user)

        accountService.getAccount(user, function(data){
            console.log(data)
            res.send(data)
        })
    })
}