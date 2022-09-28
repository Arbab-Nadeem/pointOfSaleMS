import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import CartPage from './pages/CartPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Billls from './pages/Billls';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';

/* *********** Imports ************ */

/* *********** Components ************ */

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/home'
						element={
							<ProtectedRoute>
								<Homepage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/items'
						element={
							<ProtectedRoute>
								<Items />{' '}
							</ProtectedRoute>
						}
					/>
					<Route
						path='/bills'
						element={
							<ProtectedRoute>
								<Billls />{' '}
							</ProtectedRoute>
						}
					/>
					<Route
						path='/customers'
						element={
							<ProtectedRoute>
								<Customers />{' '}
							</ProtectedRoute>
						}
					/>
					<Route
						path='/cart'
						element={
							<ProtectedRoute>
								<CartPage />{' '}
							</ProtectedRoute>
						}
					/>
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

export const ProtectedRoute = ({ children }) => {
	if (localStorage.getItem('pos-user')) {
		return children;
	} else {
		return <Navigate to='/login' />;
	}
};
