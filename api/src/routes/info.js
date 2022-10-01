//const fetch = require("node-fetch");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { YOUR_API_KEY } = process.env;

/* const getApiInfo = async () => {
  const apiURL = await fetch(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  ).then((response) => response.json());
  return apiURL;
}; */

/* const getApiInfo = async () => {
  const apiUrl = await axios(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      name: el.name,
      height: { metric: height },
      weight: { metric: weight },
      life_span: life_span,
      image: image,
      createdinDb: true,
    };
  });
  return apiInfo;
}; */

const getApiInfo = async () => {
  const apiUrl = await axios(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );
  return apiUrl;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

/* const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
}; */

const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  apiInfo.map((el) => {
    el.createdinDb = false;
  });
  // Igualamos lo que viene de la API para que sea igual a la BD
  apiInfo.map((el) => {
    if (el.hasOwnProperty("temperament")) {
      let element = el.temperament;
      let temperament = element.split(",");
      let tempMap = temperament.map((el) => {
        // se hace un map porque lo que se devuelven son varios temperamentos
        return { name: el };
      });
      el.temperament = tempMap;
    }
  });
  let dbInfo = await getDbInfo();
  let totalInfo = await apiInfo.concat(dbInfo);
  return totalInfo;
};

const totalInfo = async () => {
  let allInfo = await getAllInfo();
  allInfo.forEach((el) => {
    if (el.name == "Standard Schnauzer") {
      el.weight.metric = "22-30";
    }
    if (!el.weight.metric.includes("-")) {
      el.weight.metric = `4 - ${el.weight.metric}`;
    }
    /* 
    if (el.name == "Olde English Bulldogge") {
      el.weight.metric = "22-30";
    }
    if (!el.weight.metric.includes("-")) {
      el.weight.metric = `4 - ${el.weight.metric}`;
    } */
    allInfo.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  });
  return allInfo;
};

// Temperaments/get
const getTemp = async () => {
  let getApiInfo2 = await getApiInfo();
  let temperamentApi = getApiInfo2
    .map((el) => el.temperament)
    .sort()
    .join();
  let temperamentArray = temperamentApi
    .split(",", temperamentApi.length)
    .sort();
  let setArray = new Set(temperamentArray);
  let filterTemperament = Array.from(setArray); // Ya es un array y puede ser pasado a string
  filterTemperament.shift();
  filterTemperament = filterTemperament.map((el) => ({
    name: el,
  }));
  await Temperament.bulkCreate(filterTemperament);
  return filterTemperament;
};

// Temperaments/post
const post = async (name, weight, height, life_span, temperament, image) => {
  let newDog = await Dog.create({
    name: name,
    height: { metric: height },
    weight: { metric: weight },
    life_span: life_span,
    image: image,
    createdinDb: true,
  });
  let TemperamentDb = await Temperament.findAll({
    where: { name: temperament },
  });

  return await newDog.addTemperament(TemperamentDb);
};

module.exports = { getApiInfo, getAllInfo, totalInfo, getTemp, post };
