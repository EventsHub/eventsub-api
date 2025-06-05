import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Produto } from './produto.entity'; // Relacionamento com Produto
import { Servico } from './servico.entity'; // Relacionamento com Servico

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ unique: true })
  nome_categoria: string;

  @ManyToMany(() => Produto, (produto) => produto.categorias)
  produtos: Produto[]; // Relacionamento com a entidade Produto

  @ManyToMany(() => Servico, (servico) => servico.categorias)
  servicos: Servico[]; // Relacionamento com a entidade Servico
}
