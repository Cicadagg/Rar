import { Routes, Route, Navigate } from 'react-router-dom';
import LorPage from '../components/Lor/lore'; 
import MainPage from '../components/Main/main'; 
import Str from '../components/Str/stryct'; 
import Termin from '../components/Termin/termin'; 
import LogSil from '../components/LogSil/logSil';  
import LifeInTiamatPage from '../components/Laiv/lave'; 
import MapPage from '../components/Kart/map'; 

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/lor" element={<LorPage />} />
      <Route path="/stryct" element={<Str />} />
      <Route path="/termin" element={<Termin />} />
      <Route path="/lave" element={<LifeInTiamatPage />} />
      <Route path="/sila" element={<LogSil />} />
      <Route path="/kart" element={<MapPage />} />
    </Routes>
  );
}

export default AppRouter;