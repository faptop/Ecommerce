const app = require("./app");
const dotenv=require("dotenv"); //using dotenv
// database importing
const connectdatabase=require("./config/datbase")
dotenv.config({path:"backend/config/config.env"});
// config(here we are giving path of config.env using dotenv)
 //using process.env.PORT we can excess PORT variable in config.env
//  ________________________________________
//  connecting to database
 connectdatabase();


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// unhandled promise error means if we provide wrong database connection link
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`sutting down server due to unhandeled promise error`)
    server.close(()=>{
        process.exit(1);
    });
});