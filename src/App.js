import React from 'react';
import './App.css';
import CountryDetails from './pages/CountryDetails';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

const App = () => {
	const [theme, setTheme] = useLocalStorage('theme', 'light');

	const switchTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
	}

	const formatNumber = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<div className='app' data-theme={theme}>
			<Routes>
				<Route
					path='/'
					element={
						<Home
							formatNumber={formatNumber}
							switchTheme={switchTheme}
						/>
					}
				/>
				<Route
					path='/countries/:cca3'
					element={
						<CountryDetails
							formatNumber={formatNumber}
							switchTheme={switchTheme}
						/>
					}
				/>
				<Route
					path='*'
					element={
						<h1>Error 404 <br/> Page not found</h1>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;