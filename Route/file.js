const express = require('express');
const FileController = require('../Controller/file.controller')
const router = express.Router();

const multer = require('multer');

router.post('/files',FileController.PostFile)
router.post('/files/send',FileController.SendMail);


module.exports = router;