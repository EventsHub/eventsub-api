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
  synchronize: true,                // Sincronizar o banco de dados (ideal para desenvolvimento)
  logging: false,                   // Desativar logs no console
  entities: [
    // Aqui você vai importar e adicionar todas as suas entidades (models)
    require("../entities/usuario.entity").Usuario,
    require("../entities/fornecedor.entity").Fornecedor,
    require("../entities/produto.entity").Produto,
    require("../entities/servico.entity").Servico,
    require("../entities/categoria.entity").Categoria,
    require("../entities/servicoCategoria.entity").ServicoCategoria,
    require("../entities/produtoCategoria.entity").ProdutoCategoria,
    require("../entities/pedido.entity").Pedido,
    require("../entities/itemPedido.entity").ItemPedido,
    require("../entities/pagamento.entity").Pagamento,
    require("../entities/avaliacao.entity").Avaliacao,
    require("../entities/favorito.entity").Favorito
  ],
  migrations: [],  // Migrations, caso você precise
  subscribers: [],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },  // Subscribers, caso precise
});
