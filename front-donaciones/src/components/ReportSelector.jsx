import React, { useState } from 'react';
import { TreeSelect, Card } from 'antd';
import { ALL_REPORTS } from '../utils/reportConfig';

const { TreeNode } = TreeSelect;

const ReportSelector = ({ onSelectReport }) => {
  const [value, setValue] = useState(null);

  const categories = {
    Consultas: {
      name: "Consultas",
      reports: ['donaciones_detalladas']
    },
    donaciones: {
      name: "Reportes",
      reports: ['donaciones_por_campana','voluntarios_por_campana', 'horas_voluntariado']
    },
  };

  const onChange = (reportKey) => {
    setValue(reportKey);
    onSelectReport(ALL_REPORTS[reportKey]);
  };

  return (
    <Card 
      title="Seleccionar Reporte" 
      bordered={false}
      style={{ width: '300px', marginBottom: '40px' }}
      bodyStyle={{ padding: '0px' }}
    >
      <TreeSelect
        showSearch
        style={{ width: '100%', minWidth: '250px' }}
        value={value}
        dropdownStyle={{ 
          maxHeight: 400, 
          overflow: 'auto', 
          minWidth: '300px'  
        }}
        placeholder="Busque y seleccione un reporte"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        size="large"  
      >
        {Object.entries(categories).map(([catKey, category]) => (
          <TreeNode 
            value={catKey} 
            title={category.name} 
            selectable={false}
            key={catKey}
          >
            {category.reports.map(reportKey => (
              <TreeNode
                value={reportKey}
                title={<span style={{ whiteSpace: 'nowrap' }}>{ALL_REPORTS[reportKey].name}</span>}
                key={reportKey}
              />
            ))}
          </TreeNode>
        ))}
      </TreeSelect>
    </Card>
  );
};

export default ReportSelector;