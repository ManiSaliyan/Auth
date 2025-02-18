import mongoose from "mongoose";
const conDB = async ()=>{
    const uri = process.env.MONGO_URI;
    try{
        await mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log("MongoDB Connected");
        }).catch((err)=>{
            console.log(err)
        });
    }catch(err){
        console.log(err);
        console.log("mongo conn faled")
    }
}
conDB();
export default conDB;
