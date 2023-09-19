const db = require('./db');
const Editora = require('../models/editora');
const Autor = require('../models/autor');
const Livro = db.sequelize.define('livro', {
    id_livro: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: db.Sequelize.STRING
    },
    fk_editora: {
        type: db.Sequelize.INTEGER,
        references: { model: 'editora', key: 'id_editora' },
        onDelete: 'CASCADE',
        allowNull: false,
    },
    fk_autor: {
        type: db.Sequelize.INTEGER,
        references: { model: 'autor', key: 'id_autor' },
        onDelete: 'CASCADE',
        allowNull: false,
    }
}, {freezeTableName: true});    

module.exports = Livro;