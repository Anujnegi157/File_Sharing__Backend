const {File} = require('../Model/file'); 
const path = require('path');
exports.Download = async (req,res)=>{
  try{
  const file = await File.findOne({uuid : req.params.uuid});
  if(!file){
    res.json({error : "File not found"});
  }
  const FilePath = path.join(__dirname, '..', file.path);
  console.log(FilePath);
  res.download(FilePath);

  }catch(err){
    res.json({error : err.message});
  }
}