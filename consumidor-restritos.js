const { db } = require("./db");

const consumidorRestrito = async (timeout = 0) => {
  const queue = "eventos-restritos";
  
  await db.pSubscribe(queue, (message) => {
    console.log(message);
  });
};

consumidorRestrito();