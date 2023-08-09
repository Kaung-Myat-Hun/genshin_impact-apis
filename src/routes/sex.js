const { Router } = require("express");
const Sex = require("../database/Schema/Sex");
const Character = require("../database/Schema/Character");
const { ObjectId } = require("mongoose");
const router = Router();

router.get("/", async (req, res) => {
  const reqData = await Sex.find();

  res.status(200).send({
    message: "get sex success",
    status: "success",
    code: 200,
    data: reqData,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const reqData = await Sex.findById(id);
  let chaList = [];
  reqData.cha_list.map(async (cha) => {
    const chaData = await Character.findById(cha);
    chaList.push(chaData);
  });
  setTimeout(() => {
    const finalData = {
      _id: reqData._id,
      type: reqData.type,
      cha_list: chaList,
      __v: reqData.__v,
    };
    if (reqData) {
      res.status(200).send({
        message: "get sex successful",
        status: "success",
        code: 200,
        data: finalData,
      });
    } else {
      res.status(404).send({
        message: "sex not found",
        status: "failed",
        code: 404,
      });
    }
  }, 300);
});

router.post("/", async (req, res) => {
  const postData = req.body;
  if (!postData) {
    res.status(400).send({
      message: "please enter nation name",
      status: "failed",
      code: 400,
    });
  } else {
    try {
      const reqData = await Sex.find();
      const result = await Sex.create([...reqData, postData]);
      res.status(200).send({
        message: "create sex successful",
        status: "success",
        code: 200,
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        message: "Vison exist",
        code: 400,
        status: "failed",
        data: error,
      });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { type } = req.body;
  const { id } = req.params;
  if (type === "" || type === undefined) {
    res.status(400).send({
      message: "please enter type of sex male or female",
      status: "failed",
      code: 400,
    });
  } else {
    try {
      const reqData = await Sex.findById(id);
      const data = {
        cha_list: reqData.cha_list,
        type: req.body.type,
      };
      if (!reqData) {
        res.status(404).send({
          message: "sex not found",
          status: "failed",
          code: 404,
        });
      } else {
        const result = await Sex.updateOne(data);
        res.status(200).send({
          message: "update sex successful",
          status: "success",
          code: 200,
          data: result,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "sex exist",
        code: 400,
        status: "failed",
        data: error,
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const reqData = await Sex.findById(id);
  if (!reqData) {
    res.status(404).send({
      message: "sex not found",
      status: "failed",
      code: 404,
    });
  } else {
    const result = await Sex.deleteOne({ name: reqData.name });
    res.status(200).send({
      message: "delete sex successful",
      status: "success",
      code: 200,
    });
  }
});

module.exports = router;
