import React, { useState } from 'react';
import { Table, Card, Spin, Empty, Alert } from 'antd';
import DynamicFilters from './DynamicFilters';
import { fetchReportData } from '../api/reportes';

const ReportViewer = ({ reportConfig }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilter = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchReportData(reportConfig.endpoint, filters);
      setData(response);
    } catch (err) {
      setError("Error al cargar el reporte");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value, format) => {
    if (format === 'currency') {
      return `$${value.toLocaleString()}`;
    }
    if (format === 'date') {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  const columns = reportConfig.columns.map(col => ({
    title: col.label,
    dataIndex: col.key,
    key: col.key,
    render: value => formatValue(value, col.format)
  }));

  return (
    <Card 
      title={reportConfig.name}
      bordered={false}
      style={{ marginBottom: 24 }}
    >
      <DynamicFilters 
        filtersConfig={reportConfig.filters} 
        onFilter={handleFilter} 
      />
      
      {error && <Alert message={error} type="error" showIcon />}
      
      <Spin spinning={loading}>
        {data.length > 0 ? (
          <Table 
            columns={columns} 
            dataSource={data} 
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: true }}
          />
        ) : (
          <Empty description="No hay datos para mostrar" />
        )}
      </Spin>
    </Card>
  );
};

export default ReportViewer;
