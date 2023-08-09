const { Router } = require("express");
const Nation = require("../database/Schema/Nation");
const { ObjectId } = require("mongoose");
const Character = require("../database/Schema/Character");
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
  const reqData = await Nation.find();

  res.status(200).send({
    message: "get nations success",
    status: "success",
    code: 200,
    data: reqData,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const reqData = await Nation.findById(id);
  let chaList = [];
  reqData.cha_live_at.map(async (cha) => {
    const chaData = await Character.findById(cha);
    chaList.push(chaData);
  });
  setTimeout(() => {
    const finalData = {
      _id: reqData._id,
      name: reqData.name,
      cha_live_at: chaList,
      __v: reqData.__v,
    };
    if (reqData) {
      res.status(200).send({
        message: "get nation successful",
        status: "success",
        code: 200,
        data: finalData,
      });
    } else {
      res.status(404).send({
        message: "nation not found",
        status: "failed",
        code: 404,
      });
    }
  }, 300);
});

router.post(
  "/",
  upload.fields([{ name: "background" }, { name: "archon" }]),
  async (req, res) => {
    const dateTime = giveCurrentDateTime();
    const postData = req.body;
    const backgroundData = req.files.background[0];
    const archonData = req.files.archon[0];
    const backgroundRef = ref(
      storage,
      `background/${backgroundData.originalname + "" + dateTime}`
    );
    const archonRef = ref(
      storage,
      `archon/${archonData.originalname + "" + dateTime}`
    );
    const backgroundMetaData = {
      contentType: backgroundData.mimetype,
    };
    const archonMetaData = {
      contentType: archonData.mimetype,
    };
    const backgroundSnapshot = await uploadBytesResumable(
      backgroundRef,
      backgroundData.buffer,
      backgroundMetaData
    );
    const archonShapshot = await uploadBytesResumable(
      archonRef,
      archonData.buffer,
      archonMetaData
    );
    const backgroundURL = await getDownloadURL(backgroundSnapshot.ref);
    const archonURL = await getDownloadURL(archonShapshot.ref);
    if (!postData) {
      res.status(400).send({
        message: "please enter nation name ",
        status: "failed",
        code: 400,
      });
    } else {
      try {
        const reqData = await Nation.find();
        const data = [
          ...reqData,
          {
            name: req.body.name,
            detail: req.body.detail ? req.body.detail : "",
            background: backgroundURL,
            archon: archonURL,
          },
        ];
        const result = await Nation.create(data);
        res.status(200).send({
          message: "create nation successful",
          status: "success",
          code: 200,
          data: result,
        });
      } catch (error) {
        res.status(400).send({
          message: "An error occured",
          code: 400,
          status: "failed",
          data: error,
        });
      }
    }
  }
);

router.put("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (name === "" || name === undefined) {
    res.status(400).send({
      message: "please enter nation name",
      status: "failed",
      code: 400,
    });
  } else {
    try {
      const reqData = await Nation.findById(id);
      if (!reqData) {
        res.status(404).send({
          message: "nation not found",
          status: "failed",
          code: 404,
        });
      } else {
        const data = {
          name: req.body.name,
          background: reqData.background,
          archon: reqData.archon,
        };
        const result = await Nation.updateOne(data);
        res.status(200).send({
          message: "update nation successful",
          status: "success",
          code: 200,
          data: result,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: "Nation name exist",
        code: 400,
        status: "failed",
        data: error,
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const reqData = await Nation.findById(id);
  if (!reqData) {
    res.status(404).send({
      message: "nation not found",
      status: "failed",
      code: 404,
    });
  } else {
    const result = await Nation.deleteOne({ name: reqData.name });
    res.status(200).send({
      message: "delete nation successful",
      status: "success",
      code: 200,
    });
  }
});

module.exports = router;
