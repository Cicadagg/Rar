import React, { useState } from 'react';
import './anomalies.css';
import { anomaliesData, legendsData } from './data';

const AnomaliesPage = () => {
  const [activeFolder, setActiveFolder] = useState('anomalies');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFolders, setShowFolders] = useState(true);

  const data = activeFolder === 'anomalies' ? anomaliesData : legendsData;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const toggleFolders = () => {
    setShowFolders(!showFolders);
  };

  const renderContent = (content) => {
    return content.split('\n').map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ));
  };

  const currentItem = data[currentIndex];
  const imageOrientation = currentItem.imageOrientation || 'horizontal';

  return (
    <div className="anomalies-container">
      <h1>Архив Тиамат</h1>
      
      <button className="toggle-folders-btn" onClick={toggleFolders}>
        {showFolders ? 'Скрыть папки' : 'Показать папки'}
      </button>
      
      {showFolders && (
        <div className="folders-container">
          <div 
            className={`folder ${activeFolder === 'anomalies' ? 'active' : ''}`}
            onClick={() => {
              setActiveFolder('anomalies');
              setCurrentIndex(0);
            }}
          >
            <div className="folder-icon">📁</div>
            <div className="folder-name">Аномалии</div>
          </div>
          
          <div 
            className={`folder ${activeFolder === 'legends' ? 'active' : ''}`}
            onClick={() => {
              setActiveFolder('legends');
              setCurrentIndex(0);
            }}
          >
            <div className="folder-icon">📁</div>
            <div className="folder-name">Легенды</div>
          </div>
        </div>
      )}
      
      {data.length > 0 && (
        <div className="document-viewer">
          <div className="document-header">
            <h2>{currentItem.title}</h2>
            {currentItem.class && (
              <div className="document-class">
                Класс опасности: <span className={`class-${currentItem.class.toLowerCase()}`}>{currentItem.class}</span>
              </div>
            )}
            {currentItem.status && (
              <div className="document-status">Статус: {currentItem.status}</div>
            )}
          </div>
          
          <div className="document-content">
            <div className="document-text">
              <h3>Описание:</h3>
              <p>{currentItem.description}</p>
              
              {currentItem.image && (
                <div className="document-image">
                  <img 
                    src={process.env.PUBLIC_URL + currentItem.image} 
                    alt={currentItem.title}
                    className={`anomaly-image image-${imageOrientation}`}
                  />
                </div>
              )}
              
              {currentItem.features && (
                <>
                  <h3>Особенности:</h3>
                  <ul>
                    {currentItem.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {currentItem.theories && (
                <>
                  <h3>Теории:</h3>
                  <ul>
                    {currentItem.theories.map((theory, i) => (
                      <li key={i}>{theory}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {currentItem.neutralization && (
                <>
                  <h3>Методы нейтрализации:</h3>
                  <p>{currentItem.neutralization}</p>
                </>
              )}
              
              {currentItem.nutrition && (
                <>
                  <h3>Питательная материя:</h3>
                  <p>{currentItem.nutrition}</p>
                </>
              )}
              
              {currentItem.notes && (
                <>
                  <h3>Примечания:</h3>
                  {currentItem.notes.map((note, i) => (
                    <div key={i} className="note">
                      {renderContent(note)}
                    </div>
                  ))}
                </>
              )}
              
              {currentItem.cases && (
                <>
                  <h3>Известные случаи:</h3>
                  <ul>
                    {currentItem.cases.map((caseItem, i) => (
                      <li key={i}>{caseItem}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          
          <div className="document-controls">
            <button onClick={handlePrev} disabled={data.length <= 1}>← Назад</button>
            <span>{currentIndex + 1} / {data.length}</span>
            <button onClick={handleNext} disabled={data.length <= 1}>Вперед →</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnomaliesPage;