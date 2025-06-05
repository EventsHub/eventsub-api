// Fornecedor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Produto } from './produto.entity';
import { Servico } from './servico.entity';

@Entity()
export class Fornecedor {
  @PrimaryGeneratedColumn()
  id_fornecedor: number;

  @Column({ unique: true })
  cnpj: string;

  @Column({ unique: true })
  cpf: string;

  // ✅ RELAÇÃO ÚNICA (sem duplicação)
  @OneToOne(() => Usuario, (usuario) => usuario.fornecedor) // Relação inversa
  @JoinColumn({ name: 'id_usuario' }) // Nome da coluna no BD
  usuario: Usuario;

  // Outras relações (produtos, serviços)
  @OneToMany(() => Produto, (produto) => produto.fornecedor)
  produtos: Produto[];

  @OneToMany(() => Servico, (servico) => servico.fornecedor)
  servicos: Servico[];
}