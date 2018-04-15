const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(__dirname))

app.listen(8100, () => {
    console.log('listening on http://localhost:8100')
})