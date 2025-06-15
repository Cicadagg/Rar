import React, { useState } from 'react';
import { archiveData } from './archiveData';
import './lore.css';

const Lor = () => {
  const [password, setPassword] = useState('');
  const [device, setDevice] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundItem = archiveData.find(item =>
      item.password === password && item.device === device
    );
    if (foundItem) {
      setAuthenticated(true);
      setError('');
      setContent(foundItem);
    } else {
      setError('Неверный пароль или название устройства');
      setAuthenticated(false);
      setContent(null);
    }
  };

  const resetForm = () => {
    setAuthenticated(false);
    setPassword('');
    setDevice('');
    setError('');
    setContent(null);
  };

  return (
    <div className="tiamat-container">
      <div className="sticker">
        <div className="sticker-header">Пароль и Носитель</div>
        <div className="sticker-content">Start</div>
        <div className="sticker-tape"></div>
      </div>
      <div className="tiamat-main-content2">
        <div className="tiamat-header">
          <h1 className="tiamat-title">Терминал доступа</h1>
          <div className="tiamat-header-meta">Введите учетные данные для получения данных</div>
        </div>

        <div className="tiamat-content-wrapper">
          <div className="tiamat-lore-text">
            <p>Мегаструктура Тиамат, место, в котором выросло и живет не одно поколение людей. Огромные строения, заполняющие практически весь обозримый и необозримый мир. Люди в нем — просто выжившие, никак не хозяева.</p>
            
            <p>Гигаполисы, построенные в относительно безопасных секторах, пристанища для них. Они живут, поглощая аномалий ради топлива, думая о том, как выйти за пределы своих секторов, ставя себе очередные импланты с наркотическим эффектом, чтобы забыться и поспать.</p>
            
            <p>Всё это — обычная жизнь внутри Тиамат.<br />
            Сможешь ли ты выйти за пределы своего сектора и найти артефакты прошлого? Или, может, ты один из тех, кто смог пробудить Манифестацию Души и стал легендой Рифтеров? Удачи в Тиамат.</p>
          </div>

          <div className="tiamat-terminal-section">
            {!authenticated ? (
              <form onSubmit={handleSubmit} className="terminal-form">
                <div className="terminal-input-group">
                  <label htmlFor="password">Пароль:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="terminal-input"
                    autoFocus
                  />
                </div>
                <div className="terminal-input-group">
                  <label htmlFor="device">Название устройства:</label>
                  <input
                    type="text"
                    id="device"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="terminal-input"
                  />
                </div>
                <button type="submit" className="terminal-button">
                  Подтвердить
                </button>
                {error && <div className="terminal-error">{error}</div>}
              </form>
            ) : (
              <div className="terminal-response">
                <h3>{content.title}</h3>
                <div className="terminal-years">{content.years}</div>
                <div className="terminal-content">
                  {content.content.map((item, index) => (
                    <div key={index} className="terminal-content-item">
                      <h4>{item.year} - {item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
                <button onClick={resetForm} className="terminal-button">
                  Новый запрос
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lor;