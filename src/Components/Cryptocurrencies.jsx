import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { motion } from 'framer-motion';
import Loader from './Loader';

const { Meta } = Card;

const CryptocurrencyCard = ({ currency }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link to={`/crypto/${currency.uuid}`} key={currency.uuid}>
        <Card
          title={`${currency.rank}. ${currency.name}`}
          extra={<img className='crypto-image' src={currency.iconUrl} alt={currency.name} />}
          hoverable
        >
          <Meta title={`Price: ${millify(currency.price)}`} />
          <p>Market Cap: {millify(currency.marketCap)}</p>
          <p>Daily Change: {millify(currency.change)}</p>
        </Card>
      </Link>
    </motion.div>
  );
};

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [searchTerm, cryptosList]);

  if (isFetching) return <Loader/>;

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency ...' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col lg={6} sm={12} xs={24} className='crypto-card' key={currency.uuid}>
            <CryptocurrencyCard currency={currency} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
