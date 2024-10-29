import millify from 'millify';
import { Typography, Statistic, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {useGetCryptosQuery} from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
const HomePage = () => {
  const { Title } = Typography;
  const { data, isFetching } = useGetCryptosQuery(10);
  
  if (isFetching) return <Loader/>;
  const globalstate = data?.data?.stats; //optional chaining
  console.log(data);
  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic title='Total Cryptocurrencies' value={globalstate.total} />
          <Statistic title='Total Exchanges' value={millify(globalstate.totalExchanges)} />
          <Statistic title='Total Market Cap' value={millify(globalstate.totalMarketCap)} />
          <Statistic title='Total 24h Volume' value={millify(globalstate.total24hVolume)} />
          <Statistic title='Total Markets' value={millify(globalstate.totalMarkets)} />
        </Col>
      </Row>
      <div className='home-heading-container'>
          <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
          <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className='home-heading-container'>
          <Title level={2} className='home-title'>Latest Crypto News</Title>
          <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
      </div>
      <News simplified/>
    </>
  )
}

export default HomePage;