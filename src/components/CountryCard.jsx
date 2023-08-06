const CountryCard = (props) => {
	return (
		<>
			<img src={props.flag} alt={`${props.name}'s flag`} className="country-flag" loading="lazy"/>
			<div>
				<h3 className="country-name">{props.name}</h3>
				<p className="country-population">Population: {props.formatNumber(props.population)}</p>
			</div>
			<p className="country-capital">Capital: {props.capital}</p>
		</>
	);
};

export default CountryCard;