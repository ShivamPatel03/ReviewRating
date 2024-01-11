exports.IsUser = async (req, res, next) => {
  console.log(req.body.role);
  if (req.body.role === "user") {
    console.log('if executed')
    next();
  }else{
  return res.status(401).send("Unauthorized!");
  }
};

exports.IsAdmin = async (req, res, next) => {
  if (req.body.role === "admin") {
    next();
  }else{
  return res.status(401).send("Unauthorized!");
  }
};
