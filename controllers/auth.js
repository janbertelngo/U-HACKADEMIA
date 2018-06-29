module.exports.controller = function (app) {

    app.post('/login', function(req, res) {
        let email = req.body.email
        let password = req.body.password

        console.log(email)
        console.log(password)
    })
}