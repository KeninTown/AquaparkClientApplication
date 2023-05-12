const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const {allData, clientsBetweenDates, getInfo, addClient} = require('./sequilese.js');

const app = express();


app.use('/',express.static(__dirname + '/public'));
app.use('/api/user', express.static(__dirname + '/public'));
app.use('/api/admin', express.static(__dirname + '/public'));
app.use('/api/:role/:method', express.static(__dirname + '/public'));
app.use('/api/admin/:method', express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(__dirname +'/templates/index.ejs');
});

app.get('/api/:role/info', (req, res) => {
  res.render(__dirname +'/templates/info.ejs', {role:req.params.role});
})


app.get('/api/:role/info/data', async (req, res) => {
  const data = await getInfo(req.query.fullName);
  console.log(req.params.role);
  res.render(__dirname +'/templates/adminFullData.ejs', {users:data, role: req.params.role});
})

app.get('/api/:role', (req, res) => {
  res.render(__dirname +`/templates/${req.params.role}.ejs`);
})

app.route('/api/:role/create')
  .get((req, res) => {
    res.render(__dirname +'/templates/createNewClient.ejs', {succes:''})
  })
  .post(async (req, res) => {
    try {
      await addClient(req.body.fullName, req.body.dateOfBirth, req.body.discount);
      res.render(__dirname +'/templates/createNewClient.ejs', {succes:'Клиент успешно создан и добавлен в базу данных'})
    } catch (error) {
      console.log(error);
    }
})

app.get('/api/admin/amount', (req, res) => {
  res.render(__dirname +'/templates/adminBetweenDates.ejs')
})

app.get('/api/admin/amount/data', async (req, res)  =>{
  try {
    const data = await clientsBetweenDates(req.query.from, req.query.to);
    res.render(__dirname +'/templates/adminFullData.ejs', {users:data});
  } catch (error) {
    console.log(error);
  }
  
})

app.get('/api/admin/full', async (req, res) => {
  
  try {
    const data = await allData();
    res.render(__dirname +'/templates/adminFullData.ejs', {users:data});
  } catch (error) {
    console.log(error);
  }
})
const listener = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
