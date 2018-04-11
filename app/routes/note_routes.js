const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  const collection = db.collection('notes-xvi');
  const dbError = { "Error": "An error has occured!" };

  app.post('/notes', (req, res) => {
    const note = { title: req.body.title, body: req.body.body };
    collection.insert(note, (err, result) => {
      res.send(err ? dbError : result.ops[0]);
    });
  });

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    collection.findOne(details, (err, item) => {
      res.send(err ? dbError : item);
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    const note = { title: req.body.title, body: req.body.body };
    collection.update(details, note, (err, result) => {
      res.send(err ? dbError : note);
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    collection.remove(details, (err, item) => {
      res.send(err ? dbError : "Note " + req.body.title + " has been deleted!");
    });
  });
};
