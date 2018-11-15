import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import CurrentWeather from "./CurrentWeather";


class App extends Component {
	state = {
		selectedCountry: {
			country: {
				name: 'none'
			}
		},
		selectedCity: 'none',
		data: {
			countries: []
		}
	}

	getData = async () => {
		const countries = (await axios.get('/api/v1/countries-cities')).data;

		this.setState({
			data: {
				countries
			},
		})
	};

	onCountryChange = (e) => {
		this.setState({
			selectedCountry: {
				country: _.omit((this.state.data.countries.filter(((value, index) => !!value && value.code === e.target.value)))[0], ['code']),
				code: e.target.value,
			},
			selectedCity: 'none',
		})
	};

	onCityChange = (e) => {
		this.setState({
			selectedCity: e.target.value
		});
	};

	componentDidMount() {
		this.getData()
			.then(() => console.log('data set!'))
			.catch(err => console.error(err))
	}

	render() {
		const {countries} = this.state.data;
		const {selectedCountry, selectedCity} = this.state;
		return (
			<div className={'container'}>
				<div className="jumbotron">
					<h1 className="display-4">
						Weather App
					</h1>
					<p>
						Only the country / city combination of: Netherlands, Amsterdam. Has been tested
					</p>
				</div>
				<label>
					Country selector
				</label>
				<br/>
				<select className={'form-control'} onChange={(e) => this.onCountryChange(e)}>
					<option disabled selected> -- select an option --</option>
					{countries.map((val, idx) => !!val ? (
						<option key={idx} value={val.code}>
							{val.name}
						</option>
					) : null)}
				</select>

				{/*{(!!selectedCountry && selectedCountry.country.name !== 'none') && <>*/}
					{/*<h1>{selectedCountry.country.name}</h1> </>}*/}

				<br/>
				{(!!selectedCountry.country.cities && selectedCountry.country.cities.length > 0) && (
					<>
						<label>
							City selector
						</label>
						<select value={selectedCity} className={'form-control'} onChange={(e) => this.onCityChange(e)}>
							<option value={'none'} disabled selected> -- select an option --</option>
							{selectedCountry.country.cities.map((city, idx) => (
								<option key={idx} value={city}>
									{city}
								</option>
							))}
						</select>
					</>
				)}

				<br/>
				<br/>

				{(selectedCity !== 'none') && <CurrentWeather city={selectedCity} country={selectedCountry}/>}

			</div>
		);
	}
}

export default App;
