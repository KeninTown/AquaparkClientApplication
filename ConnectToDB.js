let Connection = require('tedious').Connection;  
let config = {  
    server: 'KeningTown',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sys', //update me
            password: 'newPassForNode'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'aquapark'  //update me
    }
};

let connection = new Connection(config);

module.exports = connection;