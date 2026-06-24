import { CheckCircle2, PackageCheck } from 'lucide-react';
import { products } from '../data/catalog.js';

export function ShopView({ buyProduct, latestSale }) {
  return (
    <section className="screen">
      <div className="screen-heading">
        <span className="eyebrow">Mini shop inteligente</span>
        <h2>Produtos automotivos</h2>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <PackageCheck size={32} />
            <h3>{product.name}</h3>
            <strong>R$ {product.price.toFixed(2)}</strong>
            <button onClick={() => buyProduct(product)}>Pagar</button>
          </article>
        ))}
      </div>
      {latestSale && (
        <div className="release-banner">
          <CheckCircle2 size={22} />
          Produto liberado: {latestSale.name}
        </div>
      )}
    </section>
  );
}
