const Sequelize = require('sequelize');
const db = require("../db/db");

module.exports = db.sequelize.define(
    'player',
    {
        p_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jerseyNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        height: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        weight: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        isFormer: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        isAdmin: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    },
    {
        timestamps: false
    }
);