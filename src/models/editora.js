const db = require('./db');
const Livro = require('../models/livro');
//reproduzindo a tabela Turma
const Editora = db.sequelize.define('editora', {
id_editora: {
type: db.Sequelize.INTEGER,
autoIncrement: true,
allowNull: false,
primaryKey: true
},
nome: {
type: db.Sequelize.TEXT
},
estado:
{
    type: db.Sequelize.TEXT
},
cidade:
{
    type: db.Sequelize.TEXT
},
logradouro:
{
    type: db.Sequelize.TEXT
}

}, { freezeTableName: true });




module.exports = Editora;