import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity'; // Relacionamento com Pedido

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id_pagamento: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.pagamento)
  pedido: Pedido;

  @Column('decimal')
  valor_pago: number;

  @Column({ type: 'enum', enum: ['pendente', 'aprovado', 'recusado'], default: 'pendente' })
  status_pagamento: 'pendente' | 'aprovado' | 'recusado';

  @Column({ type: 'timestamp'})
  data_pagamento: Date;

  @Column({ type: 'enum', enum: ['cartao_credito', 'boleto', 'pix', 'dinheiro'] })
  forma_pagamento: 'cartao_credito' | 'boleto' | 'pix' | 'dinheiro';
}
