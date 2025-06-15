import React, { useState } from 'react';
import { logSilData } from './logSilData';
import './logSil.css';

const TermsPage = () => {
  const [activeTab, setActiveTab] = useState(logSilData[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const termsDataMap = logSilData.reduce((acc, term) => {
    acc[term.id] = {
      title: term.title,
      content: term.content
    };
    return acc;
  }, {});

  // Безопасная фильтрация с проверкой на существование свойств
  const filteredTerms = logSilData.filter(term => {
    const title = term.title || '';
    const content = term.content || '';
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Функция для рендеринга контента с поддержкой <br />
  const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n').map((paragraph, i) => {
      if (paragraph.trim() === '') return null;
      return (
        <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
      );
    });
  };

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1>Архив Тиамат</h1>
        <div className="terms-search">
          <input
            type="text"
            placeholder="Поиск по ключивым словам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <div className="terms-content-wrapper">
        <div className="terms-sidebar">
          <h3>Категории Ключевых Слов</h3>
          <ul>
            {logSilData.map(term => (
              <li 
                key={term.id}
                className={activeTab === term.id ? 'active' : ''}
                onClick={() => setActiveTab(term.id)}
              >
                {term.title?.split('|')[0].trim()} {/* Добавлена безопасная проверка */}
              </li>
            ))}
          </ul>
        </div>

        <div className="terms-main-content">
          {searchTerm ? (
            <div className="search-results">
              <h2>Результаты поиска: "{searchTerm}"</h2>
              {filteredTerms.length > 0 ? (
                filteredTerms.map(term => (
                  <div key={term.id} className="term-item">
                    <h3>{term.title}</h3>
                    <div className="term-content">
                      {renderContent(term.content)}
                    </div>
                  </div>
                ))
              ) : (
                <p>Ничего не найдено</p>
              )}
            </div>
          ) : (
            <div className="term-details">
              <h2>{termsDataMap[activeTab]?.title}</h2>
              <div className="term-content">
                {renderContent(termsDataMap[activeTab]?.content)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;