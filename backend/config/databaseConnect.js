const mongoose =require('mongoose');

const connection  = ()=>{
    mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then((data)=>{
    console.log(`Mongodb connected with server :${data.connection.host}`)

})
}


module.exports = connection