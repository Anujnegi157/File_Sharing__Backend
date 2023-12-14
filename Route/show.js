const express = require('express');
const {showPage} = require('../Controller/show.controller');
const router = express.Router();

router.get('/:uuid',showPage);

module.exports = router;