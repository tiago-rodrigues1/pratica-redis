const { db } = require("./db");

const consumidorGeral = async (timeout = 0) => {
  const queue = "eventos*";
  
  await db.pSubscribe(queue, (message) => {
    console.log(message);
  });
};


consumidorGeral();