import { CheckCircle2, PackageCheck } from 'lucide-react';
import { useState } from 'react';
import { PaymentSummary } from '../components/PaymentSummary.jsx';
import { products } from '../data/catalog.js';

export function ShopView({ buyProduct, latestPayment, customer = null, identified = null }) {
  const [feedback, setFeedback] = useState(null);
  const activeCustomer = customer || identified?.customer || null;

  function handleBuy(product) {
    const result = buyProduct(product, activeCustomer);
    setFeedback({ type: result.ok ? 'success' : 'error', message: result.message });
  }

  return (
    <section className="screen">
      <div className="screen-heading">
        <span className="eyebrow">Mini shop inteligente</span>
        <h2>Produtos automotivos</h2>
        <p>
          {activeCustomer
            ? `Compra vinculada a ${activeCustomer.name}.`
            : 'Identifique um cliente no totem para vincular a compra.'}
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.imageAlt} />
              ) : (
                <PackageCheck size={42} />
              )}
            </div>
            <h3>{product.name}</h3>
            <strong>R$ {product.price.toFixed(2)}</strong>
            <button onClick={() => handleBuy(product)}>Pagar</button>
          </article>
        ))}
      </div>
      {feedback && (
        <div className={feedback.type === 'success' ? 'release-banner' : 'approval-panel'}>
          <CheckCircle2 size={22} />
          {feedback.message}
        </div>
      )}
      <PaymentSummary payment={latestPayment} title="Compra aprovada" />
    </section>
  );
}
