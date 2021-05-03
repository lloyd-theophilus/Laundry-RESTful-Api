const express = require('express');
const router = express.Router();

const WashedController = require('../controllers/washed');

router.get('/', WashedController.washed_get_all);

router.post('/', WashedController.washed_create);

router.delete('/:id', WashedController.washed_delete);

router.get('/:washedid', WashedController.washed_get_washed)


module.exports = router;