import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do TypeORM com PostgreSQL
export const AppDataSource = new DataSource({
  type: "postgres",                 // Tipo do banco de dados
  host: process.env.DB_HOST,        // Endereço do banco de dados
  port: parseInt(process.env.DB_PORT || "5432"), // Porta do banco de dados
  username: process.env.DB_USERNAME, // Usuário do banco de dados
  password: process.env.DB_PASSWORD, // Senha do banco de dados
  database: process.env.DB_NAME,    // Nome do banco de dados
  url: process.env.DB_URL,
  synchronize: true,                // Sincronizar o banco de dados (ideal para desenvolvimento)
  logging: false,                   // Desativar logs no console
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  migrations: [],  // Migrations, caso você precise
  subscribers: [],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },  // Subscribers, caso precise
});
