const Sequelize = require('sequelize').Sequelize;
const DataTypes = require('sequelize').DataTypes;
const sequelize = new Sequelize('aquapark', 'sa', '123', {
    host: 'KeningTown',
    dialect: 'mssql'
  });

let getUsers = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Соединение открыто');
        const users = await sequelize.query('SELECT * FROM Client', { type: Sequelize.QueryTypes.SELECT });
        await sequelize.close();
        console.log('Соединение закрыто');
        console.log(users[0]);
    } catch (error) {
        console.log(error);
    }
}
//Получить все данные
const allData = async () => {
    try {
        await sequelize.authenticate();
        const data = await sequelize.query('SELECT  full_name, date_of_birth, discount_percent, zone_name, start_time, end_time from Zone_visits join Bracelets on bracelet_id = visited_bracelet_id join Client on client_id = client_id_on_bracelet join Zones on zone_id = visited_zone_id', { type: Sequelize.QueryTypes.SELECT });
        return data;
    } catch (error) { 
        console.log(error); 
    }
}

const clientsBetweenDates = async (from, to) => {
    try {
        // let regEx = /-/gi
        // let updatedFrom = from.replace(regEx, '.')
        // let updatedTo = to.replace(regEx, '.')
        await sequelize.authenticate();

        const rawData = await allData();
        const data = [];

        let splitFrom = from.split('-');
        let splitTo = to.split('-');

        const dateFrom = new Date(`${splitFrom[2]}-${splitFrom[1]}-${splitFrom[0]}`).getTime();
        const dateTo = new Date(`${splitTo[2]}-${splitTo[1]}-${splitTo[0]}`).getTime();
        
        rawData.forEach(client => {
            clientStartTime = new Date(client.start_time).getTime();
            clientEndTime = new Date(client.end_time).getTime();
            if( clientStartTime > dateFrom && clientEndTime < dateTo)
                data.push(client)
        })
        // const query = `SELECT  full_name, date_of_birth, discount_percent, zone_name, start_time, end_time from Zone_visits join Bracelets on bracelet_id = visited_bracelet_id join Client on client_id = client_id_on_bracelet join Zones on zone_id = visited_zone_id where start_time > \'${updatedFrom}\' and end_time < \'${updatedTo}\'`;
        // const data = await sequelize.query(query, {type: Sequelize.QueryTypes.SELECT });
        return data;
    } catch (error) {
      console.log(error)  
    } 
}

const getInfo = async (fullName) =>{
    try {
        await sequelize.authenticate();

        const rawData = await allData();
        const data = [];
        
        rawData.forEach(client => {
            if(fullName === client.full_name)
                data.push(client)
        })
        return data;
    } catch (error) {
        console.log(errro);
    }
}

// console.log(clientsBetweenDates('13-09-2000', '13-09-2025'));
module.exports = {clientsBetweenDates, allData, getInfo};






// Создать клиента
const createClient = async () =>{
    try {
        await sequelize.authenticate();
        const data = await sequelize.query('insert into Client (full_name, date_of_birth, discount_percent) values (\'Солдатов Алексей Александрович\', \'24.04.2003\', 3)');
        await sequelize.close();
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

// createClient();

let getId = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Соединение открыто');
        const users = await sequelize.query('SELECT * FROM Table_1', { type: Sequelize.QueryTypes.SELECT });
        // await sequelize.close();
        console.log('Соединение закрыто');
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}

const User = sequelize.define('user', {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey:  true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

const existingTable = sequelize.define('Table_1', {}, { freezeTableName: true });

async function syncModels() {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Передаём имя существующей таблицы во втором аргументе метода define
    await User.init(existingTable.rawAttributes, { sequelize, modelName: 'user' });
    console.log('Models have been synchronized successfully.');
    // await sequelize.close();
    

    // console.log('Ваня добавлен')
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}

async function addUser() {
    try {
      await sequelize.authenticate(); // Проверяем соединение
      console.log('Connection has been established successfully.');
  
      // Добавление записи в базу данных
      await User.create({id: 232, name: 'Doe'});
      console.log('Record has been added successfully.');
  
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

// syncModels();

// addUser();
//SELECT start_time, end_time, full_name. zone_name from Zone_visits join Bracelets on bracelet_id = visited_bracelet_id join Client on client_id = client_id_on_bracelet join Zones on zone_id = visited_zone_is