import "reflect-metadata";
import * as dotenv from 'dotenv';
import server from "./http";
import ping from "./utils/ping.util";
import { seedCategorias } from "./seeds/categoria.seed";
import { AppDataSource } from "./config/data-source";

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);

// ✅ Tudo dentro de uma função async
async function startServer() {
  try {
    await AppDataSource.initialize();
    await ping();
    await seedCategorias(); // Agora o await funciona normalmente

    console.log("Banco de dados conectado com sucesso!");
    server.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) });
  } catch (err) {
    console.error("Erro ao conectar no banco de dados:", err);
  }
}

startServer(); // 🚀 Executa a função
