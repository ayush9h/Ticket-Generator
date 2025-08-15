const mongoose = require("mongoose")


const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    }catch(err){
        console.error("error connecting to mongodb", err)
        process.exit(1)
    }
};

module.exports  = connectDB