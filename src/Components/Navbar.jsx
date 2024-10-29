import React, {useState, useEffect} from 'react';
import { Avatar, Button, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined, MoneyCollectOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(()=>{
    const handleScreen = ()=> setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleScreen);
    handleScreen();

    return ()=> window.removeEventListener('resize', handleScreen);
  }, []);
  useEffect(()=>{
      if(screenSize < 778){
        setActiveMenu(false);
      }else{
        setActiveMenu(true);
      }
  }, [screenSize]);

  
  const menuItems = [
    { icon: <HomeOutlined />, text: 'Home', to: '/' },
    { icon: <FundOutlined />, text: 'Cryptocurrencies', to: '/cryptocurrencies' },
    { icon: <MoneyCollectOutlined />, text: 'Exchanges', to: '/exchanges' },
    { icon: <BulbOutlined />, text: 'News', to: '/news' },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size='large' /> {/* Use the 'icon' variable for the image source */}
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button className='menu-control-container' type='default' onClick={()=> setActiveMenu(!activeMenu)}>
        <AppstoreAddOutlined className='controlled-menu' />
        </Button>
      </div>
      {
        activeMenu &&(
          <Menu theme="light" className={`menu-duration ${activeMenu ? '' : 'collapsed'}`}>
              {menuItems.map((item) => (
                <Menu.Item key={item.to} icon={item.icon}>
                  <Link to={item.to}>{item.text}</Link>
                </Menu.Item>
              ))}
            </Menu>
        )
      }
      
    </div>
  );
};

export default Navbar;
