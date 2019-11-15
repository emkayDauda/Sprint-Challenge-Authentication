const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('./authModel')

router.post('/register', authBodyValidator, (req, res) => {
  // implement registration
  db.insert(req.valHashedUser)
  .then(user => {
    if (user) {
      res.status(201).json(user)
    }
  })
});

router.post('/login', authBodyValidator, (req, res) => {
  // implement login
});

function authBodyValidator(req, res, next){
  const { username, password } = req.body;

  if(!Object.keys(req.body).length){
    res.status(400).json({error: true, message: `Request body missing`})
  } else if (!username || !password) {
    res.status(400).json({error: true, message: `Required parameter missing`})
  } else{
    const hashedPassword = bcrypt.hashSync(password, 10)
    req.valHashedUser = {username, password: hashedPassword}
    req.valUser = {username, password}
    next()
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(
    payload,
    process.env.SECRET,
    options
  );

  return result;
}

module.exports = router;
