const Item = require('./request.js');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le message ne peut pas etre vide"
    });
}

const item = new Item({
    nom: req.body.nom,
    nombres: req.body.nombres,
    ref: req.body.ref,
    prix: req.body.prix
});

Item.create(item.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Y'a un problème lors de la création chef"
    });
    else 
        res.send(data);
  });
};