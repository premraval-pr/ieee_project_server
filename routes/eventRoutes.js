const express = require("express");
const { request } = require("http");
const router = express.Router();
const bodyParser = require("body-parser");
const dataModel = require("../models/event");
const { json } = require("body-parser");
const jsonParser = bodyParser.json();
router.get("/", async (req, res) => {
  try {
    const data = await dataModel.find();
    return res.status(200).json(data);
  } catch (err) {
    console.log("error found " + err);
    res.status(404).json({errors : errors.array()});
  }
});
router.post("/", jsonParser, async (req, res) => {
  try {
    console.log(req);
    const newData = new dataModel({
      name: req.body.name,
      date: req.body.date,
      text: req.body.text,
      image: req.body.image,
      material_type: req.body.material_type,
      uploadedby: req.body._id,
    });
    await newData.save();
    return res.status(200).json(newData);
  } catch (err) {
    res.status(500).end(error);
    console.log(err);
  }
});
router.get("/getvalues", jsonParser, async (req, res) => {
    console.log(req.body);
    try{
        const event = await dataModel.find({ _id: req.body._id });
        if (!event) {
          return res.status(404).json({errors : errors.array()});
        } else {
          return res.status(200).json(event);
        }    
    }
    catch(err){
        res.status(404).json({errors : errors.array()});
        console.log(err);
    }
  });
router.patch("/", async (req, res) => {
  try {
    const event = await dataModel.findOne({ _id: req.body._id });
    name = req.body.name,
    date = req.body.date,
    text = req.body.text,
    image = req.body.image,
    material_type = req.body.material_type,
    uploadedby = req.body._id,
    await event.save();
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
