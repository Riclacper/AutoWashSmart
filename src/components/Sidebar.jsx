import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  ClipboardList,
  Gauge,
  Home,
  Menu,
  ScanFace,
  ShoppingBag,
  UserRound,
  Waves,
  X,
} from 'lucide-react';
import logo from '../assets/logo.png';

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
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <aside className={isOpen ? 'sidebar menu-open' : 'sidebar'}>
      <div className="sidebar-top">
        <NavLink className="brand" to="/app" aria-label="AutoWash Smart" onClick={closeMenu}>
          <span className="brand-logo">
            <img src={logo} alt="" />
          </span>
          <span>
            <strong>AutoWash</strong>
            <small>{mode === 'client' ? 'Portal do cliente' : 'Operação admin'}</small>
          </span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
          <span>Menu</span>
        </button>
      </div>
      <div className="sidebar-menu" id="main-menu">
        <NavLink className="mode-switch" to="/" onClick={closeMenu}>
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
              onClick={closeMenu}
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
