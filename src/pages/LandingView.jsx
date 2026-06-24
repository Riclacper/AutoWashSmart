import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Car,
  CheckCircle2,
  CreditCard,
  Gauge,
  ScanFace,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import landingHero from '../assets/landing-hero.jpg';

const modules = [
  ['Totem de entrada', 'Placa, QR Code e reconhecimento facial simulados.', ScanFace],
  ['Lavagem express', 'Etapas visuais, progresso e checkout automatizado.', Waves],
  ['Self-service', 'Controle de tempo, consumo e servicos liberados.', Gauge],
  ['Mini shop', 'Venda autonoma de produtos automotivos.', ShoppingBag],
  ['Clientes e frota', 'Cadastro de veiculos, autorizados e planos.', Users],
  ['Dashboard', 'Indicadores de operacao, receita e atividades.', BarChart3],
];

const benefits = [
  'Reduz fila e atendimento manual na entrada',
  'Padroniza a jornada do cliente e da operacao',
  'Demonstra cobranca automatica sem integracoes pagas',
  'Prepara evolucao para assinaturas, franquias e Supabase',
];

const demoFlow = [
  ['01', 'Cliente identificado', 'Use a placa AWS2026 ou simule QR/facial no totem.'],
  ['02', 'Servico liberado', 'Escolha Express, Premium ou SUV Care e acompanhe as etapas.'],
  ['03', 'Pagamento simulado', 'A lavagem concluida entra automaticamente no painel.'],
  ['04', 'Gestao operacional', 'Revise receita, vendas, clientes e atividades recentes.'],
];

export function LandingView() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <img src={landingHero} alt="AutoWash Smart em operacao automatizada" />
        <div className="landing-overlay" />
        <nav className="landing-nav" aria-label="AutoWash Smart">
          <div className="landing-brand">
            <span><Waves size={22} /></span>
            <strong>AutoWash Smart</strong>
          </div>
          <button onClick={() => navigate('/app')}>
            Entrar na plataforma <ArrowRight size={17} />
          </button>
        </nav>
        <div className="landing-content">
          <span className="eyebrow">MVP comercial para lava a jato inteligente</span>
          <h1>Automatize entrada, lavagem, cobranca e gestao em uma experiencia unica.</h1>
          <p>
            Prototipo navegavel para apresentar uma operacao moderna de lava a jato com totem,
            reconhecimento simulado, planos, self-service, mini shop e dashboard administrativo.
          </p>
          <div className="landing-actions">
            <button className="primary-action" onClick={() => navigate('/app')}>
              Acessar demonstracao <ArrowRight size={18} />
            </button>
            <button className="secondary-action" onClick={() => navigate('/app/admin/dashboard')}>
              Ver indicadores
            </button>
          </div>
          <div className="landing-proof">
            <span><ShieldCheck size={18} /> Sem hardware real</span>
            <span><CreditCard size={18} /> Pagamento simulado</span>
            <span><BadgeCheck size={18} /> Dados locais</span>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-intro">
          <span className="eyebrow">Para interessados</span>
          <h2>O que o sistema demonstra</h2>
          <p>
            Uma visao completa do produto antes de qualquer investimento em sensores,
            catracas, pagamentos ou integracoes externas.
          </p>
        </div>
        <div className="landing-module-grid">
          {modules.map(([title, text, Icon]) => (
            <article className="landing-card" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-band">
        <div>
          <span className="eyebrow">Valor para operacao</span>
          <h2>Mais controle sem aumentar complexidade.</h2>
        </div>
        <div className="benefit-list">
          {benefits.map((benefit) => (
            <span key={benefit}><CheckCircle2 size={18} /> {benefit}</span>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="section-intro">
          <span className="eyebrow">Roteiro sugerido</span>
          <h2>Como apresentar em poucos minutos</h2>
        </div>
        <div className="landing-flow">
          {demoFlow.map(([number, title, text]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <Car size={34} />
        <div>
          <h2>Pronto para explorar o MVP.</h2>
          <p>Entre na plataforma com dados demo e percorra o fluxo completo.</p>
        </div>
        <button className="primary-action" onClick={() => navigate('/app/admin/totem')}>
          Comecar pelo totem <Sparkles size={18} />
        </button>
      </section>
    </main>
  );
}
