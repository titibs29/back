const thing = require('../models/thing');
const Thing = require('../models/thing');

const fs = require('fs');

exports.showOneThing = (req,res,next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.showAllThings = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing= new Thing({
    ...thingObject,
    imageUrl:
    `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save().then(
    () => {
      res.status(201).json({ message: 'Post sauvegardé avec succès!' });
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};

exports.modifyThing = (req, res,next) => {
    const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res,next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        thing.deleteOne({ _id: req.param.id })
        .then(() => res.status(200).json({ message: 'objet supprimé !' }))
        .catch(erro => res.status(400).js({ error }));
      });
    })
    .catch(error => res.statusMessage(500).json({ error }));
};