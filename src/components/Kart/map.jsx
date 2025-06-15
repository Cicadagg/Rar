import React, { useState } from 'react';
import { locations } from './locationsData';
import './map.css';

const MapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('nokt-urba');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = Object.values(locations).filter(location => {
    const safeTitle = location?.title?.toLowerCase() || '';
    const safeContent = location?.content?.toLowerCase() || '';
    const safeSearch = searchTerm.toLowerCase();
    
    return safeTitle.includes(safeSearch) || safeContent.includes(safeSearch);
  });

  const renderContent = (content) => {
    if (!content) return null;
    
    return content.split('\n').map((paragraph, i) => {
      if (!paragraph || paragraph.trim() === '') return null;
      
      // Обработка заголовков
      if (paragraph.startsWith('## ')) {
        return <h3 key={i}>{paragraph.substring(3)}</h3>;
      }
      if (paragraph.startsWith('### ')) {
        return <h4 key={i}>{paragraph.substring(4)}</h4>;
      }
      
      // Обработка жирного текста и списков
      const html = paragraph
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
      
      return (
        <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
      );
    });
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h1>Карта Секторов Z-320.0</h1>
        <div className="map-search">
          <input
            type="text"
            placeholder="Поиск по локациям..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="map-notice">
        <p>Карта что будет пояснено ниже, не является абсолютной и затрагивает около 50 секторов, в области сектора Z-320.0. Если данные не точные то никто не несет ответственности, лучше делайте свои карты.</p>
      </div>

      <div className="map-content-wrapper">
        <div className="map-sidebar">
          <h3>Локации</h3>
          <div className="location-category">
            <h4>Гигаполисы</h4>
            <ul>
              {Object.values(locations)
                .filter(loc => loc.type === 'Гигаполис')
                .map(location => (
                  <li 
                    key={location.id}
                    className={selectedLocation === location.id ? 'active' : ''}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    {location.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="location-category">
            <h4>Малые Поселения</h4>
            <ul>
              {Object.values(locations)
                .filter(loc => loc.type === 'Малые Поселения')
                .map(location => (
                  <li 
                    key={location.id}
                    className={selectedLocation === location.id ? 'active' : ''}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    {location.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="map-main-content">
          {searchTerm ? (
            <div className="search-results">
              <h2>Результаты поиска: "{searchTerm}"</h2>
              {filteredLocations.length > 0 ? (
                filteredLocations.map(location => (
                  <div key={location.id} className="location-item">
                    <h3>{location.title} <span className="location-type">{location.type}</span></h3>
                    <div className="location-content">
                      {renderContent(location.content)}
                    </div>
                  </div>
                ))
              ) : (
                <p>Ничего не найдено</p>
              )}
            </div>
          ) : (
            <div className="location-details">
              <h2>{locations[selectedLocation]?.title || 'Локация не найдена'} 
                <span className="location-type">{locations[selectedLocation]?.type}</span>
              </h2>
              <div className="map-visual">
                <div className="map-placeholder">
                  [Деревянная доска с маркерами городов и нитями-маршрутами между ними]
                </div>
              </div>
              <div className="location-content">
                {renderContent(locations[selectedLocation]?.content)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;