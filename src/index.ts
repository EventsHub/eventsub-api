import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";
import router from "./routes";
import { seedCategorias } from './seeds/categoria.seed';

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3001;

// ✅ Tudo dentro de uma função async
async function startServer() {
  try {
    await AppDataSource.initialize();
    await seedCategorias(); // Agora o await funciona normalmente

    console.log("Banco de dados conectado com sucesso!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar no banco de dados:", err);
  }
}

startServer(); // 🚀 Executa a função
