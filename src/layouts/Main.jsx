import React, { useState, useEffect } from 'react';
import { Link, withRouter, matchPath } from 'react-router-dom';
import { Layout, Menu, Icon, Avatar, Modal } from 'antd';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import Footer from './Footer';
import config from 'configs/configs';
import routes from 'configs/routes';

import styles from './layout.module.scss';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Header = ({ sidebarToggler, ...rest }) => {
  const confirmLogout = () =>
    Modal.confirm({
      title: 'Are you sure to logout?',
      onOk: () => Cookies.remove('authToken'),
    });

  return (
    <Layout.Header {...rest}>
      {sidebarToggler}
      <div className="right">
        <Menu theme="dark" mode="horizontal">
          <SubMenu
            title={
              <>
                {Cookies.get('avatar') && (
                  <Avatar
                    style={{ backgroundColor: '#2f54eb' }}
                    icon="user"
                    src={Cookies.get('avatar').avatar}
                  />
                )}
                {Cookies.get('userName') && (
                  <span className="ml-1">{Cookies.get('userName')}</span>
                )}
              </>
            }
          >
            <Menu.Item onClick={confirmLogout}>
              <Icon type="logout" />
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  );
};

const smallScreen = window.innerWidth < 576;
const initState = {
  collapsed: smallScreen || window.innerWidth < 768,
  smallScreen,
};

const Main = ({ header, history, location, children, className }) => {
  const [state, setState] = useState(initState);
  const { collapsed, smallScreen } = state;
  useEffect(() => {
    initState.smallScreen = smallScreen;
    initState.collapsed = collapsed;
  }, [smallScreen, collapsed]);
  const sidebarMiniWidth = smallScreen ? 0 : 80;

  const SidebarToggler = (
    <Icon
      className="sidebar-toggler"
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={() => setState({ ...state, collapsed: !collapsed })}
    />
  );

  const mainStyle = {
    marginLeft: collapsed ? sidebarMiniWidth : config.sidebarWidth,
  };
  if (smallScreen && mainStyle.marginLeft) {
    mainStyle.marginRight = -1 * mainStyle.marginLeft;
  }

  return (
    <Layout className={classNames(styles.main, className)}>
      <Sider
        onBreakpoint={b =>
          setState({ ...state, collapsed: collapsed || b, smallScreen: b })
        }
        breakpoint="sm"
        collapsedWidth={sidebarMiniWidth}
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={config.sidebarWidth}
        theme="light"
      >
        <div className="logo">
          {/* <img src={logo} alt="Logo" /> */}
          <h1>IRT - BASED CAT</h1>
        </div>
        <SideMenu location={location} />
      </Sider>
      <Layout className="main" style={mainStyle}>
        <Header
          className="header"
          history={history}
          style={{
            left: collapsed ? sidebarMiniWidth : config.sidebarWidth,
            width: smallScreen ? '100%' : 'auto',
          }}
          sidebarToggler={SidebarToggler}
        />
        <Content className="content">
          {header}
          <div className="main-content">{children}</div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

const SideMenu = ({ location: { pathname } }) => {
  const selectedMenu = routes.find(m =>
    matchPath(pathname, { path: m.path, exact: m.path === '/' }),
  );
  let selectedKey;
  let openedKey;
  if (selectedMenu) {
    openedKey = [selectedMenu.path];
    selectedKey = [selectedMenu.path];
    if (selectedMenu.subMenus) {
      const sm = selectedMenu.subMenus.find(m =>
        matchPath(pathname, { path: m.path, exact: m.path === '/' }),
      );
      if (sm) {
        selectedKey = [sm.path];
      }
    }
  }

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={selectedKey}
      defaultOpenKeys={openedKey}
    >
      {routes.map(m => {
        if (!m.subMenus) {
          return (
            <Menu.Item key={m.path}>
              <Link to={m.path} replace={m.path === pathname}>
                <Icon type={m.icon} />
                <span>{m.title}</span>
              </Link>
            </Menu.Item>
          );
        }
        return (
          <SubMenu
            key={m.path}
            selectedKeys={selectedMenu && [selectedMenu.path]}
            title={() => (
              <span>
                <Icon type={m.icon} />
                <span>{m.title}</span>
              </span>
            )}
          >
            {m.subMenus.map(sm => (
              <Menu.Item key={sm.path}>
                <Link to={sm.path} replace={sm.path === pathname}>
                  {sm.icon && <Icon type={sm.icon} />}
                  <span>{sm.title}</span>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        );
      })}
    </Menu>
  );
};

export default withRouter(Main);
