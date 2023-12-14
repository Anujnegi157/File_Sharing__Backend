
const {File} = require('../Model/file');
exports.showPage=async (req,res)=>{
  try{
  const file = await File.findOne({uuid:req.params.uuid});
  if(file){
    res.json({downloadLink : `${process.env.APP_BASE_URL}/files/download/${file.uuid}`});
  }else{
    res.json({err:"File not Found"})
  }
  }catch(err){
    res.json({error : err.message});
  }
 
}