import React from 'react';
import { Row, Col, Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

function Item({ item }) {
	const dispatch = useDispatch();

	const addToCart = () => {
		dispatch({ type: 'ADD_TO_CART', payload: item });
	};

	const increaseQuantity = (item) => {
		dispatch({
			type: 'UPDATE_CART',
			payload: { ...item, quantity: item.quantity + 1 },
		});
	};

	const decreaseQuantity = (item) => {
		if (item.quantity !== 1) {
			dispatch({
				type: 'UPDATE_CART',
				payload: { ...item, quantity: item.quantity - 1 },
			});
		}
	};
	return (
		<Row className='items'>
			<Col className='item' span={4}>
				<b>{item.item}</b>
			</Col>
			<Col className='item' span={4}>
				<PlusCircleOutlined
					className='mx-2'
					onClick={() => increaseQuantity(item)}
				/>
				{item.quantity}
				<MinusCircleOutlined
					className='mx-2'
					onClick={() => decreaseQuantity(item)}
				/>
			</Col>
			<Col className='item' span={4}>
				{item.category}
			</Col>
			<Col className='item' span={4}>
				{item.price}/$
			</Col>
			<Col className='item' span={4}>
				<Button onClick={() => addToCart()}>Add to Cart</Button>
			</Col>
		</Row>
	);
}

export default Item;
