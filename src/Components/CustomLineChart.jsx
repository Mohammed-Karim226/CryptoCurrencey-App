import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const CustomLineChart = ({ coinHistory, currentPrice, coinName }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const newChartData = coinHistory?.data?.history?.map(item => ({
      timestamp: new Date(item.timestamp).toLocaleDateString(),
      price: item.price,
    }));

    setChartData(newChartData);
  }, [coinHistory]);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="timestamp" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#0071bd" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CustomLineChart;
