import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import {
	DeleteOutlined,
	PlusCircleOutlined,
	MinusCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/items.css';
import { useNavigate } from 'react-router-dom';

/* *********** Imports ************ */

/* *********** Cart Page ************ */

function CartPage() {
	const navigate = useNavigate();
	const { cartItems } = useSelector((state) => state.rootReducer);
	const [billChargeModal, setBillChargeModal] = useState(false);

	const dispatch = useDispatch();
	const [subTotal, setSubTotal] = useState(0);

	const increaseQuantity = (record) => {
		dispatch({
			type: 'UPDATE_CART',
			payload: { ...record, quantity: record.quantity + 1 },
		});
	};

	const decreaseQuantity = (record) => {
		if (record.quantity !== 1) {
			dispatch({
				type: 'UPDATE_CART',
				payload: { ...record, quantity: record.quantity - 1 },
			});
		}
	};

	const deleteItem = (record) => {
		dispatch({ type: 'DELETE_ITEM', payload: record });
	};
	const columns = [
		{
			title: 'Item',
			dataIndex: 'item',
		},
		{
			title: 'Quantity',
			dataIndex: '_id',
			render: (id, record) => (
				<div>
					<PlusCircleOutlined
						className='mx-2'
						onClick={() => increaseQuantity(record)}
					/>
					{record.quantity}
					<MinusCircleOutlined
						className='mx-2'
						onClick={() => decreaseQuantity(record)}
					/>
				</div>
			),
		},
		{
			title: 'Category',
			dataIndex: 'category',
		},
		{
			title: 'Price',
			dataIndex: 'price',
		},
		{
			title: 'Actions',
			dataIndex: '_id',
			render: (id, record) => (
				<DeleteOutlined onClick={() => deleteItem(record)} />
			),
		},
	];
	useEffect(() => {
		let temp = 0;
		cartItems.forEach((item) => {
			temp = temp + item.price * item.quantity;
		});
		setSubTotal(temp);
	}, [cartItems]);
	const onFinish = (values) => {
		const sendData = {
			...values,
			subTotal,
			cartItems,
			tax: Number(((subTotal / 100) * 10).toFixed(2)),
			totalAmount: Number(
				subTotal + Number(((subTotal / 100) * 10).toFixed(2))
			),
			userId: JSON.parse(localStorage.getItem('pos-user'))._id,
		};

		/* ######### Charge Bill ########## */
		axios.post('/api/bills/charge-bill', sendData)
			.then(() => {
				dispatch({
					type: 'HIDE_LOADING',
				});
				message.success('Bill charged successfully');
				setBillChargeModal(false);
				navigate('/bills');
			})
			.catch((error) => {
				dispatch({
					type: 'HIDE_LOADING',
				});
				message.error('Something went wrong');
			});
	};

	return (
		<DefaultLayout>
			<h3>Cart</h3>

			<Table columns={columns} dataSource={cartItems} bordered />
			<div className='dashed-bordered my-3'></div>
			<div className='d-flex justify-content-end flex-column align-items-end'>
				<div className='subtotal'>
					<h3>
						<b>Total Amount :</b> {subTotal} $/-
					</h3>
				</div>
				<Button
					type='primary'
					className='my-4'
					onClick={() => {
						setBillChargeModal(true);
					}}
				>
					CHARGE
				</Button>
			</div>

			<Modal
				title='Charge Bill'
				open={billChargeModal}
				footer={false}
				onCancel={() => setBillChargeModal(false)}
			>
				<Form layout='vertical' onFinish={onFinish}>
					<Form.Item name='customerName' label='Customer Name'>
						<Input />
					</Form.Item>

					<Form.Item
						name='customerPhoneNumber'
						label='Phone Number'
					>
						<Input />
					</Form.Item>
					<Form.Item name='paymentMode' label='Payment Mode'>
						<Select>
							<Select.Option value='cash'>
								Cash
							</Select.Option>
							<Select.Option value='card'>
								Card
							</Select.Option>
						</Select>
					</Form.Item>
					<div className='bill-details'>
						<h5>SubTotal: {subTotal}</h5>
						<h5>
							Tax Charges:{' '}
							{((subTotal / 100) * 10).toFixed(2)}
						</h5>
						<h3>
							Total Amount{' '}
							<b>{subTotal + (subTotal / 100) * 10}</b>{' '}
						</h3>
					</div>
					<div className='d-flex justify-content-end'>
						<Button htmlType='submit' type='primary'>
							GENERATE BILL
						</Button>
					</div>
				</Form>
			</Modal>
		</DefaultLayout>
	);
}

export default CartPage;
