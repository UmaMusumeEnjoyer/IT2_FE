import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ListChecks, Bot, Calendar, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Tra cứu & Quy chế', icon: Search },
    { to: '/procedure', label: 'Chi tiết thủ tục', icon: ListChecks },
    { to: '/ai-chat', label: 'Trợ lý học vụ AI', icon: Bot },
    { to: '/calendar', label: 'Lịch & Bản tin', icon: Calendar },
  ];

  return (
    <header className="bg-dut-primary text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Project Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-extrabold text-xl tracking-wider text-amber-300 border border-white/20">
              DUT
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">CỔNG DỊCH VỤ & HỖ TRỢ SINH VIÊN</h1>
              <p className="text-xs text-dut-on-primary-container">Trường Đại học Bách khoa — Đại học Đà Nẵng</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white font-semibold shadow-inner'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* External Links */}
          <div className="hidden lg:flex items-center space-x-3 text-xs">
            <a
              href="https://sv.dut.udn.vn/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors"
            >
              <span>sv.dut.udn.vn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex border-t border-white/10 bg-dut-primary/95 overflow-x-auto py-1 px-2 space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs whitespace-nowrap ${
                  isActive ? 'bg-white/20 text-white font-semibold' : 'text-white/70'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </header>
  );
};
