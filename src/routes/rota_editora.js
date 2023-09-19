const express = require('express');
const router = express.Router();

const Editora = require('../models/editora')



router.get('/editora', (req, res) => {
    Editora.findAll().then((editoras) => {
        editoras = editoras.map((editora) => {
            return editora.toJSON();
        });
        res.render("./admin/editora/editora", { editoras: editoras });
    });
});


router.get('/editora/add', (req, res) => {
    res.render('./admin/editora/addeditora');
})

router.get('/editar_editora/:id', (req, res) => {
    Editora.findAll({ where: { 'id_editora': req.params.id } }).then((editoras) => {
        editoras = editoras.map((editora) => { return editora.toJSON() });
        res.render("./admin/editora/editeditora", {editoras: editoras });
    });
});

router.post('/editora/nova', (req, res) => {
    Editora.create({
        nome: req.body.nome,
        estado: req.body.estado,
        cidade: req.body.cidade,
        logradouro: req.body.logradouro
    }).then(() => {
        res.redirect("/rota_editora/editora");
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro);
    });
});

router.post('/editora/editar_editora', (req, res) => {
    Editora.update({
        nome: req.body.nome,
        estado: req.body.estado,
        cidade: req.body.cidade,
        logradouro: req.body.logradouro
    },
        {
            where: { id_editora: req.body.id_editora }
        }).then(() => {
            res.redirect("/rota_editora/editora");
        }).catch((erro) => {
            res.send("Esta editora não existe " + erro);
        });
});

router.get('/deletar_editora/:id', (req, res) => {
    Editora.destroy({ where: { 'id_editora': req.params.id } }).then(() => {
        res.redirect("/rota_editora/editora");
    }).catch((err) => {
        res.send("Esse editora não existe" + err);
    });
});

module.exports = router;