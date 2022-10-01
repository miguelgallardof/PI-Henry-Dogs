const { Router, response } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog, Temperament } = require("../db");
const { totalInfo, getTemp, post } = require("../routes/info.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* router.get("/dogs", (req, res) => {
  let promise = new Promise((resolve, reject) => {
    totalInfo().then((data) => resolve(data));
  });
  if (req.query.name) {
    const { name } = req.query;
    promise
      .then((data) =>
        data.find((el) => el.name.toLowerCase() == name.toLowerCase())
      )
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => console.log(err));
  } else {
    promise.then((data) => {
      return res.json(data);
    });
  }
}); */

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  let dogsTotal = await totalInfo();
  if (name) {
    let dogName = await dogsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("No se encuentra el perro");
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get("/dogs/:name", async (req, res) => {
  const { name } = req.params;
  let allInfo = await totalInfo();
  let dogParams = allInfo.find(
    (e) => e.name.toLowerCase() == name.toLowerCase()
  );
  dogParams
    ? res.status(200).send(dogParams)
    : res.status(404).send("El perro no está dentro del parámetro");
});
router.get("/temperament", async (req, res) => {
  let getDbInfo = await Temperament.findAll();
  if (getDbInfo.length > 0) {
    res.json(getDbInfo);
  } else {
    let filterTemps = await getTemp();
    filterTemps
      ? res.status(200).json(filterTemps)
      : res
          .status(404)
          .json({ error: "No se ha obtenido información del temperamento" });
  }
});
router.post("/dog", async (req, res) => {
  const { name, weight, height, life_span, temperament } = req.body;
  let image = req.body.image;

  await post(name, weight, height, life_span, temperament, image);

  return res
    .status(200)
    .json({ msg: "Se ha registrado correctamente la raza del perro" });
});

module.exports = router;
