const express = require("express");
const app = express();
const PORT = process.env.PORT || 16078;

app.use("/about",express.static("./public"));

app.get("/hello",(request,response) => {
    response.send("Hello from the server!");
});

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}!`);
});