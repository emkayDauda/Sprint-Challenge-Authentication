const router = require('express').Router();
const bcrypt = require('bcrypt')

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
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

module.exports = router;
