import { useState } from 'react';
import { Car, CreditCard, Gauge, ShoppingBag, Users, Waves } from 'lucide-react';
import { SimChart } from '../components/SimChart.jsx';

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

function countByDay(items, valueSelector = () => 1) {
  return weekDays.map((day) =>
    items
      .filter((item) => item.day === day)
      .reduce((total, item) => total + valueSelector(item), 0),
  );
}

function currency(value) {
  return `R$ ${value.toFixed(2)}`;
}

export function AdminView({ metrics, state, resetDemoData }) {
  const [selectedChartKey, setSelectedChartKey] = useState('revenue');
  const operations = [...state.washes, ...state.selfServiceSessions, ...state.sales];
  const washCounts = countByDay(state.washes);
  const revenueTotals = countByDay(operations, (item) => item.price);
  const cards = [
    ['Clientes cadastrados', metrics.customers, Users],
    ['Veículos cadastrados', metrics.vehicles, Car],
    ['Lavagens realizadas', metrics.washes, Waves],
    ['Usos self-service', metrics.selfService, Gauge],
    ['Receita simulada', currency(metrics.revenue), CreditCard],
    ['Produtos vendidos', metrics.products, ShoppingBag],
  ];
  const charts = [
    {
      key: 'washes',
      title: 'Lavagens por dia',
      summary: `${metrics.washes} lavagens`,
      description: 'Volume de lavagens registradas por dia da semana.',
      points: weekDays.map((day, index) => ({
        label: day,
        value: washCounts[index],
        display: `${washCounts[index]} lav.`,
        detail: `${washCounts[index]} lavagem(ns) registradas em ${day}`,
      })),
    },
    {
      key: 'revenue',
      title: 'Receita por dia',
      summary: currency(metrics.revenue),
      description: 'Receita de lavagens, self-service e produtos vendidos.',
      points: weekDays.map((day, index) => ({
        label: day,
        value: revenueTotals[index],
        display: currency(revenueTotals[index]),
        detail: `${currency(revenueTotals[index])} registrados em ${day}`,
      })),
    },
  ];
  const selectedChart = charts.find((chart) => chart.key === selectedChartKey) || charts[0];
  const activities = [...operations]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 8);

  return (
    <section className="screen">
      <div className="screen-heading">
        <span className="eyebrow">Dashboard administrativo</span>
        <h2>Indicadores da operação</h2>
        <button className="text-action compact-action" onClick={resetDemoData}>
          Restaurar dados demo
        </button>
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
      </div>

      <div className="recent-list">
        <h3>Últimas atividades</h3>
        <div className="activity-feed">
          {activities.map((item) => {
            const isSelfService = item.type === 'self-service';
            const isWash = item.type === 'wash' || Boolean(item.service);
            return (
              <article className="activity-row" key={item.id}>
                <span className={isWash || isSelfService ? 'activity-icon wash' : 'activity-icon sale'}>
                  {isSelfService ? <Gauge size={18} /> : isWash ? <Waves size={18} /> : <ShoppingBag size={18} />}
                </span>
                <div className="activity-main">
                  <strong>
                    {isSelfService ? `Self-service ${item.minutes} min` : item.service || item.name}
                  </strong>
                  <small>
                    {isSelfService
                      ? `${item.vehiclePlate} — ${item.status}`
                      : isWash
                        ? `${item.vehiclePlate || 'Veículo'} — ${item.entry || ''}`
                        : `Produto liberado — ${item.time || ''}`}
                  </small>
                </div>
                <span className="activity-kind">
                  {isSelfService ? 'Self-service' : isWash ? 'Lavagem' : 'Shop'}
                </span>
                <span className="activity-meta">{item.day || 'Hoje'}</span>
                <strong className="activity-price">R$ {item.price.toFixed(2)}</strong>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
