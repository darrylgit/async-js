const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject("Could not find file 😢");
      }
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject("Could not write file 😢");
      }
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise("dog-img.txt", res.body.message);
    console.log("Dog image URL written!");
  } catch (err) {
    console.log(err);

    throw err;
  }

  return "2: Ready! 🐕";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    console.log(await getDogPic());
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR! 💥");
  }
})();

/*
console.log("1: Will get dog pics!");
getDogPic()
  .then(x => {
    console.log(x);
    console.log("3: Done getting dog pics!");
  })
  .catch(err => {
    console.log("ERROR! 💥");
  });
  */

/*
readFilePromise(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);

    return writeFilePromise("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Dog image URL written!");
  })
  .catch(err => {
    return console.log(err.message);
  });
  */
