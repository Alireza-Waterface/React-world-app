import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountryCard from "../components/CountryCard";
import Controls from "../components/Controls";

const Home = (props) => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState('');
	const [back, setBack] = useState(false);
	const [sortBy, setSortBy] = useState('');
	const [continent, setContinent] = useState('');
	const [originalCountries, setOriginalCountries] = useState([]);
	const [continentPopulation, setContinentPopulation] = useState(0);
  	const [numCountriesInContinent, setNumCountriesInContinent] = useState(0);
	  
	const fetchContries = async () => {
		try {
			const response = await axios.get('https://restcountries.com/v3.1/all');
			setCountries(response.data);
			setOriginalCountries(response.data);
		} catch (error) {
			console.error('Error fetching data: ', error);
		}
		setBack(false);
	};
	
	useEffect(() => {
		fetchContries();
	}, [])

	const handleSearch = (e) => {
		e.preventDefault();

		const filteredCountries = countries.filter((country) => {
			return country.name.common.toLowerCase().includes(search.toLowerCase());
		});
		setCountries(filteredCountries);

		setSearch('');
		setBack(true);
	};

	const sort = () => {
		const sortedCountries = [...countries];
	
		if (sortBy === 'name') {
			sortedCountries.sort((a, b) => {
				return a.name.common.localeCompare(b.name.common);
			})
			setCountries(sortedCountries);
		} else if (sortBy === 'population') {
			sortedCountries.sort((a, b) => {					
				return b.population - a.population;
			})
			setCountries(sortedCountries);
		} else if (sortBy === 'area') {
			sortedCountries.sort((a, b) => {
				return b.area - a.area;
			})
			setCountries(sortedCountries);
		}
		else {
			fetchContries();
		}
	};
	
	useEffect(() => {
		sort();
	}, [sortBy]);

	const filter = () => {
		let filteredCountries = [...originalCountries];

		switch (continent) {
			case 'asia':
				filteredCountries = originalCountries.filter((country) => country.region === 'Asia');
				setCountries(filteredCountries);
				break;
			case 'africa':
				filteredCountries = originalCountries.filter((country) => country.region === 'Africa');
				setCountries(filteredCountries);
				break;
			case 'americas':
				filteredCountries = originalCountries.filter((country) => country.region === 'Americas');
				setCountries(filteredCountries);
				break;
			case 'europe':
				filteredCountries = originalCountries.filter((country) => country.region === 'Europe');
				setCountries(filteredCountries);
				break;
			case 'oceania':
				filteredCountries = originalCountries.filter((country) => country.region === 'Oceania');
				setCountries(filteredCountries);
				break;
			case 'antarctic':
				filteredCountries = originalCountries.filter((country) => country.region === 'Antarctic');
				setCountries(filteredCountries);
				break;
			default:
				setCountries(originalCountries);
		}

		const sortedCountries = [...filteredCountries];
	
		if (sortBy === 'name') {
			sortedCountries.sort((a, b) => {
				return a.name.common.localeCompare(b.name.common);
			})
			setCountries(sortedCountries);
		} else if (sortBy === 'population') {
			sortedCountries.sort((a, b) => {					
				return b.population - a.population;
			})
			setCountries(sortedCountries);
		} else if (sortBy === 'area') {
			sortedCountries.sort((a, b) => {
				return b.area - a.area;
			})
			setCountries(sortedCountries);
		}
	};

	useEffect(() => {
		filter();
	}, [continent, originalCountries, sortBy]);

	const calculateContinentData = () => {
		let totalPopulation = 0;
		let numCountries = 0;
	
		if (continent) {
			const filteredCountries = originalCountries.filter((country) => country.region.toLowerCase() === continent);
		
			totalPopulation = filteredCountries.reduce((sum, country) => sum + country.population, 0);
			numCountries = filteredCountries.length;
		} else {
			totalPopulation = originalCountries.reduce((sum, country) => sum + country.population, 0);
			numCountries = originalCountries.length;
		}
	
		setContinentPopulation(totalPopulation);
		setNumCountriesInContinent(numCountries);
	};
	
	useEffect(() => {
		calculateContinentData();
	}, [continent, originalCountries]);

	return (
		<>
			<h1 className="title">The World</h1>

			<Controls
				handleSearch={handleSearch}
				setSearch={setSearch}
				setSortBy={setSortBy}
				setContinent={setContinent}
				switchTheme={props.switchTheme}
				search={search}
			/>
			
			<div className="continent-info">
				{
					continent !== '' ? (
						<>
							<p style={{textTransform: 'capitalize'}}>Selected Continent: {continent}</p>
							<p>Total Population: {props.formatNumber(continentPopulation)}</p>
							<p>Number of Countries: {numCountriesInContinent}</p>
						</>
					) : (
						<>
							<p>World Population: {props.formatNumber(continentPopulation)}</p>
							<p>Number of Countries: {numCountriesInContinent}</p>
						</>
					)
				}
			</div>
			
			<div className="countries">
				{
					countries.length === 0 ?
						back ?
							<p className="not-found">Not found</p>
						:
							<p className="loading">Loading...</p>
					:
						countries.map((country) => (
							<Link
								to={`/countries/${country.cca3}`}
								key={`${country.ccn3}`}
								className="country"
							>
								<CountryCard
									flag={country.flags.png}
									name={country.name.common}
									formatNumber={props.formatNumber}
									population={country.population}
									capital={country.capital}
								/>
							</Link>						
						))
				}
			</div>
			{ back && <button className="back-btn" onClick={ () => fetchContries() }>Back</button> }
		</>
	);
};

export default Home;
