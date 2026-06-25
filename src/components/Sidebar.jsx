import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  ClipboardList,
  Droplets,
  Gauge,
  Home,
  ScanFace,
  ShoppingBag,
  UserRound,
  Waves,
} from 'lucide-react';

const navItems = {
  client: [
    ['/app/cliente/portal', Home, 'Início'],
    ['/app/cliente/dados', UserRound, 'Meu cadastro'],
    ['/app/cliente/shop', ShoppingBag, 'Compras'],
  ],
  admin: [
    ['/app/admin', Home, 'Home'],
    ['/app/admin/clientes', UserRound, 'Clientes'],
    ['/app/admin/totem', ScanFace, 'Totem'],
    ['/app/admin/lavagem', Waves, 'Lavagem'],
    ['/app/admin/self-service', Gauge, 'Self-service'],
    ['/app/admin/shop', ShoppingBag, 'Shop'],
    ['/app/admin/dashboard', BarChart3, 'Dashboard'],
  ],
};

export function Sidebar({ mode }) {
  const items = navItems[mode] || navItems.admin;

  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/app" aria-label="AutoWash Smart">
        <span className="brand-icon"><Droplets size={24} /></span>
        <span>
          <strong>AutoWash</strong>
          <small>{mode === 'client' ? 'Portal do cliente' : 'Operação admin'}</small>
        </span>
      </NavLink>
      <NavLink className="mode-switch" to="/">
        <ClipboardList size={16} />
        Trocar perfil
      </NavLink>
      <nav>
        {items.map(([path, Icon, label]) => (
          <NavLink
            key={path}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            end
            to={path}
            title={label}
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
