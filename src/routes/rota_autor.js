const express = require('express');
const router = express.Router();

const Autor = require('../models/autor')

const verificarAutenticacao = require('../middleware/verificarAutenticacao');

router.use(verificarAutenticacao);

router.get('/autor', (req, res) => {
    Autor.findAll().then((autores) => {
        autores = autores.map((autor) => {
            return autor.toJSON();
        });
        res.render("./admin/autor/autor", { autores: autores });
    });
});


router.get('/autor/add', (req, res) => {
    res.render('./admin/autor/addautor');
})

router.get('/editar_autor/:id', (req, res) => {
    Autor.findAll({ where: { 'id_autor': req.params.id } }).then((autores) => {
        autores = autores.map((autor) => { return autor.toJSON() });
        res.render("./admin/autor/editautor", { autores: autores });
    });
});

router.post('/autor/novo', (req, res) => {
    Autor.create({
        nomeA: req.body.nomeA
    }).then(() => {
        res.redirect("/rota_autor/autor");
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro);
    });
});

router.post('/autor/editar_autor', (req, res) => {
    Autor.update({
        nomeA: req.body.nomeA
    },
        {
            where: { id_autor: req.body.id_autor }
        }).then(() => {
            res.redirect("/rota_autor/autor");
        }).catch((erro) => {
            res.send("Este(a) Autor(a) não existe " + erro);
        });
});

router.get('/deletar_autor/:id', (req, res) => {
    Autor.destroy({ where: { 'id_autor': req.params.id } }).then(() => {
        res.redirect("/rota_autor/autor");
    }).catch((err) => {
        res.render("Esse(a) autor(a) não existe");
    });
});

module.exports = router;