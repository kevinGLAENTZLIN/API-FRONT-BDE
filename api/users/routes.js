module.exports = app => {
    const item = require('./request.js');

    app.post('/item', (req, res) => {
        console.log("req = ", req);
        const item = {
            nom: req.body.nom,
            nombres: req.body.nombres,
            ref: req.body.ref,
            prix: req.body.prix
        }
        item.create(item);
    });
};