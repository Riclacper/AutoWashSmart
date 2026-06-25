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

function formatChartValue(chart, value) {
  if (chart.key === 'revenue') return currency(value);
  const displayValue = Number.isInteger(value) ? value : value.toFixed(1);
  if (chart.key === 'washes') return `${displayValue} lavagem(ns)`;
  return `${displayValue} produto(s)`;
}

function buildChartAnalysis(chart) {
  const total = chart.points.reduce((sum, point) => sum + point.value, 0);
  const activePoints = chart.points.filter((point) => point.value > 0);
  const bestPoint = chart.points.reduce(
    (best, point) => (point.value > best.value ? point : best),
    chart.points[0],
  );
  const quietPoint = activePoints.reduce(
    (quiet, point) => (point.value < quiet.value ? point : quiet),
    activePoints[0] || chart.points[0],
  );

  return {
    total,
    average: total / chart.points.length,
    bestPoint,
    quietPoint,
  };
}

export function AdminView({ metrics, state, resetDemoData }) {
  const [selectedChartKey, setSelectedChartKey] = useState('revenue');
  const payments = state.payments || [];
  const operations = [...state.washes, ...state.selfServiceSessions, ...state.sales];
  const washCounts = countByDay(state.washes);
  const revenueTotals = countByDay(payments, (item) => item.price);
  const productCounts = countByDay(state.sales);
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
        prefix: 'R$',
        display: revenueTotals[index].toFixed(2),
        detail: `${currency(revenueTotals[index])} registrados em ${day}`,
      })),
    },
    {
      key: 'products',
      title: 'Produtos por dia',
      summary: `${metrics.products} vendidos`,
      description: 'Quantidade de produtos liberados pela mini shop autônoma.',
      points: weekDays.map((day, index) => ({
        label: day,
        value: productCounts[index],
        display: `${productCounts[index]} prod.`,
        detail: `${productCounts[index]} produto(s) vendido(s) em ${day}`,
      })),
    },
  ];
  const selectedChart = charts.find((chart) => chart.key === selectedChartKey) || charts[0];
  const selectedAnalysis = buildChartAnalysis(selectedChart);
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
        <div className="detail-metric-grid">
          <article>
            <span>Total no período</span>
            <strong>{formatChartValue(selectedChart, selectedAnalysis.total)}</strong>
          </article>
          <article>
            <span>Média diária</span>
            <strong>{formatChartValue(selectedChart, selectedAnalysis.average)}</strong>
          </article>
          <article>
            <span>Melhor dia</span>
            <strong>{selectedAnalysis.bestPoint.label}</strong>
            <small>{formatChartValue(selectedChart, selectedAnalysis.bestPoint.value)}</small>
          </article>
          <article>
            <span>Menor dia com movimento</span>
            <strong>{selectedAnalysis.quietPoint.label}</strong>
            <small>{formatChartValue(selectedChart, selectedAnalysis.quietPoint.value)}</small>
          </article>
        </div>
        <div className="chart-detail-list">
          {selectedChart.points.map((point) => (
            <p key={point.label}>
              <strong>{point.label}</strong>
              <span>{formatChartValue(selectedChart, point.value)}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="recent-list">
        <h3>Últimas atividades</h3>
        <div className="activity-feed">
          {activities.map((item) => {
            const isSelfService = item.type === 'self-service';
            const isWash = item.type === 'wash' || Boolean(item.service);
            return (
              <article className="activity-row" key={item.id}>
                <span
                  className={isWash || isSelfService ? 'activity-icon wash' : 'activity-icon sale'}
                >
                  {isSelfService ? (
                    <Gauge size={18} />
                  ) : isWash ? (
                    <Waves size={18} />
                  ) : (
                    <ShoppingBag size={18} />
                  )}
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
