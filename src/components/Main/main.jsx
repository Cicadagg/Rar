import React from 'react';
import './main.css';

const Main = () => {
  return (
    <div className="tiamat-container">
      <div className="tiamat-main-content">
        <header className="tiamat-header">
          <h1 className="tiamat-title">Терминал "Тиамат"</h1>
          <div className="tiamat-header-meta">Последнее обновление: 14.06.2025</div>
        </header>

        <main className="tiamat-article">
          <div className="tiamat-article-content">
            <h2>Добро пожаловать в центральную базу данных</h2>
            <p>
              Вселенная "Тиамат" представляет собой постапокалиптический мир, где остатки человечества выживают среди руин цивилизации. Технологическое наследие прошлого смешалось с новой варварской реальностью, породив уникальный синтез науки и мифологии.
            </p>
            <img className="tiamat-image-placeholder" src={process.env.PUBLIC_URL + "/images/tiamat-terminal.png"} alt="Терминал Тиамат" />
            <h3>Ключевые особенности:</h3>
            <ul className="tiamat-features">
              <li>Множество фракций с уникальными идеологиями</li>
              <li>Забытые технологии и артефакты прошлого</li>
              <li>Динамично развивающийся мир</li>
              <li>Глубокая система персонажей</li>
            </ul>
          </div>
        </main>

        <footer className="tiamat-footer">
          <div className="tiamat-discord-banner">
            <span className="tiamat-discord-icon">[D]</span>
            <span>Присоединяйтесь к нашему сообществу: </span>
            <a href="https://discord.gg/J7ZDQgE9k6" className="tiamat-discord-link">Discord сервер</a>
          </div>
          <div className="tiamat-copyright">© 2025 Проект "Тиамат". Все права защищены.</div>
        </footer>
      </div>
    </div>
  );
};

export default Main;
