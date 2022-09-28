// Imports
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	HomeOutlined,
	CopyOutlined,
	UnorderedListOutlined,
	LogoutOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import '../resources/layout.css';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

/* *********** Imports ************ */

/* *********** Components ************ */

const DefaultLayout = (props) => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);

	const { cartItems, loading } = useSelector((state) => state.rootReducer);

	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}, [cartItems]);

	/* ######### Render Component ########## */

	return (
		/* ######### Main Layout ########## */
		<Layout>
			{loading && (
				<div className='spinner'>
					<div className='spinner-grow' role='status'></div>
				</div>
			)}

			{/* ######### SideBar ########## */}

			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='logo'>
					<h2>
						{collapsed ? (
							<div>
								<span className='first-part'>K</span>~
								<span className='last-part'>M</span>
							</div>
						) : (
							<div>
								<span className='first-part'>K</span>~
								<span className='last-part'>Mart</span>
							</div>
						)}
					</h2>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={window.location.pathname}
				>
					<Menu.Item key='/home' icon={<HomeOutlined />}>
						<Link to='/home'>Home</Link>
					</Menu.Item>

					<Menu.Item key='/bills' icon={<CopyOutlined />}>
						<Link to='/bills'>Bills</Link>
					</Menu.Item>
					<Menu.Item
						key='/items'
						icon={<UnorderedListOutlined />}
					>
						<Link to='/items'>Items</Link>
					</Menu.Item>
					<Menu.Item key='/cart' icon={<ShoppingCartOutlined />}>
						<Link to='/cart'>Cart</Link>
					</Menu.Item>
					<Menu.Item key='/customers' icon={<UserOutlined />}>
						<Link to='/customers'>Customers</Link>
					</Menu.Item>
					<Menu.Item
						key='/logout'
						icon={<LogoutOutlined />}
						onClick={() => {
							localStorage.removeItem('pos-user');
							navigate('/login');
						}}
					>
						Logout
					</Menu.Item>
				</Menu>
			</Sider>

			{/* ######### Content Layout ########## */}

			<Layout className='site-layout'>
				{/* ######### Header ########## */}

				<Header
					className='site-layout-background'
					style={{
						padding: 10,
					}}
				>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: 'trigger',
							onClick: () => setCollapsed(!collapsed),
						}
					)}
					<div
						className='cart-count d-flex align-items-center'
						onClick={() => navigate('/cart')}
					>
						<ShoppingCartOutlined />
						<p className='cart-number'>{cartItems.length}</p>
					</div>
				</Header>

				{/* ######### Body Content ########## */}
				<Content
					className='site-layout-background'
					style={{
						margin: '10px',
						padding: 24,
						minHeight: '80vh',
					}}
				>
					{props.children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default DefaultLayout;
