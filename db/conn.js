const mongoose = require('mongoose');

// DataBase Connection
mongoose.connect( "mongodb://localhost:27017/UserDb", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log("[ User Database Connected... ]");
}).catch((e) => {
    console.log("[ User Database Connection Error! ]");
})