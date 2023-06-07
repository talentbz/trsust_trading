const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    account_no:{
        type: DataTypes.STRING
    },
    api_token:{
        type: DataTypes.STRING
    },
    reward:{
        type: DataTypes.STRING
    },
    reward_stopout:{
        type: DataTypes.STRING
    }, 
    hedge:{
        type: DataTypes.INTEGER
    },
    hedge_stopout:{
        type: DataTypes.INTEGER
    },
    wallet:{
        type: DataTypes.INTEGER
    },
    investment:{
        type: DataTypes.INTEGER
    },
    begin_date:{
        type: DataTypes.DATEONLY
    },
    gross_profit:{
        type: DataTypes.INTEGER
    },
    usertype:{
        type: DataTypes.INTEGER
    },
    refresh_token:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

module.exports = Users;