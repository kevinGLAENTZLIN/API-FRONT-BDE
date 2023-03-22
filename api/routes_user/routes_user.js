const request_sql = require('../DataBase/database.js');
const BodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../authentification/auth.js');
require('dotenv').config();
var JsonParser = BodyParser.json();
var express = require('express');
var router_user = express.Router()
const cors = require('cors');
const { password } = require('../config/config.js');
router_user.use(cors());

const call_api_admin_add = async (req) => {
  const newUser = {
    name: req.body.name,
    nom: req.body.nom,
    password: null,
    years: req.body.years,
    accessToken: null,
    law: req.body.law
  }
  newUser.password = await bcrypt.hash(req.body.password, 10);
  newUser.accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

  request_sql.query(`INSERT INTO utilisateur VALUES ("${newUser.name}", "${newUser.nom}", "${newUser.years}", "${newUser.accessToken}", "${newUser.password}", "${newUser.law}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
  });
}

call_api_admin_display = async () => {
  request_sql.query('SELECT * FROM utilisateur', (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
  });
}

call_api_admin_update = async (req) => {
  const UpdateUser = {
    name: req.body.name,
    nom: req.body.nom,
    years: req.body.years,
    law: req.body.law
  }
  request_sql.query('UPDATE utilisateur SET name = ?, nom = ?, years = ?, law = ? WHERE name = ?',
    [UpdateUser.name, UpdateUser.nom, UpdateUser.years, UpdateUser.law, UpdateUser.name], (err, res) => {
      if (err) {
        console.log("error :", err)
        return;
      }
    });
}

call_api_admin_delete = async (req) => {
  const DeleteUser = {
    name: req.body.name,
  }
  request_sql.query('DELETE FROM utilisateur WHERE name = ?', [DeleteUser.name], (err, res) => {
    if (err) {
      console.log("error :", err)
      return;
    }
  });
}

router_user.post('/add', JsonParser, auth.verifyToken, async (req, res) => {
  let isAuth

  await auth.find_law_value("law", req.body.accesToken, (err, ret) => {
    if (err) {
      console.log('Error:', err);
    } else {
      isAuth = ret[0].law;
      if (isAuth == undefined) {
        res.status(500);
        return;
      }
      if (isAuth == process.env.ADMIN) {
        call_api_admin_add(req);
        res.status(200).send("USER ADD");
      } else {
        res.status(403).send("PERMISSION DENIED");
      }
    }
  });
});

router_user.get('/show', JsonParser, auth.verifyToken, async (req, res) => {
  let isAuth

  await auth.find_law_value("law", req.body.accesToken, (err, ret) => {
    if (err) {
      console.log('Error:', err);
    } else {
      isAuth = ret[0].law;
      if (isAuth == undefined) {
        res.status(500);
        return;
      }
      if (isAuth == process.env.ADMIN) {
        call_api_admin_display();
        res.status(200).send("ALL USER WELL DISPLAYED");
      } else {
        res.status(403).send("PERMISSION DENIED");
      }
    }
  });
});

router_user.put('/update', JsonParser, auth.verifyToken, async (req, res) => {
  let isAuth
  await auth.find_law_value("law", req.body.accesToken, (err, ret) => {
    if (err) {
      console.log('Error:', err);
    } else {
      isAuth = ret[0].law;
      if (isAuth == undefined) {
        res.status(500);
        return;
      }
      if (isAuth == process.env.ADMIN) {
        call_api_admin_update(req);
        res.status(200).send("USER UPDATE");
      } else {
        res.status(403).send("PERMISSION DENIED");
      }
    }
  });
});

router_user.delete('/delete', JsonParser, auth.verifyToken, async (req, res) => {
  let isAuth

  await auth.find_law_value("law", req.body.accesToken, (err, ret) => {
    if (err) {
      console.log('Error:', err);
    } else {
      isAuth = ret[0].law;
      if (isAuth == undefined) {
        res.status(500);
        return;
      }
      if (isAuth == process.env.ADMIN) {
        call_api_admin_delete(req);
        res.status(200).send("USER SUCCEFULY REMOVE");
      } else {
        res.status(403).send("PERMISSION DENIED");
      }
    }
  });
});

router_user.post('/login', JsonParser, async (req, res) => {
  var user = null
  request_sql.query('SELECT * FROM utilisateur WHERE name = ?', [req.body.name], (err, result) => {
    if (err) {
      console.log("error :", err)
      return;
    }
    user = result[0];
    if (!user)
      return res.status(400).send('User not found');
    bcrypt.compare(req.body.password, user.password, async function (err, result) {
      if (result === true) {
        const json = JSON.stringify(user);
        const object = JSON.parse(json);
        object.accesToken = null;
        const token = jwt.sign(object, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        request_sql.query('UPDATE utilisateur SET accesToken = ? WHERE name = ?', [token, req.body.name], (err, res) => {
          if (err) {
            console.log("error :", err)
            return;
          }
        });
        return res.status(200).json(token);
      } else {
        return res.status(400).send('Email or password is wrong');
      }
    });
  });
})

router_user.post('/verifToken', JsonParser, async (req, res) => {
  const { accesToken } = req.body;
  if (!accesToken) { res.status(400).send("You must provid an accessToken") }
  jwt.verify(accesToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(err);
    res.status(200);
  });
  res.status(400)
});

module.exports = router_user;
