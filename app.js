const express = require("express"); // importing express to our project
const app = express(); // invoke the express method
app.use(express.json()); // middleware that allows us to read incoming request as a JSON object

const routes = require("./controllers/routes");

const PORT = 4000;

app.use("/routes", routes)

app.listen(PORT, () => {
    console.log("server is running on port", PORT);
});