import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Layout, Typography, Space, Divider } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import {Navbar, HomePage, Exchanges, Cryptocurrencies, CryptoDetails, News} from './Components';
import './App.css';
function App() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { to: '/', comp: 'Home' },
    { to: '/cryptocurrencies', comp: 'Cryptocurrencies' },
    { to: '/exchanges', comp: 'Exchanges' },
    { to: '/news', comp: 'News' },
  ];
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            
              <Routes>
                <Route exact path='/' element={ <HomePage />} />
                <Route exact path='/exchanges' element={<Exchanges />} />
                <Route exact path='/cryptocurrencies' element={ <Cryptocurrencies />} />
                <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />
                <Route exact path='/news' element={<News />} />
              </Routes>
          
          </div>
        </Layout>
{/* footer */}
<div className='footer' style={{ padding: '20px 0', textAlign: 'center' }}>
      <Divider />
      <Space size="large">
        {footerLinks.map((link) => (
          <Link key={link.to} to={link.to} className='link'>
            {link.comp}
          </Link>
        ))}
      </Space>
      <Divider />
      <Space size="large">
        <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">
          <GithubOutlined style={{ fontSize: '1.5rem', color: '#0C344E' }} />
        </a>
        <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined style={{ fontSize: '1.5rem', color: '#668BC4' }} />
        </a>
        <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
          <LinkedinOutlined style={{ fontSize: '1.5rem', color: '#0640A7' }} />
        </a>
      </Space>
      <Divider />
      <Typography.Title level={5} style={{ color: '#335495' }}>
        Cryptoverse <br />
        All rights reserved &copy; {currentYear}
      </Typography.Title>
      <Typography.Text style={{ color: '#335495' }}>Designed by Eng: Mohammed Karim {currentYear} </Typography.Text>
    </div>
      </div>

    </div>
  );
}

export default App;
