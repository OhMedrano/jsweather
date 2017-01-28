
/*


			NOT IN USE 


			APP2.JS IS IN USE











*/








/*'use strict';

import '../css/style.scss';

*/
/*
var localData = {
	locallon: localStorage.getItem('locallon') || null,
	locallat: localStorage.getItem('locallat') || null,


};
*/

/*
	This sets up the save function. I'm going to refine this later... 

	It takes the arguments Name, Data and Local. 


	Name is the name. I gotta fix it because the naming convention is coming 

	out weird. (localData.locallocalW is one example...)


	Data is the data that I want to save, this has a bit of dependance with the

	Local callback. If the Local callback is true (Since Local in this function,

	is a boolean value), then the data will be saved into localStorage

	
	HOWEVER localStorage cannot save objects, so incase that the data 

	that is trying to be saved is an object (which is checked by the "if typeof"

	statement), it will JSON.stringify. (It's an Object... JSON stands for

	JavaScript Object Notation... so why not? )


	If the Local callback is false, it just saves the data into the global

	localData object with the property local + name. 

*/

/*function saveData(name,data,local){
	if(local === true){
		if(typeof data === 'object'){
			localStorage.setItem('local'+name, JSON.stringify(data));
			localData['local'+name] = data;
			return localData;
		} else {
			localStorage.setItem('local'+name, data);
		localData['local'+name] = data;
		return localData;
		}

		
	} else {
		localData['local'+name] = data;
		return localData;
	}
}
console.log(localData);

*/




/*
	This function sets up the weather data retrieval from OpenWeatherMap.


	It takes the arguments lon, lat and saved. lon and lat are obviously the

	longitude and latitude. 


	saved, if true, will be used to set that data from openweathermap, 

	into localStorage, with the name key of localW (it would be locallocalW... I gotta fix

	that later.)

	If saved is false, it will just save it into the global localData variable,

	as localData.localsearchedW 



	SAVED EDITS: 

	var apiKey = '9bfc480cf5eba264ab04e7d23c97110b';
		var httpstuff = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID='+apiKey;

	
*/



/*function getWeather(lon,lat,saved){
		return new Promise(function(resolve,reject){
			var xhr = new XMLHttpRequest();

			xhr.open('GET',url,true);

			xhr.onload = function(){
				if(xhr.status == 200){
					resolve()
				}
			}
		})



		
		




};*/


/*
	This gets the local coordinates off the browser's geolocation.


	However, I don't want to constantly update it if its not nescessary.

	So if the prevLat that is stored in the localStorage, is the same

	as the nextLat which was retrieved by geolocation are the same... 

	It won't update. 


	The opposite if it's not.

*/

/*function getLocalCoords(){

	if(navigator){
		navigator.geolocation.getCurrentPosition(function(data){
			let coords = data.coords;
			let nextLat = parseFloat(coords.latitude).toFixed(2);
			let nextLon = parseFloat(coords.longitude).toFixed(2);
			let prevLat = parseFloat(localData.locallat);
			let prevLon = parseFloat(localData.locallon);

			if(prevLat == nextLat && prevLon == nextLon){
				console.log('Location has not changed');
			} else {
				saveData('lon',nextLon,true);
				saveData('lat',nextLat,true);
				console.log('Location has been updated');
			}
		})
	}





};*/
/*
function LocalWeatherInfo(stuff){
	let localWeather = stuff;

	console.log(localWeather);

	return localWeather;
}


*/


/*

	Everything gets loaded on to here. 

	When everything is ready, this is the main function that will start 

	the whole app when the page opens. 


*/


/*function Example() {
	getLocalCoords();

		if(lastUpdate + 180000 > currentDate){
			console.log('Local weather has not been updated; Information less than 30 minutes old.');

		} else {
			
				getWeather(localData.locallon, localData.locallat, true);
				

		};
	
	var currentDate = Date.now();
	var lastUpdate = localStorage.getItem('locallastUpdate') || null;
	var body = document.querySelector('body');

	var div = document.createElement('div');

		div.innerHTML = `
			<div>
				Hello world
			</div>

			<div>
			${localdata}		

			</div>


		`;

		
		
		body.append(div);
		
		console.log(currentDate + ' ' + lastUpdate);
		console.log(localData);

}

Example();*/



window.onload = function() {


	/* Get Weather Data */

	function getWeather(lat,lon,local){
		return new Promise(function(resolve,reject){
			var xhr = new XMLHttpRequest();
			var apiKey = '9bfc480cf5eba264ab04e7d23c97110b';
			var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID='+apiKey;

			 xhr.open("GET",url,true);
			 xhr.onload = function(){
			 	if(xhr.status == 200) {
			 		if(local){
			 			localStorage.setItem('weather',xhr.response);
			 			resolve(xhr.response);
			 		} else {
			 			resolve(xhr.response);
			 		}
			 	} else {
			 		reject(xhr.statusText);
			 	}
			 };

			 xhr.onerror = function(){
			 	reject(xhr.statusText);
			 };

			 xhr.send();
		})
	}

	/*Get location*/

	function getLocation(local,line){
		return new Promise(function(resolve,reject){
			if(navigator){
				navigator.geolocation.getCurrentPosition(function(data){
					/*If line is true, then return the latitude data*/

					if(line) {
						let lat = parseFloat(data.coords.latitude).toFixed(2);

						if(local){
							localStorage.setItem('lat',lat);

							resolve(lat);
						} else {
							resolve(lat);
							}
					} else {
						let lon = parseFloat(data.coords.longitude).toFixed(2);
						if(local){
							localStorage.setItem('lon',lon);
							resolve(lon);
						} else {
							resolve(lon);
						}
					}

					
				});
			} else {
				reject(console.log('Not supported'));
			};
		});


	
	};


	var localData = {
		lat : localStorage.getItem('lat') ||getLocation(true,true).then(function(data){
			return data
		}).catch(function(){
			return null
		}),
		lon: localStorage.getItem('lon') || getLocation(true,false).then(function(data){
			return data
		}).catch(function(){
			return null
		}),
		
		weather: new Promise(function(resolve,reject){
			if(localStorage){
				resolve(localStorage.getItem('weather'));
				
			} else if(localStorage.getItem('weather') === null) {
				let weather = localweather;
				resolve(localweather);
			} else {
				reject('Failed');
			}
		})


	};


	var localweather = getWeather(localData.lat,localData.lon,true);

	localweather.then(function(data){
		localData.weather = data;
	}).catch(function(data){
		console.log(err);
		return err
	});




	

	console.log(localData);
	console.log(localData.weather);

	console.log('window loaded');

};