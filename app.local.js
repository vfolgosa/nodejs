'use strict'
const app = require('./api/api')
const port = process.env.PORT || 3000

app.listen(port, () =>
    console.log(`Server is listening on port ${port}.`)
);