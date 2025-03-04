import React, { useState } from 'react';
import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import ExpandTable from './components/ExpandTable';
import './App.css';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contentWidth = `calc(100vw - ${collapsed ? 80 : 200}px - 32px)`;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-container">
          <div className="logo-box">
            {/* 这里可以放置 logo 或其他内容 */}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <BarChartOutlined />,
              label: '报表',
            },
          ]}
        />
      </Sider>
      <Layout style={{ background: '#f5f5f5' }}>
        <Header 
          style={{ 
            padding: 0, 
            background: colorBgContainer,
            margin: '16px 16px 0',
            width: contentWidth,
            borderRadius: borderRadiusLG
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
            overflow: 'auto',
            minHeight: 'calc(100vh - 64px - 32px)',
            display: 'flex',
            width: contentWidth,
            transition: 'width 0.3s'
          }}
        >
          <ExpandTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;