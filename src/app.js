const express = require("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express(); 
const rota_editora = require('./routes/rota_editora');
const rota_autor = require('./routes/rota_autor');
const rota_livro = require ('./routes/rota_livro');
const rota_auth = require('./routes/rota_auth');
const session = require('express-session');


app.use(session({
    secret: 'seuSegredo',
    resave: false,
    saveUninitialized: true
}));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use('/rota_editora', rota_editora);
app.use('/rota_autor', rota_autor);
app.use('/rota_livro', rota_livro);
app.use('/auth', rota_auth);



const PORT = 8000;
app.listen(PORT, () => {
console.log("Servidor Rodando");
}); 