/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 */
module.exports = (handler) => async (req, res, next) => {
  handler(req, res, next).catch((err) => {
    if (process.env.NODE_ENV === 'development') {
      console.error({
        message: 'Error in request handler',
        error: err,
      });
    }

    return next(err);
  });
};
