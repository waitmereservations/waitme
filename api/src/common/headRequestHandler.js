module.exports.use = (app) =>
  app.head("*", (req, res, next) => {
    res.set("Cache-Control", "no-cache,max-age=0");
    res.set("Content-Type", "application/json");
    res.status(200).send("OK");
  });
