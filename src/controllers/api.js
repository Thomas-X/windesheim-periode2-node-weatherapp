import {Router} from 'express';
import cheerio from 'cheerio';
import axios from 'axios';
import convert from 'convert-units';
import path from 'path';
import puppeteer from 'puppeteer';
import fs from 'fs';

/*
* [X] Cities and countries
* [X] Current temps per city/country
* [X] Historical temps for city/country
* */

const Api = Router();
const scrape_url = `https://www.wunderground.com/weather/`;

const number_rounder = (num) => isNaN(Number(num)) ? 'Not available :(' : parseFloat(num).toFixed(1);

Api.get('/countries-cities', async (req, res) => {
	const countries = JSON.parse(fs.readFileSync('countries-cities.json', 'utf8'));
	res.json(countries);
});


Api.get('/current/:country/:city', async (req, res) => {
	const {country, city} = req.params;
	if (!country || !city) {
		return res.sendStatus(422);
	}
	const uri = `${scrape_url}${encodeURI(country)}/${encodeURI(city)}`;
	const html = (await axios.get(uri)).data;
	const $ = cheerio.load(html);
	const avgTemperature = number_rounder(convert($('div.current-temp .wu-value.wu-value-to').text())
		.from('F')
		.to('C'))
	const minTemperature = number_rounder($('div.condition-data .hi-lo .lo')
		.text()
		.slice(0, -1));
	const maxTemperature = number_rounder($('div.condition-data .hi-lo .hi')
		.text()
		.slice(0, -1));

	const responseObject = {
		avgTemperature,
		minTemperature: minTemperature > -300 ? number_rounder(convert(minTemperature).from('F').to('C')) : minTemperature,
		maxTemperature: maxTemperature > -300 ? number_rounder(convert(maxTemperature).from('F').to('C')) : maxTemperature
	};
	res.json(responseObject);
});

Api.get('/history/:country/:city/:year/:month', async (req, res) => {
	const { country, city, year, month } = req.params;
	if (!country || !city || !year || !month) {
		return res.sendStatus(422);
	}

	// We have to use a browser since the data is retrieved via an xhr request
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(`https://www.wunderground.com/history/monthly/${country}/${city}/EHAM/date/${year}-${month}`, {
		waitUntil: 'networkidle2'
	});

	const result = await page.evaluate(() => {
		const avgMax = document.querySelector('#inner-content > div.city-body > div.row.city-history-summary > div > div:nth-child(1) > div > div > city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)');
		const avgAvg = document.querySelector('#inner-content > div.city-body > div.row.city-history-summary > div > div:nth-child(1) > div > div > city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(3)');
		const avgMin = document.querySelector('#inner-content > div.city-body > div.row.city-history-summary > div > div:nth-child(1) > div > div > city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(4)');

		return {
			max: !!avgMax ? avgMax.innerHTML : '--',
			min: !!avgMin ? avgMin.innerHTML : '--',
			avg: !!avgAvg ? avgMin.innerHTML : '--',
		};
	});

	browser.close();

	for (const key in result) {
		result[key] = number_rounder(convert(result[key]).from('F').to('C'));
	}
	res.json(result);
});

export default Api;