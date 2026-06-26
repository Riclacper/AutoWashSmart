import { BarChart3, Car, ShieldCheck, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoFull from '../assets/logo-full.svg';

export function AccessView() {
  const navigate = useNavigate();

  return (
    <main className="access-page">
      <section className="access-panel">
        <div className="access-logo">
          <img src={logoFull} alt="AutoWash Smart" />
        </div>
        <div className="screen-heading centered">
          <span className="eyebrow">Acesso demonstrativo</span>
          <h1>Escolha como deseja entrar</h1>
          <p>Use perfis simulados para visualizar a experiência do cliente e do administrador.</p>
        </div>
        <div className="access-grid">
          <button className="access-card" onClick={() => navigate('/app/cliente/portal')}>
            <span>
              <UserRound size={28} />
            </span>
            <h2>Cliente</h2>
            <p>Área com veículos, plano, QR Code, histórico, compras e recibos simulados.</p>
            <strong>Entrar como cliente</strong>
          </button>
          <button className="access-card admin-access" onClick={() => navigate('/app/admin')}>
            <span>
              <ShieldCheck size={28} />
            </span>
            <h2>Administrador</h2>
            <p>Operação completa com cadastros, totem, lavagem, loja, self-service e dashboard.</p>
            <strong>Entrar como admin</strong>
          </button>
        </div>
        <div className="access-summary">
          <span>
            <Car size={18} /> Placa demo: AWS2026
          </span>
          <span>
            <BarChart3 size={18} /> Dados demo restauráveis no painel admin
          </span>
        </div>
      </section>
    </main>
  );
}
