const { db } = require("./db");

const eventos = {
    restritos: [
        "InfoDay",
        "Evento VIP",
        "Interlagos VIP",
        "Show VIP"
    ],
    gerais: [
        "Reunião geral",
        "Confra da empresa",
        "Festa",
        "Corrida"
    ]
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const inserir = async (queue, message) => {
    await db.publish(queue, `${message}`);
};

const inserirRestritos = async() => {
    for (;;) {
        const i = Math.floor(Math.random() * 3);
        const evento = eventos.restritos[i];

        await inserir(queue, evento);
        await sleep(300);
    }
};

const inserirGerais = async() => {
    const queue = "eventos-gerais";

    for (;;) {
        const i = Math.floor(Math.random() * 3);
        const evento = eventos.gerais[i];

        await inserir(queue, evento);
        await sleep(300);
    }
};

const produtor = async () => {
    await inserirRestritos();
    await inserirGerais();
};

produtor();