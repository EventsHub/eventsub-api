import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany,ManyToMany } from 'typeorm';
import { Fornecedor } from './fornecedor.entity'; // Relacionamento com Fornecedor
import { Categoria } from './categoria.entity';
import { Avaliacao } from './avaliacao.entity';
import { ItemPedido } from './itemPedido.entity';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id_servico: number;

  @Column()
  nome: string;

  @Column({ default: true })
  disponibilidade: boolean;

  @Column('decimal')
  preco: number;

  @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.servicos)
  fornecedor: Fornecedor; // Relacionamento com a entidade Fornecedor

   @ManyToMany(() => Categoria, (categoria) => categoria.servicos)
  categorias: Categoria[];

  @OneToMany (() => Avaliacao,(avaliacao) =>avaliacao.servico)
  avaliacoes: Avaliacao[];

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.servico)
  itensPedido: ItemPedido[];  // a propriedade que falta
}

