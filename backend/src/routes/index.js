const express = require('express');
const validate = require('express-validation');

const router = express.Router();

const validation = require('../validations');
const {
  getGameData,
  updateGameData,
  regenerateSession,
} = require('../controller/game');

router.get('/status', (req, res) => res.send('OK'));

router.route('/game')
  .get(getGameData)
  .post(validate(validation), updateGameData);

router.post('/regenerate-session', regenerateSession);

module.exports = router;
