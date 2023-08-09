const { Router } = require("express");
const Characters = require("../database/Schema/Character");
const Nation = require("../database/Schema/Nation");
const Element = require("../database/Schema/Element");
const Sex = require("../database/Schema/Sex");
const Weapon = require("../database/Schema/Weapon");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const firebaseConfig = {
  // ---- your firebase config keys
};
const appF = initializeApp(firebaseConfig);
const admin = require("firebase-admin");
const serviceAccountKey = "./serviceAccountKey.json";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});
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
  const { sex, nation, weapon, vision } = req.query;
  const nationData = await Nation.findById(nation);
  const sexData = await Sex.findById(sex);
  const weaponData = await Weapon.findById(weapon);
  const visionData = await Element.findById(vision);
  const chaData = await Characters.find();
  if (
    nation === undefined &&
    sex === undefined &&
    weapon === undefined &&
    vision === undefined
  ) {
    return res.status(200).send({
      message: "get data",
      status: "success",
      code: 200,
      data: chaData,
    });
  }
  if (
    nation !== undefined &&
    sex !== undefined &&
    weapon !== undefined &&
    vision !== undefined
  ) {
    let finalNotWeaponData = [];
    nationData.cha_live_at.forEach((cha) => {
      const filteredData = sexData.cha_list.filter((sex) => cha !== sex);
      finalNotWeaponData = [...filteredData];
    });

    let finalnotVisionData = [];
    finalNotWeaponData.map((cha) => {
      const fiteredData = weaponData.cha_list.filter((weap) => cha !== weap);
      finalnotVisionData = [...fiteredData];
    });

    let finalData = [];
    finalnotVisionData.map((cha) => {
      const filteredData = visionData.cha_list.filter(
        (vision) => cha !== vision
      );
      finaData = [...filteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      return res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
  if (
    nation === undefined &&
    weapon === undefined &&
    sex !== undefined &&
    vision === undefined
  ) {
    let sexChaList = [];
    sexData.cha_list.map(async (cha) => {
      const chaData = await Characters.findById(cha);
      sexChaList.push(chaData);
    });
    setTimeout(() => {
      const data = {
        type: sexData.type,
        cha_list: sexChaList,
        _id: sexData._id,
        __v: sexData.__v,
      };
      return res.status(200).send({
        message: "get data by sex",
        status: "success",
        code: 200,
        data: data,
      });
    }, 300);
  }
  if (
    nation === undefined &&
    weapon !== undefined &&
    sex === undefined &&
    vision === undefined
  ) {
    let nationChaList = [];
    weaponData.cha_live_at.map(async (cha) => {
      const chaData = await Characters.findById(cha);
      nationChaList.push(chaData);
    });
    setTimeout(() => {
      const data = {
        type: nationData.type,
        cha_list: nationChaList,
        _id: nationData._id,
        __v: nationData.__v,
      };
      return res.status(200).send({
        message: `get data by nation`,
        status: "success",
        code: 200,
        data: data,
      });
    }, 300);
  }
  if (
    nation !== undefined &&
    weapon === undefined &&
    sex === undefined &&
    vision === undefined
  ) {
    let sexChaList = [];
    nationData.cha_list.map(async (cha) => {
      const chaData = await Characters.findById(cha);
      sexChaList.push(chaData);
    });
    setTimeout(() => {
      const data = {
        type: weaponData.type,
        cha_list: sexChaList,
        _id: weaponData._id,
        __v: weaponData.__v,
      };
      return res.status(200).send({
        message: "get data by weapon",
        status: "success",
        code: 200,
        data: data,
      });
    }, 300);
  }
  if (
    nation === undefined &&
    weapon === undefined &&
    sex === undefined &&
    vision !== undefined
  ) {
    let sexChaList = [];
    visionData.cha_list.map(async (cha) => {
      const chaData = await Characters.findById(cha);
      sexChaList.push(chaData);
    });
    setTimeout(() => {
      const data = {
        type: weaponData.type,
        cha_list: sexChaList,
        _id: weaponData._id,
        __v: weaponData.__v,
      };
      return res.status(200).send({
        message: "get data by weapon",
        status: "success",
        code: 200,
        data: data,
      });
    }, 300);
  }
  if (
    nation !== undefined &&
    weapon !== undefined &&
    sex === undefined &&
    vision === undefined
  ) {
    let finalData = [];
    nationData.cha_list.map((cha) => {
      const fiteredData = weaponData.cha_list.filter((weap) => cha !== weap);
      finalData = [...fiteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
  if (
    nation !== undefined &&
    weapon === undefined &&
    sex !== undefined &&
    vision === undefined
  ) {
    let finalData = [];
    nationData.cha_live_at.map((cha) => {
      const fiteredData = sexData.cha_list.filter((weap) => cha !== weap);
      finalData = [...filteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      return res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
  if (
    nation !== undefined &&
    weapon === undefined &&
    sex === undefined &&
    vision !== undefined
  ) {
    let finalData = [];
    nationData.cha_live_at.map((cha) => {
      const fiteredData = visionData.cha_list.filter((weap) => cha !== weap);
      finalData = [...fiteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      return res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
  if (
    nation === undefined &&
    weapon !== undefined &&
    sex !== undefined &&
    vision === undefined
  ) {
    let finalData = [];
    weaponData.cha_list.map((cha) => {
      const fiteredData = sexData.cha_list.filter((weap) => cha !== weap);
      finalData = [...fiteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
  if (
    nation === undefined &&
    weapon !== undefined &&
    sex === undefined &&
    vision !== undefined
  ) {
    let finalData = [];
    weaponData.cha_live_at.map((cha) => {
      const fiteredData = visionData.cha_list.filter((weap) => cha !== weap);
      finalData = [...filteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      return res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
  if (
    nation === undefined &&
    weapon === undefined &&
    sex !== undefined &&
    vision !== undefined
  ) {
    let finalData = [];
    sexData.cha_live_at.map((cha) => {
      const fiteredData = visionData.cha_list.filter((weap) => cha !== weap);
      finalData = [...fiteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      return res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
  if (
    nation !== undefined &&
    weapon !== undefined &&
    sex !== undefined &&
    vision === undefined
  ) {
    let finalNotSexData = [];
    nationData.cha_live_at.map((cha) => {
      const fiteredData = weaponData.cha_list.filter((weap) => cha !== weap);
      finalNotSexData = [...fiteredData];
    });
    finalNotSexData.map((cha) => {
      const fiteredData = sexData.cha_list.filter((weap) => cha !== weap);
      finalData = [...fiteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      return res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
  if (
    nation === undefined &&
    weapon !== undefined &&
    sex !== undefined &&
    vision !== undefined
  ) {
    let finalNotSexData = [];
    weaponData.cha_live_at.map((cha) => {
      const fiteredData = sexData.cha_list.filter((weap) => cha !== weap);
      finalNotSexData = [...fiteredData];
    });
    finalNotSexData.map((cha) => {
      const fiteredData = visionData.cha_list.filter((weap) => cha !== weap);
      finalData = [...fiteredData];
    });

    let mixChaList = [];
    setTimeout(() => {
      if (finalData.length !== 0) {
        finalData.map(async (cha) => {
          const chaData = await Characters.findById(cha);
          mixChaList.push(chaData);
        });
      } else {
        console.log("this is 0");
      }
    }, 300);
    setTimeout(() => {
      return res.status(200).send({
        message: "get data by sex, nation and weapon",
        status: "success",
        code: 200,
        data: mixChaList,
      });
    }, 1100);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Characters.findOne({ _id: new ObjectId(id) });
  if (data) {
    const nation = await Nation.findOne({ _id: new ObjectId(data.nation) });
    const weapon = await Weapon.findOne({ _id: new ObjectId(data.weapon) });
    const vision = await Element.findOne({ _id: new ObjectId(data.vision) });
    const sex = await Sex.findOne({ _id: new ObjectId(data.sex) });
    setTimeout(() => {
      const finalData = {
        _id: data._id,
        name: data.name,
        star_lv: data.star_lv,
        avatar: data.avatar,
        image: data.image,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        showcase: data.showcase,
        archon_detail: data.archon_detail,
        cha_detail: data.cha_detail,
        sex: sex,
        nation: nation,
        weapon: weapon,
        vision: vision,
      };
      res.status(200).send({
        message: `get character by id ${id} is success`,
        status: "success",
        code: 200,
        data: finalData,
      });
    }, 300);
  } else {
    res.status(404).send({
      status: "failed",
      message: `not found characters with that id ${id}`,
      code: 404,
    });
  }
});

router.post(
  "/",
  upload.fields([{ name: "image" }, { name: "avatar" }, { name: "showcase" }]),
  async (req, res) => {
    const elementId = req.body.vision;
    const nationId = req.body.nation;
    const sexId = req.body.sex;
    const weaponId = req.body.weapon;
    const elementData = await Element.findById(elementId);
    const reqData = await Nation.findById(nationId);
    const sexData = await Sex.findById(sexId);
    const weaponData = await Weapon.findById(weaponId);
    const postData = {
      name: req.body.name,
      vision: req.body.vision,
      weapon: req.body.weapon,
      sex: req.body.sex,
      nation: req.body.nation,
      star_lv: req.body.star_lv,
      archon_detail: req.body.archon_detail ? req.body.archon_detail : "",
      cha_detail: req.body.cha_detail,
    };
    const imageData = req.files.image[0];
    const avatarData = req.files.avatar[0];
    const showcaseData = req.files.showcase[0];
    const dateTime = giveCurrentDateTime();
    //image upload and download
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
    //avatar upload and download
    const avatarRef = ref(
      storage,
      `avatar/${avatarData.originalname + "" + dateTime}`
    );
    const avatarMetadata = {
      contentType: avatarData.mimetype,
    };
    const avatarSnapshot = await uploadBytesResumable(
      avatarRef,
      avatarData.buffer,
      avatarMetadata
    );
    const avatarDownlodaURL = await getDownloadURL(avatarSnapshot.ref);
    //showcase upload and download
    const showcaseRef = ref(
      storage,
      `showcase/${showcaseData.originalname + "" + dateTime}`
    );
    const showcaseMetaData = {
      contentType: showcaseData.mimetype,
    };
    const showcaseSnapshot = await uploadBytesResumable(
      showcaseRef,
      showcaseData.buffer,
      showcaseMetaData
    );
    const showcaseDownladURL = await getDownloadURL(showcaseSnapshot.ref);
    try {
      const data = await Characters.create({
        ...postData,
        image: imageDownlodaURL,
        avatar: avatarDownlodaURL,
        showcase: showcaseDownladURL,
      });
      let finalChaList = [...reqData.cha_live_at, data._id];
      let finalElementList = [...elementData.cha_list, data._id];
      let sexChaList = [...sexData.cha_list, data._id];
      let weaponChaList = [...weaponData.cha_list, data._id];
      const nationsDataUpdate = await Nation.updateOne(
        { _id: reqData._id },
        {
          cha_live_at: finalChaList,
        }
      );
      const elementDataupdate = await Element.updateOne(
        { _id: elementData._id },
        {
          cha_list: finalElementList,
        }
      );
      const sexChaUpdate = await Sex.updateOne(
        {
          _id: sexData._id,
        },
        {
          cha_list: sexChaList,
        }
      );
      const weaponChaUpdate = await Weapon.updateOne(
        {
          _id: weaponData._id,
        },
        {
          cha_list: weaponChaList,
        }
      );
      res.status(200).send({
        message: "character create successful",
        status: "success",
        data: data,
        code: 200,
      });
    } catch (error) {
      res.status(400).send({
        message: "character create failed",
        status: "failed",
        data: error,
        code: 400,
      });
    }
  }
);

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  var result = Characters.findOne({ _id: new ObjectId(id) });
  const name = body.name ? body.name : result?.name;
  const vision = body.vision ? body.vision : result?.vision;
  const sex = body.sex ? body.sex : result?.sex;
  const weapon = body.weapon ? body.weapon : result?.weapon;
  const star_lv = body.star_lv ? body.star_lv : result?.star_lv;
  const image = result?.image;
  const avatar = result?.avatar;
  if (!result) {
    res.status(404).send({
      message: "character not found",
      code: 404,
      status: "failed",
    });
  } else {
    const update = {
      name: name,
      vision: vision,
      sex: sex,
      weapon: weapon,
      star_lv: star_lv,
      image: image,
      avatar: avatar,
    };
    let result = await Characters.updateOne({ _id: new ObjectId(id) }, update);
    res.status(200).send({
      message: "successfully updated",
      status: "success",
      code: 200,
      data: update,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteData = await Characters.findOne({ _id: new ObjectId(id) });
  if (!deleteData) {
    res.status(404).send({
      message: "character not found",
      code: 404,
      status: "failed",
    });
  } else {
    let result = await Characters.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send({
      message: "successfully deleted",
      code: 200,
      status: "success",
      data: deleteData,
    });
  }
});

module.exports = router;
