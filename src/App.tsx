import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import POSPage from './pages/POSPage';
import TablesPage from './pages/TablesPage';
import KDSPage from './pages/KDSPage';
import TakeoutPage from './pages/TakeoutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/demo" element={<Layout />}>
          <Route index element={<POSPage />} />
          <Route path="takeout" element={<TakeoutPage />} />
          <Route path="tables" element={<TablesPage />} />
          <Route path="kitchen" element={<KDSPage />} />
          <Route path="reports" element={<div className="p-8"><h1 className="text-3xl text-text-main font-bold">Reports</h1></div>} />
          <Route path="settings" element={<div className="p-8"><h1 className="text-3xl text-text-main font-bold">Settings</h1></div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
