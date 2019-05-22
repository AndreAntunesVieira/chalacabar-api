import 'isomorphic-unfetch'
require('dotenv').config()
const express = require('express')
const { listenMessage } = require('./src/helpers/ServerHelpers')
const { routes } = require('./src/routes')
const bodyParser = require('body-parser')

const port = parseInt(process.env.PORT_API_SERVER, 10) || 3001

express()
  .use(bodyParser.json())
  .use(express.static('public'))
  .use('/', routes)
  .listen(port, listenMessage(port))
