const express = require('express')
const nunjucks = require('nunjucks');

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/36343262?s=400&u=72fe0e239e85765d4f3d3d6407d416c6b4b657dd&v=4",
        name: "Claudio Ramalho",
        formation: "Ciências da Computação",
        project: "Cars JavaScript - Launch-Base",
        links: [
            {
                name: "Twitter", url: "https://twitter.com"
            },
            {
                name: "YouTube", url: "https://youtube.com"
            },
            {
                name: "GitHub", url: "https://github.com/claudiojrsx"
            }
        ]
    }

    return res.render("about", { about: about })
})

server.get("/carros", function(req, res) {
    return res.render("carros", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found.")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("Server is running.")
});
