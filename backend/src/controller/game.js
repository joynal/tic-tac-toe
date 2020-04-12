const httpStatus = require('http-status');
const GameModel = require('../models/game');
const handleError = require('../middleware/error');

exports.getGameData = handleError(async (req, res) => {
  const game = await GameModel.findOne({ sessionID: req.sessionID });

  if (game) return res.status(httpStatus.OK).send(game);

  return res.status(httpStatus.NOT_FOUND).send({});
});

exports.updateGameData = handleError(async (req, res) => {
  const game = await GameModel.findOneAndUpdate(
    { sessionID: req.sessionID },
    { ...req.body, sessionID: req.sessionID },
    {
      new: true,
      upsert: true,
    },
  );

  return res.status(httpStatus.OK).send(game);
});

exports.regenerateSession = handleError(async (req, res) => {
  req.session.regenerate(console.error);
  console.log(req.sessionID);
  return res.status(httpStatus.OK).send({});
});
