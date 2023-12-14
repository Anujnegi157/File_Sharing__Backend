const express = require('express');
const router = express.Router();
const Download = require('../Controller/download.controller')

router.get('/download/:uuid',Download.Download);

module.exports=router;