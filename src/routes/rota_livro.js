const express = require('express');
const router = express.Router();

const Autor = require('../models/autor');
const Editora = require('../models/editora');
const Livro = require('../models/livro');

const verificarAutenticacao = require('../middleware/verificarAutenticacao');

router.use(verificarAutenticacao);

router.get('/livro', (req, res) => {
    Livro.sequelize.query("select * from selecLivro",
        { model: Livro }).then(function (livros) {
            var nlivros = JSON.parse(JSON.stringify(livros));
            res.render("admin/livro/livro",
                { livros: nlivros });
        });
});

router.get('/livro/add', async (req, res) => {
    try {
        const [editoras, autores] = await Promise.all([
            Editora.findAll(),
            Autor.findAll()
        ]);

        var neditoras = JSON.parse(JSON.stringify(editoras));
        var nautores = JSON.parse(JSON.stringify(autores));

        res.render("admin/livro/addlivro", { editoras: neditoras, autores: nautores });
    } catch (erro) {
        res.send("Ocorreu um erro ao buscar editoras e autores: " + erro);
    }
});

router.get('/editar_livroEditora/:id', (req, res) => {
    Livro.findAll({ where: { 'id_livro': req.params.id } }).then((livros)=> {
        //pega as turmas cadastradas para popular o select do html
        Editora.findAll().then((editoras) => {
            var neditora = JSON.parse(JSON.stringify(editoras));
            var nlivro = JSON.parse(JSON.stringify(livros));
            res.render("admin/livro/editlivro", {
                livros: nlivro,
                editoras: neditora
            });
        });
    });
});

router.get('/editar_livroAutor/:id', (req, res) => {
    Livro.findAll({ where: { 'id_livro': req.params.id } }).then((livros)=> {
        //pega as turmas cadastradas para popular o select do html
        Autor.findAll().then((autores) => {
            var nautor = JSON.parse(JSON.stringify(autores));
            var nlivro = JSON.parse(JSON.stringify(livros));
            res.render("admin/livro/editlivroAutor", {
                autores: nautor,
                livros: nlivro
            });
        });
    });
});





router.post('/livro/novo', (req, res) => {

    Livro.create({
        titulo: req.body.titulo,
        fk_editora: req.body.fk_editora,
        fk_autor: req.body.fk_autor
    }).then(() => {
        res.redirect("/rota_livro/livro");
    }).catch((erro) => {
        res.send('Houve um erro' + erro);
    });

});

router.post('/livro/editar_livroEditora', (req, res) => {
    Livro.update({
        titulo: req.body.titulo,
        fk_editora: req.body.fk_editora
    },
        {
            where: { id_livro: req.body.id_livro }
        }).then(() => {
            res.redirect("/rota_livro/livro");
        }).catch((erro) => {
            res.send("Este livro não existe " + erro);
        });
});


router.post('/livro/editar_livroAutor', (req, res) => {
    Livro.update({
        titulo: req.body.titulo,
        fk_autor: req.body.fk_autor
    },
        {
            where: { id_livro: req.body.id_livro }
        }).then(() => {
            res.redirect("/rota_livro/livro");
        }).catch((erro) => {
            res.send("Este livro não existe " + erro);
        });
});

router.get('/deletar_livro/:id', (req, res) => {
    Livro.destroy({ where: { 'id_livro': req.params.id } }).then(() => {
        res.redirect("/rota_livro/livro");
    }).catch((err) => {
        res.render("Esse livro não existe");
    });
});

module.exports = router;
