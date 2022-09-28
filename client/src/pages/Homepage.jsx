import { Col, Row, Empty, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import Item from '../components/Item';
import Header from '../components/Header';
import '../resources/items.css';
import { useDispatch } from 'react-redux';

const { Option } = Select;

/* *********** Imports ************ */

/* *********** Home Page ************ */

function Homepage() {
	const [itemsData, setItemsData] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('Cereal');

	const dispatch = useDispatch();

	const getAllItems = () => {
		// dispatch({
		// 	type: 'SHOW_LOADING',
		// });

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

	useEffect(() => {
		getAllItems();
	}, [itemsData]);

	return (
		<DefaultLayout>
			<div className='d-flex justify-content-between align-items-center p-2 header-container'>
				<h2>Grocery Store</h2>

				<Select
					// defaultValue='cereal'
					value={selectedCategory}
					className='select-category'
					allowClear
					onChange={(value) => setSelectedCategory(value)}
				>
					<Option value='fruits'>Fruits</Option>
					<Option value='meat'>Meat</Option>
					<Option value='baking'>Baking</Option>
					<Option value='cereal'>Cereal</Option>
					<Option value='vegetables'>Vegetables</Option>
					<Option value='household supplies'>
						Household Supplies
					</Option>
					<Option value='condiments & spices'>
						Condiments & Spices
					</Option>
					<Option value='personal care'>Personal Care</Option>
				</Select>
			</div>
			{itemsData.length > 0 ? (
				<Header />
			) : (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			)}
			{/* .filter((item) => item.category === selectedCategory) */}
			<Row>
				{itemsData.map((item) => {
					return (
						<Col span={24}>
							<Item item={item} />
						</Col>
					);
				})}
			</Row>
		</DefaultLayout>
	);
}

export default Homepage;
