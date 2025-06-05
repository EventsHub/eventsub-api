import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Servico } from './servico.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class ServicoCategoria {
  @PrimaryColumn()
  id_servico: number;

  @PrimaryColumn()
  id_categoria: number;

  @ManyToOne(() => Servico, (servico) => servico.categorias)
  servico: Servico;

  @ManyToOne(() => Categoria, (categoria) => categoria.servicos)
  categoria: Categoria;
}
