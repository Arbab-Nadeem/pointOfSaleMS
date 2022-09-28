import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, message, Row } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import '../resources/authentication.css';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onFinish = (values) => {
		dispatch({ type: 'SHOW_LOADING' });
		axios.post('/api/users/login', values)
			.then((response) => {
				dispatch({ type: 'HIDE_LOADING' });
				message.success('Login Successfully');
				localStorage.setItem(
					'pos-user',
					JSON.stringify(response.data)
				);
				navigate('/home');
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
						<h4>Login</h4>

						<Form.Item name='userId' label='User ID'>
							<Input />
						</Form.Item>
						<Form.Item name='password' label='Password'>
							<Input type='password' />
						</Form.Item>

						<div className='d-flex justify-content-between'>
							<p>
								Not a member ? click here to{' '}
								<Link to='/signup'>Register</Link>
							</p>
							<Button htmlType='submit' type='primary'>
								Login
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</div>
	);
}

export default Login;
