const Sequelize = require('sequelize').Sequelize;
const DataTypes = require('sequelize').DataTypes;
const sequelize = new Sequelize('aquapark', 'sa', '123', {
    host: 'KeningTown',
    dialect: 'mssql',
    define: {
        freezeTableName: true
    },
    dialectOptions: {
        options: {
          encrypt: false // для подключения к базе данных с использованием шифрования SSL
        }
      }
  });


//Получить все данные
const allData = async () => {
    try {
        await sequelize.authenticate();
        const data = await sequelize.query('SELECT  full_name, total_cost, date_of_birth, discount_percent, deposit_amount, total_cost, zone_name, start_time, end_time from Zone_visits join Bracelets on bracelet_id = visited_bracelet_id join Client on client_id = client_id_on_bracelet join Zones on zone_id = visited_zone_id', { type: Sequelize.QueryTypes.SELECT });
        return data;
    } catch (error) { 
        console.log(error); 
    }
}

const clientsBetweenDates = async (from, to) => {
    try {
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
        return data;
    } catch (error) {
      console.log(error)  
    } 
}

const getInfo = async (fullName) =>{
    try {
        await sequelize.authenticate();

        const rawData = await sequelize.query('SELECT  full_name, total_cost, date_of_birth, discount_percent, deposit_amount, total_cost, zone_name, start_time, end_time from Zone_visits join Bracelets on bracelet_id = visited_bracelet_id join Client on client_id = client_id_on_bracelet join Zones on zone_id = visited_zone_id', { type: Sequelize.QueryTypes.SELECT });
        const data = [];
        rawData.forEach(client => {
            if(fullName === client.full_name)
                data.push(client)
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

const Client = sequelize.define('Client', {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:  true,
      autoIncrement: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_of_birth:{
        type: DataTypes.DATE,
        allowNull:true
    },
    discount_percent: DataTypes.INTEGER
  }, {timestamps:false});


const addClient = async (fullName, date, discount) =>{
    try {
        const dateArr = date.split('.')
        await Client.create({
            full_name: fullName,
            date_of_birth: new Date(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`),
            discount_percent: discount
        })
        return true; 
    } catch (error) {
        console.log(error)
    }
}

module.exports = {clientsBetweenDates, allData, getInfo, addClient};






//SELECT start_time, end_time, full_name. zone_name from Zone_visits join Bracelets on bracelet_id = visited_bracelet_id join Client on client_id = client_id_on_bracelet join Zones on zone_id = visited_zone_is