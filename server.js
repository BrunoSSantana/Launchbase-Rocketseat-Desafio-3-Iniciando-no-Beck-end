const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const cards = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

//Servindo

server.get("/", function(req, res) {
    return res.render("home")
})
server.get("/conteudos", function(req, res) {
    return res.render("conteudos", { cards: cards})
})
server.get("/conteudos/:id", function(req, res) {
    const id = req.params.id;

    const card = cards.find(function(card) {
        if(card.id == id) {
            return true
        } else if (!card) {
            return res.send(`Course Not Found!`)
        }
    })

    

    return res.render("course", { card })
  
});

server.get("/sobre", function(req, res) {
    return res.render("sobre")
})
//---not-found---//
server.use(function(req, res) {
    res.status(404).render("not-found");
  });



/* ====================================== */

server.listen(5000, function() {
    console.log("server is runing")
})
