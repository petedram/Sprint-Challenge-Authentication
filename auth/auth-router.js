const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js')

const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');



router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  console.log('hash', hash)
  console.log('user', user)

  Users.add(user)
        .then(saved => {
        // pass the created user into the genToken() method, and get the token
        const token = genToken(saved);
        // return the user object, and the token.
        res.status(201).json({ created_user: saved, token: token });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

    console.log(username, password);


    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
              console.log('success! ', username);
                const token = genToken(user)
                // req.session.user = username;
                res.status(200).json({ username: user.username, token: token });
            } else {

                res.status(401).json({ message: 'you shall not pass!' });
            }
        })
        .catch(error => {
 
            res.status(500).json(error);
        });
});

function genToken(user) {
  
  const payload = {
    userid: user.id,
    username: user.username
    };
    
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secrets.jwtSecret, options);
  
    return token;
  }

module.exports = router;
