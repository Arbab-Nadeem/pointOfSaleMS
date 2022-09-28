/* *********** Imports ************ */
import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import '../resources/items.css';
import '../resources/layout.css';
import { useDispatch } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import { Table, Button, Modal, message } from 'antd';

/* *********** Imports ************ */

/* *********** Bills Page ************ */

function Bills() {
	/* ######### Default Values Setup ########## */
	const componentRef = useRef();

	const [billsData, setBillsData] = useState([]);
	const [billModalPopUp, setBillModalPopUp] = useState(false);
	const [selectedBill, setSelectedBill] = useState(null);
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
			title: 'ID',
			dataIndex: '_id',
		},
		{
			title: 'Customer',
			dataIndex: 'customerName',
		},

		{
			title: 'SubTotal',
			dataIndex: 'subTotal',
		},
		{
			title: 'Tax',
			dataIndex: 'tax',
		},
		{
			title: 'Total Amount',
			dataIndex: 'totalAmount',
		},
		{
			title: 'Actions',
			dataIndex: '_id',
			render: (id, record) => (
				<div className='d-flex'>
					<EyeOutlined
						className='mx-2'
						onClick={() => {
							setSelectedBill(record);
							setBillModalPopUp(true);
						}}
					/>
				</div>
			),
		},
	];
	const cartColumns = [
		{
			title: 'Item',
			dataIndex: 'item',
		},
		{
			title: 'Price',
			dataIndex: 'price',
		},
		{
			title: 'Quantity',
			dataIndex: '_id',
			render: (id, record) => <div>{record.quantity}</div>,
		},
		{
			title: 'Total Fare',
			dataIndex: '_id',
			render: (id, record) => (
				<div>{record.quantity * record.price}</div>
			),
		},
	];
	useEffect(() => {
		getAllBills();
	}, []);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	/* ######### Render Component ########## */

	return (
		<DefaultLayout>
			<div className='d-flex justify-content-between'>
				<h3>Bills</h3>
			</div>
			<Table columns={columns} dataSource={billsData} bordered />

			{/* ######### Modal Layout ########## */}

			{billModalPopUp && (
				<Modal
					onCancel={() => {
						setBillModalPopUp(false);
					}}
					open={billModalPopUp}
					title='Bill Detail'
					footer={false}
					width={800}
				>
					{/* ######### Bill Modal ########## */}
					<div className='bill-modal p-2' ref={componentRef}>
						<div className='d-flex justify-content-between bill-header '>
							<div>
								<h2>
									<span className='first-part'>
										K
									</span>
									~
									<span className='last-part'>
										Mart
									</span>
								</h2>
							</div>
							<div className='d-flex align-items-center'>
								<p>
									<b>ID</b> {selectedBill._id}
								</p>
							</div>
						</div>

						<div className='bill-customer-details my-3'>
							<p>
								<b>Name: </b>
								{selectedBill.customerName}
							</p>
							<p>
								<b>Phone#</b>{' '}
								{selectedBill.customerPhoneNumber}
							</p>
							<p>
								<b>Date: </b>
								{selectedBill.createdAt
									.toString()
									.substring(0, 10)}
							</p>
						</div>
						<Table
							dataSource={selectedBill.cartItems}
							columns={cartColumns}
							pagination={false}
						/>

						<div className='dashed-bordered my-3 py-2'>
							<p>
								<b>SubTotal: </b>
								{selectedBill.subTotal}
							</p>
							<p>
								<b>Tax: </b>
								{selectedBill.tax}
							</p>
						</div>
						<div className='my-3'>
							<h4>
								Grand Total: {selectedBill.totalAmount}
							</h4>
						</div>

						<div className='text-center'>
							<p>Thanks for Purchasings</p>
							<p>
								Visit Again{' '}
								<span className='first-part'>K</span>~
								<span className='last-part'>Mart</span>
							</p>
						</div>
					</div>

					<div className='d-flex justify-content-end'>
						<Button type='primary' onClick={handlePrint}>
							Print Bill
						</Button>
					</div>
				</Modal>
			)}
		</DefaultLayout>
	);
}

export default Bills;
