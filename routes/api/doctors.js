const express = require("express");
const Doctor = require("../../models/doctor");

//create our router
const router = express.Router();

router.get("/", (req, res) => {
  Doctor.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [
            parseFloat(req.query.lng) || 34.893007620253734,
            parseFloat(req.query.lat) || 35.88172018409736,
          ],
        },
        distanceField: "dist.calculated",
        maxDistance: 2000,
        spherical: true
      },
    },
  ])
    .then((docs) => res.json(docs))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  Doctor.create(req.body)
    .then((doc) => res.json(doc))
    .catch((err) => console.log(err.message));
});

router.put("/:id", (req, res) => {
  Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => res.json(doc))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  Doctor.findByIdAndDelete(req.params.id)
    .then((doc) => res.json(doc))
    .catch((err) => console.log(err));
});

module.exports = router;
