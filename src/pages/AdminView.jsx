import { Car, CreditCard, ShoppingBag, Users, Waves } from 'lucide-react';
import { SimChart } from '../components/SimChart.jsx';

export function AdminView({ metrics, state }) {
  const cards = [
    ['Clientes cadastrados', metrics.customers, Users],
    ['Veiculos cadastrados', metrics.vehicles, Car],
    ['Lavagens realizadas', metrics.washes, Waves],
    ['Receita simulada', `R$ ${metrics.revenue.toFixed(2)}`, CreditCard],
    ['Produtos vendidos', metrics.products, ShoppingBag],
  ];

  return (
    <section className="screen">
      <div className="screen-heading">
        <span className="eyebrow">Dashboard administrativo</span>
        <h2>Indicadores da operacao</h2>
      </div>
      <div className="metric-grid">
        {cards.map(([label, value, Icon]) => (
          <article className="metric-card" key={label}>
            <Icon size={24} />
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <div className="chart-grid">
        <SimChart title="Lavagens por dia" values={[35, 55, 42, 72, 64, 88, 76]} />
        <SimChart title="Receita mensal" values={[28, 44, 50, 68, 80, 74, 92]} />
        <SimChart title="Produtos mais vendidos" values={[64, 45, 72, 38, 58, 49]} />
      </div>
      <div className="recent-list">
        <h3>Ultimas atividades</h3>
        {[...state.washes, ...state.sales].slice(0, 5).map((item) => (
          <p key={item.id}>{item.service || item.name} - R$ {item.price.toFixed(2)}</p>
        ))}
      </div>
    </section>
  );
}
