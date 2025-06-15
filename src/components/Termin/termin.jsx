import React, { useState } from 'react';
import { termData } from './termData';
import './termin.css';

const TermsPage = () => {
  const [activeTab, setActiveTab] = useState(termData[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const termsDataMap = termData.reduce((acc, term) => {
    if (term && term.id) {
      acc[term.id] = {
        title: term.title || '',
        content: term.content || ''
      };
    }
    return acc;
  }, {});

  // Безопасная фильтрация с проверками
  const filteredTerms = termData.filter(term => {
    const safeTitle = term?.title?.toLowerCase() || '';
    const safeContent = term?.content?.toLowerCase() || '';
    const safeSearch = searchTerm.toLowerCase();
    
    return safeTitle.includes(safeSearch) || safeContent.includes(safeSearch);
  });

  // Безопасный рендеринг контента
  const renderContent = (content) => {
    if (!content) return null;
    
    return content.split('\n').map((paragraph, i) => {
      if (!paragraph || paragraph.trim() === '') return null;
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
            placeholder="Поиск по ключевым словам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Исправлено e.value на e.target.value
          />
        </div>
      </div>

      <div className="terms-content-wrapper">
        <div className="terms-sidebar">
          <h3>Категории Ключевых Слов</h3>
          <ul>
            {termData.map(term => (
              <li 
                key={term?.id || Math.random()} // Запасной ключ на случай отсутствия id
                className={activeTab === term?.id ? 'active' : ''}
                onClick={() => term?.id && setActiveTab(term.id)}
              >
                {term?.title?.split('|')[0]?.trim() || 'Без названия'}
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
                  <div key={term?.id || Math.random()} className="term-item">
                    <h3>{term?.title || 'Без названия'}</h3>
                    <div className="term-content">
                      {renderContent(term?.content)}
                    </div>
                  </div>
                ))
              ) : (
                <p>Ничего не найдено</p>
              )}
            </div>
          ) : (
            <div className="term-details">
              <h2>{termsDataMap[activeTab]?.title || 'Содержание не найдено'}</h2>
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