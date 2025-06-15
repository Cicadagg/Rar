import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="tiamat-sidebar">
      <div className="tiamat-sidebar-header">
        <div className="tiamat-sidebar-title">НАВИГАЦИЯ</div>
        <div className="tiamat-sidebar-subtitle">Версия 0.4.2</div>
      </div>
      <nav className="tiamat-nav">
        <ul className="tiamat-nav-list">
          <li className={`tiamat-nav-item${location.pathname === '/main' ? ' active' : ''}`}>
            <Link to="/main">Главная</Link>
          </li>
          <li className={`tiamat-nav-item${location.pathname === '/lor' ? ' active' : ''}`}>
            <Link to="/lor">Лор</Link>
          </li>
          <li className={`tiamat-nav-item${location.pathname === '/stryct' ? ' active' : ''}`}>
            <Link to="/stryct">Структура</Link>
          </li>
          <li className={`tiamat-nav-item${location.pathname === '/termin' ? ' active' : ''}`}>
            <Link to="/termin">База Данных</Link>
          </li>
          <li className={`tiamat-nav-item${location.pathname === '/lave' ? ' active' : ''}`}>
            <Link to="/lave">Архив</Link>
          </li>
          <li className={`tiamat-nav-item${location.pathname === '/sila' ? ' active' : ''}`}>
            <Link to="/sila">Логика Сил</Link>
          </li>
          <li className={`tiamat-nav-item${location.pathname === '/kart' ? ' active' : ''}`}>
            <Link to="/kart">Карта</Link>
          </li>
        </ul>
      </nav>
      <div className="tiamat-sidebar-footer">
        <div className="tiamat-status">Статус: <span className="online">Онлайн</span></div>
      </div>
    </div>
  );
};

export default Sidebar;
