var request_sql = require('../DataBase/database.js');

const Item = function(item) {
    this.nom = item.nom;
    this.nombres = item.nombres;
    this.ref = item.ref;
    this.prix = item.prix;
};

Item.create = (newItem) => {
    console.log("new item = ", newItem);
    request_sql.query(`INSERT INTO inventaire (nom, nombres, ref, prix) VALUES (${newItem.nom}, ${newItem.nombres},
    ${newItem.ref}, ${newItem.prix}`, (err, res) => {
      if (err) {
        console.log("erreur: ", err);
        result(err, null);
        return;
    }
    console.log("création d'un nouvel item: ", {newItem});
    });
};

module.exports = Item;