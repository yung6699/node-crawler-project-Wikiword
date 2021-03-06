const express = require('express'),
  request = require('request'),
  bodyParser = require('body-parser'),
  CORS = require('cors')(),
  app = express(),
  naver = require('./naver'),
  API_KEY = require('../common/wikiword').API_KEY

var options = {
  url: null,
  headers: {
    'X-naver-Client-Id': API_KEY.naver_client_id,
    'X-naver-Client-Secret': API_KEY.naver_secret
  }
}

app.use(CORS)
app.use(bodyParser.urlencoded({extended: false}))

/* type에 news or book을 넣으면 거기에 맞는 json을 출력한다. */
app.get('/:type', (req, res) => {
  let type = req.params.type
  let url = 'https://openapi.naver.com/v1/search/' + type + '?display=5&query=' +
  encodeURI(req.query.search, 'utf-8') + '&start=' + req.query.pageNum

  options.url = url
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'})
      res.end(naver.analyzeJSON(body, type))
    } else {
      console.log('Error = ' + res.status(response.statusCode).end())
    }
  })
})

exports.app = app
