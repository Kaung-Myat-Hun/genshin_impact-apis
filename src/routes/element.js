const { Router } = require("express");
const Element = require("../database/Schema/Element");
const Character = require("../database/Schema/Character");
const { ObjectId } = require("mongoose");
const multer = require("multer");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};
const router = Router();

router.get("/", async (req, res) => {
  const reqData = await Element.find();

  res.status(200).send({
    message: "get visions success",
    status: "success",
    code: 200,
    data: reqData,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const reqData = await Element.findById(id);
  let chaList = [];
  reqData.cha_list.map(async (cha) => {
    const chaData = await Character.findById(cha);
    chaList.push(chaData);
  });
  setTimeout(() => {
    const finalData = {
      _id: reqData._id,
      name: reqData.name,
      cha_list: chaList,
      __v: reqData.__v,
    };
    if (reqData) {
      res.status(200).send({
        message: "get vision successful",
        status: "success",
        code: 200,
        data: finalData,
      });
    } else {
      res.status(404).send({
        message: "vision not found",
        status: "failed",
        code: 404,
      });
    }
  }, 300);
});

router.post("/", upload.single("element_image"), async (req, res) => {
  const postData = req.body;
  const imageData = req.file;
  const dateTime = giveCurrentDateTime();
  const imageRef = ref(
    storage,
    `images/${imageData.originalname + "" + dateTime}`
  );
  const imageMetadata = {
    contentType: imageData.mimetype,
  };
  const imageSnapshot = await uploadBytesResumable(
    imageRef,
    imageData.buffer,
    imageMetadata
  );
  const imageDownlodaURL = await getDownloadURL(imageSnapshot.ref);
  if (!postData) {
    res.status(400).send({
      message: "please enter nation name",
      status: "failed",
      code: 400,
    });
  } else {
    try {
      const reqData = await Element.find();
      const result = await Element.create([
        ...reqData,
        { ...postData, element_image: imageDownlodaURL },
      ]);
      res.status(200).send({
        message: "create vision successful",
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
  const { name } = req.body;
  const { id } = req.params;
  if (name === "" || name === undefined) {
    res.status(400).send({
      message: "please enter vision name",
      status: "failed",
      code: 400,
    });
  } else {
    try {
      const reqData = await Element.findById(id);
      const data = {
        name: req.body.name,
        cha_list: reqData.cha_list,
      };
      if (!reqData) {
        res.status(404).send({
          message: "vision not found",
          status: "failed",
          code: 404,
        });
      } else {
        const result = await Element.updateOne(data);
        res.status(200).send({
          message: "update vision successful",
          status: "success",
          code: 200,
          data: result,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Vision exist",
        code: 400,
        status: "failed",
        data: error,
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const reqData = await Element.findById(id);
  if (!reqData) {
    res.status(404).send({
      message: "vision not found",
      status: "failed",
      code: 404,
    });
  } else {
    const result = await Element.deleteOne({ name: reqData.name });
    res.status(200).send({
      message: "delete vision successful",
      status: "success",
      code: 200,
    });
  }
});

module.exports = router;
