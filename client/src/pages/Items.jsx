/* *********** Imports ************ */
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import '../resources/items.css';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

/* *********** Imports ************ */

/* *********** Items Page ************ */

function Items() {
	/* ######### Default Values Setup ########## */

	const [itemsData, setItemsData] = useState([]);
	const [addEditModalVisibility, setAddEditModalVisibility] =
		useState(false);
	const [editingItem, setEditingItem] = useState(null);
	const dispatch = useDispatch();

	/* ######### Get ALl Items ########## */

	const getAllItems = () => {
		dispatch({
			type: 'SHOW_LOADING',
		});
		axios.get('/api/items/get-all-items')
			.then((response) => {
				dispatch({
					type: 'HIDE_LOADING',
				});
				setItemsData(response.data);
			})
			.catch((error) => {
				dispatch({
					type: 'HIDE_LOADING',
				});
				console.log(error);
			});
	};

	/* ######### Delete Item ########## */

	const deleteItem = (record) => {
		dispatch({
			type: 'SHOW_LOADING',
		});
		axios.post('/api/items/delete-item', { itemId: record._id })
			.then(() => {
				dispatch({
					type: 'HIDE_LOADING',
				});
				message.success('Item Deleted Successfully');
				getAllItems();
			})
			.catch((error) => {
				dispatch({
					type: 'HIDE_LOADING',
				});
				message.error('something went wrong');
				console.log(error);
			});
	};

	/* ######### Columns Layout ########## */

	const columns = [
		{
			title: 'Item',
			dataIndex: 'item',
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
				<div className='d-flex'>
					<EditOutlined
						className='mx-2'
						onClick={() => {
							setEditingItem(record);
							setAddEditModalVisibility(true);
						}}
					/>
					<DeleteOutlined
						className='mx-2'
						onClick={() => deleteItem(record)}
					/>
				</div>
			),
		},
	];
	useEffect(() => {
		getAllItems();
	}, []);

	const onFinish = (values) => {
		dispatch({
			type: 'SHOW_LOADING',
		});

		/* ######### Add Item Block ########## */

		if (editingItem === null) {
			axios.post('/api/items/add-item', values)
				.then(() => {
					dispatch({
						type: 'HIDE_LOADING',
					});
					message.success('Item Added successfully');
					setAddEditModalVisibility(false);
					getAllItems();
				})
				.catch((error) => {
					dispatch({
						type: 'HIDE_LOADING',
					});
					message.error('Something went wrong');
					console.log(error);
				});
		} else {
			/* ######### Edit Item Block ########## */

			axios.post('/api/items/edit-item', {
				...values,
				itemId: editingItem._id,
			})
				.then(() => {
					dispatch({
						type: 'HIDE_LOADING',
					});
					message.success('Item Edited successfully');
					setEditingItem(null);
					setAddEditModalVisibility(false);
					getAllItems();
				})
				.catch((error) => {
					dispatch({
						type: 'HIDE_LOADING',
					});
					message.error('Something went wrong');
					console.log(error);
				});
		}
	};

	/* ######### Render Component ########## */

	return (
		<DefaultLayout>
			<div className='d-flex justify-content-between'>
				<h3>Items</h3>
				<Button
					type='primary'
					onClick={() => setAddEditModalVisibility(true)}
				>
					Add Item
				</Button>
			</div>
			<Table columns={columns} dataSource={itemsData} bordered />

			{/* ######### Modal Layout ########## */}

			{addEditModalVisibility && (
				<Modal
					onCancel={() => {
						setEditingItem(null);
						setAddEditModalVisibility(false);
					}}
					open={addEditModalVisibility}
					title={`${
						editingItem !== null
							? 'Edit Item'
							: 'Add New Item'
					}`}
					footer={false}
				>
					{/* ######### Input Output ########## */}

					<Form
						initialValues={editingItem}
						layout='vertical'
						onFinish={onFinish}
					>
						<Form.Item name='item' label='Item'>
							<Input />
						</Form.Item>
						<Form.Item name='quantity' label='Quantity'>
							<Input />
						</Form.Item>
						<Form.Item name='price' label='Price'>
							<Input />
						</Form.Item>
						<Form.Item name='category' label='Category'>
							<Select>
								<Select.Option value='Personal Care'>
									Personal Care
								</Select.Option>
								<Select.Option value='Condiments & Spices'>
									Condiments & Spices
								</Select.Option>
								<Select.Option value='Baking'>
									Baking
								</Select.Option>
								<Select.Option value='Meat'>
									Meat
								</Select.Option>
								<Select.Option value='Cereal'>
									Cereal
								</Select.Option>
								<Select.Option value='Vegetables'>
									Vegetables
								</Select.Option>
								<Select.Option value='Fruits'>
									Fruits
								</Select.Option>
								<Select.Option value='Household Supplies'>
									Household Supplies
								</Select.Option>
								<Select.Option value='Sauces & Oils'>
									Sauces & Oils
								</Select.Option>
							</Select>
						</Form.Item>
						<div className='d-flex justify-content-end'>
							<Button htmlType='submit' type='primary'>
								Save
							</Button>
						</div>
					</Form>
				</Modal>
			)}
		</DefaultLayout>
	);
}

export default Items;
