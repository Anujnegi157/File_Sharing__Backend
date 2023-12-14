const nodemailer = require('nodemailer');

async function SendMail({from,to,subject,text,html}){
 let transporter = nodemailer.createTransport({
  host : process.env.SMPT_HOST,
  port : process.env.SMPT_PORT,
  secure : false,
  auth : {
    user : process.env.USER,
    pass : process.env.PASSWORD
  }
 }) 
 let info = await transporter.sendMail({
  from : from,
  to : to,
  subject : subject,
  text : text,
  html : html,
 })
}

module.exports = SendMail;