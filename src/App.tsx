import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import POSPage from './pages/POSPage';
import TablesPage from './pages/TablesPage';
import KDSPage from './pages/KDSPage';
import TakeoutPage from './pages/TakeoutPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import CheckoutPage from './pages/CheckoutPage';

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
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

