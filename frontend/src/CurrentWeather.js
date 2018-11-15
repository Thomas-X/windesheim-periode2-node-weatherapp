import React, {Component} from 'react';
import axios from 'axios';

class CurrentWeather extends Component {
	state = {
		loaded: null,
		data: null,
		currentMonth: null,
		currentYear: null,
		historyData: null,
		historyDataLoaded: null,
		months: [
			{
				name: 'january',
				count: '01'
			},
			{
				name: 'february',
				count: '02',
			},
			{
				name: 'march',
				count: '03'
			},
			{
				name: 'april',
				count: '04'
			},
			{
				name: 'may',
				count: '05'
			},
			{
				name: 'june',
				count: '06'
			},
			{
				name: 'july',
				count: '07'
			},
			{
				name: 'august',
				count: '08'
			},
			{
				name: 'september',
				count: '09'
			},
			{
				name: 'october',
				count: '10'
			},
			{
				name: 'november',
				count: '11'
			},
			{
				name: 'december',
				count: '12'
			}
		],
		years: [],
	};

	constructor(props) {
		super(props);
		const arr = [];
		for (let i = 1900; i < (new Date()).getFullYear() + 1;i++) {
			arr.push(i);
		}
		this.state.years = arr.slice(0);
	}

	getData = async () => {
		const {country, city} = this.props;
		const data = (await axios.get(`http://localhost:3000/api/v1/current/${country.code.toLowerCase()}/${city.toLowerCase()}`)).data;
		this.setState({
			data,
			loaded: true,
		});
	};

	// could use componentDidUpdate here and compare state but this is easier
	checkIfShouldUpdate = async () => {
		const {currentYear, currentMonth} = this.state;
		const {city, country} = this.props;
		if (currentMonth && currentYear) {
			this.setState({
				historyDataLoaded: 'loading'
			});
			const data = (await axios.get(`http://localhost:3000/api/v1/history/${country.code.toLowerCase()}/${city.toLowerCase()}/${currentYear}/${currentMonth}`)).data;
			this.setState({
				historyData: data,
				historyDataLoaded: 'loaded',
			})
		}
	}

	onYearChange = (e) => {
		this.setState({
			currentYear: e.target.value
		}, () => {
			this.checkIfShouldUpdate();
		});
	};

	onMonthChange = (e) => {
		this.setState({
			currentMonth: e.target.value
		}, () => {
			this.checkIfShouldUpdate();
		});
	};

	componentDidMount() {
		this.getData()
			.then(() => console.log('mounted!'));
	}

	render() {
		const {city, country} = this.props;
		const {loaded, data, currentMonth, currentYear, years, months, historyData, historyDataLoaded} = this.state;

		if (!loaded) {
			return 'loading..';
		}

		return (
			<div className={'card'}>
				<div className="card-body">
					<h1 className="display-3">
						{data.avgTemperature}&deg; in {country.country.name}, {city}
					</h1>
					<h5 className="text-muted">
						<i>
							Low: {data.minTemperature}
							<br/>
							High: {data.maxTemperature}
						</i>
					</h5>

					<br/>

					<h1>
						Stats
					</h1>
					<div className="row">

						<div className="col-sm-12 col-md-6">
							<label>Year</label>
							<select className={'form-control'} onChange={e => this.onYearChange(e)}>
								<option disabled selected> -- select an option --</option>
								{years.map((val, idx) => (
									<option key={idx} value={val}>{val}</option>
								))}
							</select>
						</div>
						<div className="col-sm-12 col-md-6">
							<label>Month</label>
							<select className={'form-control'} onChange={e => this.onMonthChange(e)}>
								<option disabled selected> -- select an option --</option>
								{months.map((val, idx) => (
									<option key={idx} value={val.count}>{val.name}</option>
								))}
							</select>
						</div>
					</div>
					<br/>
					{historyDataLoaded === 'loading' && <h4>loading..</h4>}
					{(!!historyData && historyDataLoaded === 'loaded') && (
						<table className="table">
							<thead className="thead-dark">
							<tr>
								<th scope="col">Minimum</th>
								<th scope="col">Average</th>
								<th scope="col">Maximum</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>{historyData.min}</td>
								<td>{historyData.avg}</td>
								<td>{historyData.max}</td>
							</tr>
							</tbody>
						</table>
					)}

				</div>
			</div>
		);
	}
}

export default CurrentWeather;