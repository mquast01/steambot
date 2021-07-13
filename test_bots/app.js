const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

app.set("view engine", "hbs");
app.engine(
"hbs",
handlebars({
layoutsDir: __dirname + "/views/layouts",
extname: "hbs",
})
);

app.get("/", (req, res) => {
res.render("main", {
//layout: "steam-layout",
layout: false,
title: "Hey There, World!",
message: "This is a fantastic example of Handlebars!",
});
});

app.listen(3037);