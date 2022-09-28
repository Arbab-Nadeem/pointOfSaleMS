/* *********** Imports ************ */
import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import '../resources/items.css';
import '../resources/layout.css';
import { useDispatch } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import { Table, Button, Modal, message } from 'antd';

/* *********** Imports ************ */

/* *********** Customer Page ************ */

function Customers() {
	/* ######### Default Values Setup ########## */

	const [billsData, setBillsData] = useState([]);
	const dispatch = useDispatch();

	/* ######### Get ALl Items ########## */

	const getAllBills = () => {
		dispatch({
			type: 'SHOW_LOADING',
		});
		axios.get('/api/bills/get-all-bills')
			.then((response) => {
				dispatch({
					type: 'HIDE_LOADING',
				});
				const data = response.data;
				data.reverse();
				setBillsData(data);
			})
			.catch((error) => {
				dispatch({
					type: 'HIDE_LOADING',
				});
				console.log(error);
			});
	};

	/* ######### Columns Layout ########## */

	const columns = [
		{
			title: 'Customer',
			dataIndex: 'customerName',
		},

		{
			title: 'Phone',
			dataIndex: 'customerPhoneNumber',
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			render: (value) => (
				<span>{value.toString().substring(0, 10)}</span>
			),
		},
		{
			title: 'Total Amount',
			dataIndex: 'totalAmount',
		},
	];

	useEffect(() => {
		getAllBills();
	}, []);

	/* ######### Render Component ########## */

	return (
		<DefaultLayout>
			<div className='d-flex justify-content-between'>
				<h3>Customers</h3>
			</div>
			<Table columns={columns} dataSource={billsData} bordered />
		</DefaultLayout>
	);
}

export default Customers;
