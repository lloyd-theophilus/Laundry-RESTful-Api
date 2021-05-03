const express = require('express');
const router = express.Router();

const ReceivedController = require('../controllers/received');

router.get('/', ReceivedController.receive_get_all);

router.post('/', ReceivedController.received_create);

router.delete('/:id', ReceivedController.received_delete);

router.get('/:receivedid', ReceivedController.received_get_received);



module.exports = router;