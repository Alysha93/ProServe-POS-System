import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import POSPage from './pages/POSPage';
import TablesPage from './pages/TablesPage';
import KDSPage from './pages/KDSPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<POSPage />} />
          <Route path="tables" element={<TablesPage />} />
          <Route path="kitchen" element={<KDSPage />} />
          <Route path="reports" element={<div className="p-8"><h1 className="text-3xl text-slate-100 font-bold">Reports</h1></div>} />
          <Route path="settings" element={<div className="p-8"><h1 className="text-3xl text-slate-100 font-bold">Settings</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
