const Controls = ({
	handleSearch,
	setSearch,
	setSortBy,
	setContinent,
	switchTheme,
	search
}) => {
	return (
		<div className="controls">
			<form className="search-country" onSubmit={handleSearch}>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search for a country"
					required
				/>
				<button className="search-btn">
					Search
				</button>
			</form>

			<div className="sorting">
				<span>Sort By:</span>
				<select name="sort" className="sort-options" onChange={(e) => setSortBy(e.target.value)}>
					<option value="none">Not sorted</option>
					<option value="name">Name</option>
					<option value="population">Population</option>
					<option value="area">Area</option>
				</select>
			</div>

			<div className="continents">
				<span>Continents:</span>
				<select name="filter" className="continent" onChange={(e) => setContinent(e.target.value)}>
					<option value="">All</option>
					<option value="asia">Asia</option>
					<option value="africa">Africa</option>
					<option value="americas">America</option>
					<option value="europe">Europe</option>
					<option value="oceania">Oceania</option>
					<option value="antarctic">Antarctic</option>
				</select>
			</div>

			<div className='dark-mode-switch'>
				Switch theme
				<label className='switch'>
				<input type='checkbox' />
				<span className='slider round' onClick={switchTheme}></span>
				</label>
			</div>
		</div>
	);
};

export default Controls;