import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, message, Row } from 'antd';
import '../resources/authentication.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
/* *********** Imports ************ */

/* *********** Register Page ************ */

function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onFinish = (values) => {
		dispatch({ type: 'SHOW_LOADING' });
		axios.post('/api/users/signup', values)
			.then(() => {
				dispatch({ type: 'HIDE_LOADING' });
				message.success(
					'Registered successfully, kindly wait until  verification'
				);
			})
			.catch((err) => {
				dispatch({ type: 'HIDE_LOADING' });
				message.error('Something went wrong', err);
			});
	};

	useEffect(() => {
		if (localStorage.getItem('pos-user')) {
			navigate('/home');
		}
	}, []);

	return (
		<div className='authentication'>
			<Row>
				<Col lg={8} xs={22}>
					<Form layout='vertical' onFinish={onFinish}>
						<h2>POS System</h2>
						<hr />
						<h4>Register</h4>
						<Form.Item name='name' label='Name'>
							<Input />
						</Form.Item>
						<Form.Item name='userId' label='User ID'>
							<Input />
						</Form.Item>
						<Form.Item name='password' label='Password'>
							<Input type='password' />
						</Form.Item>

						<div className='d-flex justify-content-between align-items-center'>
							<p>
								Already registered ? click here to{' '}
								<Link to='/login'>Login</Link>
							</p>
							<Button htmlType='submit' type='primary'>
								Register Now
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</div>
	);
}

export default Signup;
