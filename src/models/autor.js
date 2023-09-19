const db = require('./db');
const Livro = require('../models/livro');
//reproduzindo a tabela Turma
const Autor = db.sequelize.define('autor', {
    id_autor: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeA: {
        type: db.Sequelize.TEXT
    }
    //freezeTableName: true define
    //o nome da tabela sem o S
}, { freezeTableName: true });

module.exports = Autor;