const express = require("express");
const path = require("path");

const app = express();

//when ever path has /static, we serve the static directory
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

//clicking the "links", send us back to the same html
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

//Any path at all, go back to the handler and send back index.html. 

//chooses the port for the server to run on, the default will be 5060
app.listen(process.env.PORT || 3000, () => console.log("Server Running....."));

//to run server, use node server.js