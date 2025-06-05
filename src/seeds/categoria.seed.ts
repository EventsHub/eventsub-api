import { AppDataSource } from '../config/data-source';
import { Categoria } from '../entities/categoria.entity';

export const seedCategorias = async () => {
  const nomes = [
    'Infantil',
    'Casamento',
    'Serviços',
    'Buffet',
    'Vestiário',
    'Utensílios',
    'Equipamentos'
  ];

  const categoriaRepo = AppDataSource.getRepository(Categoria);

  for (const nome of nomes) {
    const existe = await categoriaRepo.findOne({ where: { nome_categoria: nome } });
    if (!existe) {
      const novaCategoria = categoriaRepo.create({ nome_categoria: nome });
      await categoriaRepo.save(novaCategoria);
      console.log(`Categoria '${nome}' criada.`);
    }
  }
};
