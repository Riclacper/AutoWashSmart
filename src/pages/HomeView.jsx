import { BadgeCheck, Car, ChevronRight, Droplets, Sparkles, SprayCan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const homeTiles = [
  ['Como funciona', 'Identifique o veículo, escolha o serviço e acompanhe a lavagem em tempo real.'],
  ['Serviços', 'Express, Premium, SUV Care e self-service com consumo simulado.'],
  ['Planos', 'Assinaturas e lavagens avulsas prontas para demonstração comercial.'],
  ['Benefícios', 'Menos fila, cobrança automática e operação acompanhada por indicadores.'],
  ['Diferenciais', 'Totem, dashboard, mini shop e persistência local no navegador.'],
  ['Contato', 'Fluxo pronto para apresentação comercial sem depender de integrações externas.'],
];

const demoSteps = [
  ['1', 'Cadastrar cliente', 'Registre cliente, autorizados e veículo.'],
  ['2', 'Liberar no totem', 'Use AWS2026, QR Code ou facial.'],
  ['3', 'Executar lavagem', 'Escolha o serviço e acompanhe etapas.'],
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
            Um protótipo navegável para uma operação automatizada, com entrada digital,
            lavagem guiada, cobrança simulada, self-service e mini shop.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => navigate('/app/admin/totem')}>
              Simular entrada <ChevronRight size={18} />
            </button>
            <button className="secondary-action" onClick={() => navigate('/app/admin/clientes')}>
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
            <small>Serviço liberado</small>
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
          <span className="eyebrow">Roteiro de demonstração</span>
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
