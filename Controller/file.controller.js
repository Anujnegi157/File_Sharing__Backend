const express = require('express');
const multer = require('multer');
const {v4:uuid4} = require('uuid');
const {File} = require('../Model/file');
const path = require('path');
const  SendMail   = require('../Services/emailService')
const emailTemplate   = require('../Services/emailTemplate');
let storage = multer.diskStorage({
  destination : (req,file,cb)=> cb(null,'Upload/'),
  filename  : (req,file,cb)=>{
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName)
  }
})
let upload = multer({
  storage:storage,
  limits : {fileSize : 1000000 * 100},
}).single('myfile');

exports.PostFile = async (req,res)=>{
  // valiadate req

  upload(req,res,async (err)=>{
    if(!req.file){
      return res.json({error : "All field are Required"});
    }
    if(err){
      return res.status(500).json({error:err.message});
    }
    const body = {
      filename : req.file.filename,
      path : req.file.path,
      size : req.file.size,
      uuid : uuid4(),

    }
    const doc = await File.create(body);
    return res.json({file : `${process.env.APP_BASE_URL}/files/${doc.uuid}`})

  })

}

exports.SendMail = async (req,res)=>{
  console.log("working");
 const { uuid,emailFrom,emailTo } = req.body;
 const file = await File.findOne({uuid});
 if(file.Sender){
  res.json({error : "email already Send"});
 }
 file.Sender = emailFrom;
 file.Receiver=emailTo;
 const respose = await file.save();
SendMail({
  from : emailFrom,
  to  : emailTo,
  subject : 'File Sharing App',
  text : `${emailFrom} shared a file with you `,
  html :  emailTemplate({
    emailFrom : emailFrom,
    downloadLink : `${process.env.APP_BASE_URL}/files/${file.uuid}`,
    size : parseInt(file.size/1000)+ 'KB',
    expires : '24 hours'
  })
})
res.json({msg : "mail send"});
}