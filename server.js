const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// configure express
const app = express();

// enable all cors
app.use(cors());

// enable reading of json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.post('/translate', (req, res) => {
  var endpoint = "https://api.cognitive.microsofttranslator.com";
  axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
          'Ocp-Apim-Subscription-Key': process.env.subscriptionKey,
          'Ocp-Apim-Subscription-Region': process.env.location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
      },
      params: req.query,
      data: req.body,
      responseType: 'json'
  }).then(response => {
    const data1 = JSON.stringify(response.data, null, 4)
      console.log(JSON.stringify(response.data, null, 4));
      res.send(data1);
  }).catch(err => {
    console.log(err);
    res.status(404);
    res.send('error occured');
  })
})

// fallback 
app.use((req, res) => {
  res.status(404);
  res.send('404 File not found');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listening on ${PORT}`);
})