import React from 'react';
import { Form, DatePicker, InputNumber, Select, Button, Row, Col, Input } from 'antd';

const { RangePicker } = DatePicker;

const DynamicFilters = ({ filtersConfig, onFilter }) => {
  const [form] = Form.useForm();

  const renderFilterInput = (name, config) => {
    switch(config.type) {
      case 'date':
        return <DatePicker style={{ width: '100%' }} />;
      case 'range':
        return <RangePicker style={{ width: '100%' }} />;
      case 'number':
        return <InputNumber style={{ width: '100%' }} />;
      case 'select':
        return (
          <Select placeholder={`Seleccione ${config.label}`}>
            {config.options.map(opt => (
              <Select.Option key={opt} value={opt}>{opt}</Select.Option>
            ))}
          </Select>
        );
      default:
        return <Input />;
    }
  };

  const handleSubmit = (values) => {
    const cleaned = { ...values };

    Object.entries(filtersConfig).forEach(([key, config]) => {
      if (config.type === 'range' && values[key]) {
        const [start, end] = values[key];
        cleaned[`${key}_inicio`] = start.format('YYYY-MM-DD');
        cleaned[`${key}_fin`] = end.format('YYYY-MM-DD');
        delete cleaned[key];
      }
      if (config.type === 'date' && values[key]) {
        cleaned[key] = values[key].format('YYYY-MM-DD');
      }
    });

    onFilter(cleaned);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={16}>
        {Object.entries(filtersConfig).map(([name, config]) => (
          <Col xs={24} sm={12} md={8} lg={6} key={name}>
            <Form.Item name={name} label={config.label}>
              {renderFilterInput(name, config)}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Aplicar Filtros
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="default" onClick={() => form.resetFields()}>
          Limpiar Filtros
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicFilters;
