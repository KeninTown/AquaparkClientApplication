const express = require('express');
const bodyParser = require('body-parser');
const {Connection, Request} = require("tedious");
require('dotenv').config();

const app = express();
app.use('/',express.static(__dirname + '/public'));
app.use('/api/user', express.static(__dirname + '/public'));
app.use('/api/admin', express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(__dirname +'/templates/index.ejs');
});

app.get('/api/user', (req, res) => {
  res.render(__dirname +'/templates/user.ejs');
})

app.get('/api/admin', (req, res) => {
  res.render(__dirname +'/templates/admin.ejs')
})

app.get('/api/json', (req, res) => {
  res.json({name: 'KeningTown'})
});

app.route('/api/user/create')
  .get((req, res) => {
    res.render(__dirname +'/templates/userCreate.ejs')
  })
  .post((req, res) => {
    
  })



//Connection to DB


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
