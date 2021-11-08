const express = require('express');
const path = require('path');
const app = express();

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..','public')));

// routing to apis
app.use('/api', require('./api'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));


// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

app.use((err, req, res) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});


module.exports = app;
