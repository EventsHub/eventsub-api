import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Produto } from './produto.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class ProdutoCategoria {
  @PrimaryColumn()
  id_produto: number;

  @PrimaryColumn()
  id_categoria: number;

  @ManyToOne(() => Produto, (produto) => produto.categorias)
  produto: Produto;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  categoria: Categoria;
}
