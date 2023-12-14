  const mongoose = require('mongoose');

  require('dotenv').config();

  const password = process.env.DB_PASSWORD;


  async function connectDb(){
  try{
    const ans = await mongoose.connect(`mongodb+srv://anujnegi157:${password}@filesharing.3naa4st.mongodb.net/?retryWrites=true&w=majority`)
    console.log("connected to database");
  }catch(err){
    console.log(err);
  }  
  }

  const fileSchema = new mongoose.Schema({
    filename : {
      type : String,
      required : true
    },
    path : {
      type : String,
      required : true
    },
    size : {
      type : Number,
      required : true
    },
    uuid : {
      type : String,
      required : true
    },
    Sender : {
      type : String,
      required : false
    },
    Receiver : {
      type : String,
      required : false
    }
  })
  const File = mongoose.model('File', fileSchema);
  module.exports = {connectDb,File};