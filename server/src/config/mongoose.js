const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.BACKEND_URL}/ticket-generator`);
    }catch(err){
        console.error("error connecting to mongodb", err)
        process.exit(1)
    }
};

module.exports  = connectDB