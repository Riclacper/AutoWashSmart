import { Car, CreditCard, ShoppingBag, Users, Waves } from 'lucide-react';
import { SimChart } from '../components/SimChart.jsx';

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

function normalizeChart(values) {
  const max = Math.max(...values, 1);
  return values.map((value) => Math.max(8, Math.round((value / max) * 100)));
}

function countByDay(items, valueSelector = () => 1) {
  return weekDays.map((day) =>
    items
      .filter((item) => item.day === day)
      .reduce((total, item) => total + valueSelector(item), 0)
  );
}

function countProducts(sales) {
  const totals = sales.reduce((acc, sale) => {
    acc[sale.name] = (acc[sale.name] || 0) + 1;
    return acc;
  }, {});
  return Object.values(totals).length ? Object.values(totals) : [0];
}

export function AdminView({ metrics, state, resetDemoData }) {
  const cards = [
    ['Clientes cadastrados', metrics.customers, Users],
    ['Veiculos cadastrados', metrics.vehicles, Car],
    ['Lavagens realizadas', metrics.washes, Waves],
    ['Receita simulada', `R$ ${metrics.revenue.toFixed(2)}`, CreditCard],
    ['Produtos vendidos', metrics.products, ShoppingBag],
  ];
  const activities = [...state.washes, ...state.sales]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 6);
  const washesByDay = normalizeChart(countByDay(state.washes));
  const revenueByDay = normalizeChart(countByDay([...state.washes, ...state.sales], (item) => item.price));
  const productsSold = normalizeChart(countProducts(state.sales));

  return (
    <section className="screen">
      <div className="screen-heading">
        <span className="eyebrow">Dashboard administrativo</span>
        <h2>Indicadores da operacao</h2>
        <button className="text-action compact-action" onClick={resetDemoData}>Restaurar dados demo</button>
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
        <SimChart title="Lavagens por dia" values={washesByDay} />
        <SimChart title="Receita por dia" values={revenueByDay} />
        <SimChart title="Produtos vendidos" values={productsSold} />
      </div>
      <div className="recent-list">
        <h3>Ultimas atividades</h3>
        {activities.length ? (
          activities.map((item) => (
            <p key={item.id}>
              <strong>{item.service || item.name}</strong>
              <span>{item.day || 'Hoje'} - R$ {item.price.toFixed(2)}</span>
            </p>
          ))
        ) : (
          <p>Nenhuma atividade registrada ainda.</p>
        )}
      </div>
    </section>
  );
}
