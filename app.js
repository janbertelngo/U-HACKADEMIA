let express = require('express')
let parser = require('body-parser')
let session = require('express-session')
let http = require('http')
let path = require('path')
var ejs = require('ejs')
let fs = require('fs')
let values = require('./configuration/config')
let db = require('./configuration/database')

let app = express()
let appSession = session({
    resave: false,
    saveUninitialized: false,
    secret: values.key
})


app.set('port', process.env.PORT || values.port)
app.set('views', __dirname + values.views)
app.set('view engine', 'ejs')

app.use(appSession)
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }));
app.use(function(request, response, next) {
    response.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    next()
})

/* set up static view files */
app.use(express.static(__dirname + values.static))

/* set up controllers */
fs.readdirSync('./controllers').forEach(function(file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file)
      route.controller(app)
  }
})

app.listen(app.get('port'), function(){
    console.log('[' + (new Date()).toLocaleString() + '] ' + 'Server has started')
    console.log('[' + (new Date()).toLocaleString() + '] ' + 'Server running at http://localhost:' + values.port)
})

const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "./static/uploaded"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./views/static/uploaded/" + req.file.originalname);

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);