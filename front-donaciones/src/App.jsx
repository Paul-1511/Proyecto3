import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import ReportsDashboard from './pages/ReportsDashboard';

function App() {
  return (
    <ConfigProvider locale={esES}>
      <Router>
        <Routes>
          <Route path="/" element={<ReportsDashboard />} />
          <Route path="/reportes" element={<ReportsDashboard />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;