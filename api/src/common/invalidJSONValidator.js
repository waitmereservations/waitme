module.exports.use = (app) =>
  app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
      //Handle SyntaxError here.
      return res.status(404).send({ data: "Invalid JSON data" });
    } else {
      next();
    }
  });
