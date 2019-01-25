const express = require("express");
const logger = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;

const data = [{
  id: 1,
  username: "addyosmani"
}, {
  id: 2,
  username: "paulirish"
}];

app.use(logger("dev"));

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use("/static", express.static("./public"))

app.get("/", (request, response) => {
  response.render("main", {
    title: "Basic API"
  });
});

app.get("/api/users", (request, response) => {
  response
    .json(data)
    .status(200);
});

app.get("/api/users/:userId", (request, response) => {
  const userId = request.params.userId;

  const found = data.filter(user => user.id === parseInt(userId));

  response
    .json(found)
    .status(200);
});

app.listen(PORT, () => {
  console.log(`REST API running on PORT: ${ PORT }`)
})
