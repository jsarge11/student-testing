let express = require('express')
let massive = require('massive')
let app = express();

app.get('/test', (req, res) => {
 let { id } = req.query
})

app.listen(4000, console.log(`listening on ${4000}`))