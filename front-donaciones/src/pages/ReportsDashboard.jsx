import React, { useState } from 'react';
import { Row, Col } from 'antd';
import ReportSelector from '../components/ReportSelector';
import ReportViewer from '../components/ReportViewer';

const ReportsDashboard = () => {
  const [currentReport, setCurrentReport] = useState(null);

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={200}>
        <Col xs={24} md={8}>
          <ReportSelector onSelectReport={setCurrentReport} />
        </Col>
        <Col xs={24} md={16}>
          {currentReport ? (
            <ReportViewer reportConfig={currentReport} />
          ) : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '300px',
              border: '2px dashed #5a5a5a',
              borderRadius: '2px'
            }}>
              <p style={{ color: 'rgba(0, 0, 0, 0.25)' }}>
                Seleccione un reporte para visualizarlo
              </p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ReportsDashboard;