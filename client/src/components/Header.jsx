import React from 'react';
import { Col, Row } from 'antd';

function Header() {
	return (
		<Row className='items-header'>
			<Col span={4}>Item</Col>
			<Col span={4}>Quantity</Col>
			<Col span={4}>Category</Col>
			<Col span={4}>Price</Col>
			<Col span={4}>Cart</Col>
		</Row>
	);
}

export default Header;
