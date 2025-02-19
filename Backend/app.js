const express = require("express");
require("dotenv").config();
const cors = require("cors"); 
const useRoutes = require("./src/api/user/user.routes");

const app = express();
const port = process.env.PORT || 6600; 


app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));

app.use(express.json());

app.use("/api/users", useRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
