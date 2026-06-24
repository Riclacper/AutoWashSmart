import { BadgeCheck, Car, ChevronRight, Droplets, Sparkles, SprayCan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const homeTiles = [
  ['Como funciona', 'Identifique o veiculo, escolha o servico e acompanhe a lavagem em tempo real.'],
  ['Servicos', 'Express, Premium, SUV Care e self-service com consumo simulado.'],
  ['Planos', 'Assinaturas e lavagens avulsas prontas para demonstracao comercial.'],
  ['Beneficios', 'Menos fila, cobranca automatica e operacao acompanhada por indicadores.'],
  ['Diferenciais', 'Totem, dashboard, mini shop e persistencia local no navegador.'],
  ['Contato', 'Fluxo pronto para apresentacao comercial sem depender de integracoes externas.'],
];

const demoSteps = [
  ['1', 'Cadastrar cliente', 'Registre cliente, autorizados e veiculo.'],
  ['2', 'Liberar no totem', 'Use AWS2026, QR Code ou facial.'],
  ['3', 'Executar lavagem', 'Escolha o servico e acompanhe etapas.'],
  ['4', 'Conferir painel', 'Veja receita, vendas e atividades.'],
];

export function HomeView() {
  const navigate = useNavigate();

  return (
    <section className="screen home-screen">
      <div className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Lava a jato inteligente</span>
          <h1>AutoWash Smart</h1>
          <p>
            Um prototipo navegavel para uma operacao automatizada, com entrada digital,
            lavagem guiada, cobranca simulada, self-service e mini shop.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => navigate('/app/totem')}>
              Simular entrada <ChevronRight size={18} />
            </button>
            <button className="secondary-action" onClick={() => navigate('/app/cliente')}>
              Cadastrar cliente
            </button>
          </div>
        </div>
        <div className="hero-panel" aria-label="Fluxo AutoWash Smart">
          <div className="lane">
            <Car size={54} />
            <span>Entrada</span>
          </div>
          <div className="wash-gate">
            <Droplets size={32} />
            <Sparkles size={30} />
            <SprayCan size={32} />
          </div>
          <div className="status-board">
            <BadgeCheck size={22} />
            <strong>Plano ativo</strong>
            <small>Servico liberado</small>
          </div>
        </div>
      </div>
      <div className="section-grid">
        {homeTiles.map(([title, text]) => (
          <article className="info-tile" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="demo-flow">
        <div className="screen-heading">
          <span className="eyebrow">Roteiro de demonstracao</span>
          <h2>Fluxo pronto para apresentar</h2>
        </div>
        <div className="demo-step-grid">
          {demoSteps.map(([number, title, text]) => (
            <article className="demo-step" key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
