let express = require('express')

let app = express();

app.get('/test', (req, res) => {

 res.status(200).send();
})

app.listen(4444, console.log('listening on 4444'))