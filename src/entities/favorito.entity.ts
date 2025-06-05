import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Produto } from './produto.entity';

@Entity()
@Unique(['usuario', 'produto']) // Impede duplicação
export class Favorito {
  @PrimaryGeneratedColumn()
  id_favorito: number;

  @ManyToOne(() => Usuario, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Produto, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;
}
