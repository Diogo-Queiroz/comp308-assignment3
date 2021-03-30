const db = require('../models');
const Tutorial = db.tutorials;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({message: "Content can not be empty"});
    return;
  }
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  tutorial.save(tutorial).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating"
    });
  });
};

exports.findAll = (req, res) => {
  const title = req.body.title;
  let condition = title ? {title: { $regex: new RegExp(title), $options: "i"}} : {};

  Tutorial.find(condition).then(data =>{
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred retrieving"
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.body.id;

  Tutorial.findOne(id).then(data =>{
    if (!data)
      res.status(400).send({message: "Data not found with id: " + id});
    else
      res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred retrieving with id: " + id
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({message: "Data to update cannot be empty"});
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
    if (!data) {
      res.status(400).send({message: "Cannot update with id: " + id});
    }
    else
      res.send({message: "Tutorial updated successfully"});
  }).catch(err => {
    res.status(500).send({
      message: "Error updating tutorial"
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Tutorial.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
    if (!data) {
      res.status(400).send({message: "Cannot delete with id: " + id});
    }
    else
      res.send({message: "Tutorial deleted successfully"});
  }).catch(err => {
    res.status(500).send({
      message: "Error deleting tutorial"
    })
  })
};

exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({}).then(data => {
    res.send({message: `Deleted all ${data.deletedCount} Tutorials`});
  }).catch(err => {
    res.status(500).send({
      message: "Some error occurred while deleting all Tutorials"
    });
  });
};

exports.findAllPublished = (req, res) => {
  Tutorial.find({published: true}).then(data =>{
    res.send(data);
  }).catch(err =>{
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving published tutorials"
    });
  });
};
