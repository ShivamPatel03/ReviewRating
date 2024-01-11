const mongoose=require('mongoose')

mongoose.connect(process.env.url,{ useNewUrlParser: true });
const con = mongoose.connection;

con.once('open',function(){
    console.log('connection has completed')
})

