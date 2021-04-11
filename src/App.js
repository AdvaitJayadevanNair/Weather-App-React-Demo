import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import IconButton from './components/IconButton';
import Loader from './components/Loader';

function App() {
	const key = "af09487e0155065ded4c91f22bbad931";
	const unsplashkey = "DkVRmsRH9Ekfw0PwmprKEeXmc7e47xVrw4PkF6efTnE";
	const [zipCode, setZipCode] = useState("");
	const [fahrenheit, setFahrenheit] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [weather, setWeather] = useState();
	const [image, setImage] = useState("");
	
	useEffect(() => fetchWeather(Math.floor(Math.random()*99999)), []);

	useEffect(() => setZipCode(zipCode.replace(/\D/g, "").slice(0,5)), [zipCode]);

	useEffect(fetchImage, [weather]);

	function fetchImage(){
		if(!weather) return;
		fetch(`https://api.unsplash.com/search/photos?client_id=${unsplashkey}&query=${weather.name}&per_page=10`)
		.then(async response => {
			if(!response.ok){
				return setIsLoading(false);
			}
			let data = await response.json();
			let random = Math.floor(Math.random() * data.results.length);
			setImage(data.results[random].urls.full);
		});
		setIsLoading(false);
	}

	function fetchWeather(zipCode){
		setIsLoading(true);
		fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${key}`)
		.then(async response => {
			if(!response.ok){
				return setIsLoading(false); 
			}
			let data = await response.json();
			setWeather({
				zipCode,
				...data
			});
		});
	}

	function getFormatedTime(date){
		let h = date.getHours();
		let m = date.getMinutes();
		let x = h >= 12 ? 'PM' : 'AM';
		h = h % 12;
		h = h ? h : 12;
		m = m < 10 ? `0${m}` : m;
		return `${h}:${m}${x}`;
	}

	function getFormatedDayTime(date){
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return `${days[date.getDay()]} ${getFormatedTime(date)}`;
	}

	function temperature(){
		let temp = weather.main.temp;
		if(!fahrenheit) temp = (temp-32) * 5/9;
		temp = Math.round(temp);

		return <h1 onClick={() => setFahrenheit(!fahrenheit)}>
			{temp}°<span>{fahrenheit ? "F" : "C"}</span>
		</h1>;
	}


	return (
		isLoading ?
			<Loader />
		:
			<div className="App">
				<img src={image} alt={weather.name}/>
				<div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'absolute', top: "25px", left: "25px" }}>
					<Input placeholder="ZIP Code" value={zipCode} setValue={(e) => setZipCode(e.target.value)}/>
					<IconButton size={40} color="var(--accent-color)" icon="arrow_forward" onClick={() => fetchWeather(zipCode)}/>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: "25px", right: "25px" }}>
					<IconButton size={40} color="var(--accent-color)" icon="refresh" onClick={() => {
						fetchWeather(weather.zipCode);
						fetchImage();
					}}/>
					<p>{getFormatedDayTime(new Date(weather.dt * 1000))}</p>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', bottom: "25px", right: "25px" }}>
					<p>🌅{getFormatedTime(new Date(weather.sys.sunrise * 1000))}</p>
					<p>🌇{getFormatedTime(new Date(weather.sys.sunset * 1000))}</p>
					<a href={`https://www.google.com/maps/place/${weather.zipCode}`} rel="noreferrer" target="_blank">🗺️{weather.zipCode}</a>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', bottom: "25px", left: "25px" }}>
					{temperature()}
					<p>{weather.weather[0].description}</p>
					<h2>{weather.name}</h2>
				</div>
			</div>
	);
}

export default App;
