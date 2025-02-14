const express = require("express");
require("dotenv").config(); 
const useRoutes =require("./src/api/user/user.routes");



const app = express();
const port = process.env.PORT ; 

app.use(express.json()); 


app.use("/api/users",useRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
