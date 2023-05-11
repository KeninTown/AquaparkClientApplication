const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const {allData, clientsBetweenDates, getInfo} = require('./sequilese.js');

const app = express();


app.use('/',express.static(__dirname + '/public'));
app.use('/api/user', express.static(__dirname + '/public'));
app.use('/api/admin', express.static(__dirname + '/public'));
app.use('/api/admin/:method', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(__dirname +'/templates/index.ejs');
});

app.get('/api/:role/info', (req, res) => {
  res.render(__dirname +'/templates/info.ejs');
})


app.get('/api/:role/info/data', async (req, res) => {
  const data = await getInfo(req.query.fullName);
  res.render(__dirname +'/templates/adminFullData.ejs', {users:data});
})

app.get('/api/:role', (req, res) => {
  res.render(__dirname +`/templates/${req.params.role}.ejs`);
})

app.route('/api/:role/create')
  .get((req, res) => {
    res.render(__dirname +'/templates/createNewClient.ejs')
  })
  .post((req, res) => {
    
})

app.get('/api/admin/amount', (req, res) => {
  res.render(__dirname +'/templates/adminBetweenDates.ejs')
})

app.get('/api/admin/amount/data', async (req, res)  =>{
  const data = await clientsBetweenDates(req.query.from, req.query.to);
  res.render(__dirname +'/templates/adminFullData.ejs', {users:data});
})

app.get('/api/admin/full', async (req, res) => {
  const data = await allData();
  console.log(data);
  res.render(__dirname +'/templates/adminFullData.ejs', {users:data});
})




// Connection to DB


// const executeSQL = (sql, callback) => {
//   let connection = new Connection({
//     "authentication": {
//       "options": {
//         "userName": "sa",
//         "password": "123"
//       },
//       "type": "default"
//     },
//     "server": "KeningTown",
//     "options": {
//       "validateBulkLoadParameters": false,
//       "rowCollectionOnRequestCompletion": true,
//       "database": "aquapark",
//       "encrypt": false
//     }
//   });

// connection.connect((err) => {
//   if (err)
//     return callback(err, null);
//   const request = new Request(sql, (err, rowCount, rows) => {
//     connection.close();
//     if (err)
//       return callback(err, null);
//     callback(null, {rowCount, rows});
//   });

//   request.on('row', columns => {
//     columns.forEach(column => {
//     console.log(column.value);
//     });
//   });
  
//   connection.execSql(request);
// });
// };

// executeSQL("SELECT zone_name FROM Zones", (err, data) => {
//   if (err)
//     console.error(err);
//   console.log(data.rowCount);
// });

// executeSQL("SELECT * FROM Client", (err, data) => {
//   if (err)
//     console.error(err);
//   console.log(data.rowCount);
// });

const listener = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
