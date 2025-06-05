import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity'; // Relacionamento com Usuario
import { Produto } from './produto.entity'; // Relacionamento com Produto
import { Servico } from './servico.entity'; // Relacionamento com Servico

@Entity()
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id_avaliacao: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.avaliacoes)
  cliente: Usuario;

  @ManyToOne(() => Produto, (produto) => produto.avaliacoes, { nullable: true })
  produto: Produto;

  @ManyToOne(() => Servico, (servico) => servico.avaliacoes, { nullable: true })
  servico: Servico;

  @Column()
  nota: number;

  @Column('text', { nullable: true })
  comentario: string;

  @Column({ type: 'timestamp'})
  data_avaliacao: Date;
}
