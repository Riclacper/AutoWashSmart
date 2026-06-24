import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Droplets,
  Gauge,
  Home,
  ScanFace,
  ShoppingBag,
  UserRound,
  Waves,
} from 'lucide-react';

const items = [
  ['/', Home, 'Home'],
  ['/cliente', UserRound, 'Cliente'],
  ['/totem', ScanFace, 'Totem'],
  ['/lavagem', Waves, 'Lavagem'],
  ['/self-service', Gauge, 'Self-service'],
  ['/shop', ShoppingBag, 'Shop'],
  ['/dashboard', BarChart3, 'Admin'],
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/" aria-label="AutoWash Smart">
        <span className="brand-icon"><Droplets size={24} /></span>
        <span>
          <strong>AutoWash</strong>
          <small>Lave, pague e siga.</small>
        </span>
      </NavLink>
      <nav>
        {items.map(([path, Icon, label]) => (
          <NavLink
            key={path}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
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
