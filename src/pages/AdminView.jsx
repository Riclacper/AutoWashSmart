import { useState } from 'react';
import { Car, CreditCard, ShoppingBag, Users, Waves } from 'lucide-react';
import { SimChart } from '../components/SimChart.jsx';

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

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
  return Object.entries(totals)
    .sort(([, totalA], [, totalB]) => totalB - totalA)
    .slice(0, 5);
}

function currency(value) {
  return `R$ ${value.toFixed(2)}`;
}

export function AdminView({ metrics, state, resetDemoData }) {
  const [selectedChartKey, setSelectedChartKey] = useState('revenue');
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
  const washCounts = countByDay(state.washes);
  const revenueTotals = countByDay([...state.washes, ...state.sales], (item) => item.price);
  const productTotals = countProducts(state.sales);
  const washesByDay = weekDays.map((day, index) => ({
    label: day,
    value: washCounts[index],
    display: `${washCounts[index]} lav.`,
    detail: `${washCounts[index]} lavagem(ns) registradas em ${day}`,
  }));
  const revenueByDay = weekDays.map((day, index) => ({
    label: day,
    value: revenueTotals[index],
    display: currency(revenueTotals[index]),
    detail: `${currency(revenueTotals[index])} em lavagens e produtos em ${day}`,
  }));
  const productsSold = productTotals.length
    ? productTotals.map(([name, total]) => ({
        label: name,
        value: total,
        display: `${total} un.`,
        detail: `${total} unidade(s) vendidas de ${name}`,
      }))
    : [{ label: 'Sem vendas', value: 0, display: '0 un.', detail: 'Nenhum produto vendido ainda' }];
  const charts = [
    {
      key: 'washes',
      title: 'Lavagens por dia',
      points: washesByDay,
      summary: `${metrics.washes} lavagens`,
      description: 'Volume de atendimentos registrados por dia da semana.',
    },
    {
      key: 'revenue',
      title: 'Receita por dia',
      points: revenueByDay,
      summary: currency(metrics.revenue),
      description: 'Receita somada de lavagens e produtos vendidos por dia.',
    },
    {
      key: 'products',
      title: 'Produtos vendidos',
      points: productsSold,
      summary: `${metrics.products} itens`,
      description: 'Ranking dos produtos vendidos no mini shop.',
    },
  ];
  const selectedChart = charts.find((chart) => chart.key === selectedChartKey) || charts[0];

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
        {charts.map((chart) => (
          <SimChart
            key={chart.key}
            title={chart.title}
            points={chart.points}
            summary={chart.summary}
            selected={selectedChart.key === chart.key}
            onSelect={() => setSelectedChartKey(chart.key)}
          />
        ))}
      </div>
      <div className="expanded-chart-panel">
        <div className="expanded-chart-copy">
          <span className="eyebrow">Detalhamento</span>
          <h3>{selectedChart.title}</h3>
          <p>{selectedChart.description}</p>
        </div>
        <SimChart
          title={selectedChart.title}
          points={selectedChart.points}
          summary={selectedChart.summary}
          expanded
        />
        <div className="chart-detail-list">
          {selectedChart.points.map((point) => (
            <p key={point.label}>
              <strong>{point.label}</strong>
              <span>{point.detail}</span>
            </p>
          ))}
        </div>
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
