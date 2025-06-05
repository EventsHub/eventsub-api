import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Fornecedor } from './fornecedor.entity';
import { Avaliacao } from './avaliacao.entity';
import { Categoria } from './categoria.entity';
import { ItemPedido } from './itemPedido.entity';
import { Usuario } from './usuario.entity';
import { boolean } from 'zod';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id_produto: number;

  @Column()
  nome: string;

  @Column('decimal')
  preco: number;

  @Column("text", { array: true, default: '{}' })
  imagens: string[];

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @ManyToOne(() => Fornecedor, { nullable: true })
  @JoinColumn({ name: 'id_fornecedor' })
  fornecedor?: Fornecedor;

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.produto)
  avaliacoes: Avaliacao[];

  @ManyToMany(() => Categoria, (categoria) => categoria.produtos)
  @JoinTable({
    name: "categoria_tem_produto",
    joinColumn: { name: "produto_id", referencedColumnName: "id_produto" },
    inverseJoinColumn: { name: "categoria_id", referencedColumnName: "id_categoria" }
  }
  )
  categorias: Categoria[];

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.produto)
  itensPedido: ItemPedido[];

  @Column({
    type: 'enum',
    enum: ['produto', 'servico_fixo', 'servico_por_hora'],
    default: 'produto',
  })
  tipo_pedido: 'produto' | 'servico_fixo' | 'servico_por_hora';

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column("bool", {default:false} )
  isFavorite: boolean
}

