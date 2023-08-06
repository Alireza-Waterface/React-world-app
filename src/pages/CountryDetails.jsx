import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CountryDetails = (props) => {
	const { cca3 } = useParams();
	const [country, setCountry] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchCountryDetails();
	}, [cca3]);

	const fetchCountryDetails = async () => {
		try {
			const response = await axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`);
			setCountry(response.data[0]);
		} catch (error) {
			console.error('Error fetching country details: ', error);
		}
	};

	useEffect(() => {
		const handleBackButton = (e) => {
			e.preventDefault();
			navigate('/');
		};
	
		window.addEventListener('popstate', handleBackButton);
	
		return () => {
		  	window.removeEventListener('popstate', handleBackButton);
		};
	}, [navigate]);

	return (
		<>
			{country ? (
				<>
					<h2 className="details_name">{country.name.official}</h2>
					<div className='details'>
						<div className="details_flag">
							<img src={country.flags.png} alt={`${country.name.common}'s flag`} />
						</div>
						<div className="details_content">
							<p className='capital_details'>Capital: {country.capital}</p>
							<p className='population_details'>Population: {props.formatNumber(country.population)}</p>
							<p className="region_details">Region: {country.region}</p>
							<p className="subregion_details">Sub region: {country.subregion}</p>
							<p className="area_details">Area: {props.formatNumber(country.area)} Km<sup>2</sup></p>
							<ul className="timezones">Time zones: {country.timezones.map((zone) => (
								<li className="zone">{zone}</li>
							))}
							</ul>
							<ul className="currencies_details">Currencies: {Object.entries(country?.currencies || {}).map(([currencyCode, currencyInfo]) => (
								<li key={currencyCode} className='currency-content'>
									<strong>{currencyCode}:</strong> {currencyInfo.name} '{currencyInfo.symbol}' <br />
								</li>
							))}
							</ul>
							<ul className="currencies_details">Languages: {Object.entries(country?.languages || {}).map(([langCode, language]) => (
								<li key={langCode} className='currency-content'>
									<strong>{langCode}:</strong> '{language}'
								</li>
							))}
							</ul>
							{
								country.unMember &&
								<img className='un-badge' src="https://upload.wikimedia.org/wikipedia/commons/e/ee/UN_emblem_blue.svg" alt="United Nations badge" />
							}
						</div>
					</div>
				</>
			) : (
				<p className='loading'>Loading...</p>
			)}
		</>
	);
};

export default CountryDetails;
