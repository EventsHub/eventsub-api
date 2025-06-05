import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Avaliacao } from './avaliacao.entity';
import { Produto } from './produto.entity';
import { Fornecedor } from './fornecedor.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  endereco: string;

  @Column({ default: 'cliente' })
  tipo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_registro: Date;

  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.cliente)
  avaliacoes: Avaliacao[];

  @ManyToMany(() => Produto, { eager: true })
  @JoinTable({
    name: 'favoritos',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id_usuario' },
    inverseJoinColumn: { name: 'produto_id', referencedColumnName: 'id_produto' },
  })
  favoritos: Produto[];

   @OneToOne(() => Fornecedor, (fornecedor) => fornecedor.usuario)
  fornecedor: Fornecedor;

  @OneToMany(() => Produto, (produto) => produto.usuario)
  produto: [];
}
