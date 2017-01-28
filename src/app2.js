import '../css/style.scss';

/*Local Data info here*/
function LocalData(){
	this.location = new Promise(function(resolve,reject){
			if(localStorage.getItem('lat')){
				let coords = [localStorage.getItem('lon'),localStorage.getItem('lat')];
				resolve(coords);
			} else {
				reject(null);
			}
	});
	this.weather = new Promise(function(resolve,reject){}); 
	this.date = new Date().toLocaleString();
};
LocalData.prototype = {
	getLocation: function(local){
		var self = this;
		return new Promise(function(resolve,reject){
			if(navigator){
				navigator.geolocation.getCurrentPosition(function(data){
					let lat = parseFloat(data.coords.latitude).toFixed(2);
					let lon = parseFloat(data.coords.longitude).toFixed(2);
					let coords = [lat,lon];
					if(local){
						localStorage.setItem('lat',lat);
						localStorage.setItem('lon',lon);
						console.log(coords);
						self.location = resolve(coords);
					}	else {
						self.location = resolve(coords);
					}
				})
			} else {
				reject(console.log('not supported'));
			};
		});
	},
	getLocalWeather: function(lon,lat,local){
		return new Promise(function(resolve,reject){
			var xhr = new XMLHttpRequest();
			var api = '9bfc480cf5eba264ab04e7d23c97110b';
			var http = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial&APPID='+api;

			xhr.open('GET',http,true);

			
			
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


		});

	}
}







/*Clouds rendering through Canvas here*/
function Starfield(starNum) {
	this.fps = 120;
	this.canvas = null;
	this.width = 0; 
	this.height = 0;
	this.minVelocity = this.fps/6; 
	this.maxVelocity = this.fps;
	this.stars = starNum || 20;
	this.intervalId = 0;
};



Starfield.prototype = {
	start: function(far){
		var stars = [];
		var thisStars = this.stars;

		if(far){
				for(var i=0; i < this.stars;i++){
			
			if(i%3==0) {
					stars[i] = new Star(Math.random()*this.width,100,Math.random()*3+5,
					this.fps);
				} else {
					stars[i] = new Star(Math.random()*this.width,200,Math.random()*3+10,
					(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,true);
				}
			}
		} else {
				for(var i=0; i < this.stars;i++){
			
			if(i%3==0) {
					stars[i] = new Star(Math.random()*this.width,100,Math.random()*3+5,
					this.fps);
				} else {
					stars[i] = new Star(Math.random()*this.width,100,Math.random()*3+10,
					(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,false);
				}
		}
		}


		this.stars = stars;

		var self = this;

		this.intervalId = setInterval(function(){
			self.update();
			self.draw();
		},1000 / this.fps);


		/*
				
	//	Create the stars.
	var stars = [];
	for(var i=0; i<this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;

	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
}, 1000 / this.fps);
		

		*/
	},
	stop: function(){
		clearInterval(this.intervalId);
	},
	update: function(){
		var dt = 1 / this.fps;

		for(var i=0;i<this.stars.length;i++){
			var star = this.stars[i];
			star.x += dt * star.velocity;

			if(star.far === true){
				if(star.x > this.width) {
				if(i%2==0 && i%3 == 0) {
					this.stars[i] = new Star(0,100,Math.random()*3+5,
					(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,true);
				} else {
					this.stars[i] = new Star(0,200,Math.random()*3+15,
					(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,true);
				}
				}
			} else {
				if(star.x > this.width) {
				if(i%2==0 && i%3 == 0) {
					this.stars[i] = new Star(0,100,Math.random()*2+2,
					(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,false);
				} else {
					this.stars[i] = new Star(0,100,Math.random()*5+2,
					(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity,false);
				}
			}
			}
		}
	},
	draw: function(){
		var ctx = this.canvas.getContext('2d');


		
		ctx.clearRect(0,0,this.width,300);

/*		ctx.fillStyle = '#ffffff';*/

		

		

		
		for(var i=0;i<this.stars.length;i++){
			var star = this.stars[i];
			if(i%5==0 ){
			;
			} /*else if(i%9==0) {
				ctx.fillStyle = '#FF0000';

			}*/else {
				ctx.fillStyle = '#ffffff;';
			}
			
			/*
				I wanna add some bouncyness to the clouds. Here's where I do it. 

			*/

			ctx.fillRect(star.x,(Math.random()+star.y),(star.size*4),(star.size*2));
			ctx.fillStyle = "white";
		}
	},
	initialize: function(div,height){
		var self = this;

		this.containerDiv = div;
		self.width = window.innerWidth;
		self.height = window.innerHeight;

		window.addEventListener('resize',function(event){
			self.width = window.innerWidth;
			self.height = window.innerHeight;
			self.canvas.width = self.width;
			self.canvas.height = self.height;
			self.draw();
		});

		var canvas = document.createElement('canvas');
		div.appendChild(canvas);
		this.canvas = canvas;
		this.canvas.width = this.width;
		this.canvas.height = this.height / 2;
	}
};

function Star(x,y,size,velocity,far){
	this.x = x;
	this.y = y;
	this.size = size * 2;
	this.velocity = velocity;
	this.far = far;
}

/* */
/*Divs being made in this function are being returned created with a css id value*/
function divCreate(id){
 	
 	let div = document.createElement('div');
 	div.setAttribute('id',id);
 
 	return div
 };

/*This is for displaying the time*/
function zeros(time){
	if(time < 10){
		time = "0"+time;
	}
	return time;
};
function timeClock(){
	let date = new Date();
	let hours = date.getHours();
	let mins = date.getMinutes();
	let secs = date.getSeconds();
	let ampm = ['AM','PM'];
	

	let clock = document.getElementById('time');

	mins = zeros(mins);
	secs = zeros(secs);
	hours = zeros(hours);
	/* If hours (Which is set at 0 - 23) is greater
		than 12, then divide it by 12 and use the remainer as the value

		 aka  the % part 
		
		Making it a 12 hour clock.
	
		This also deals with the AM and PM 
	*/
	if(hours > 12 ){
		hours = hours%12;
		console.log(hours);
		document.getElementById('app').style.cssText = 'background:url(../images/night-sky.png)no-repeat;background-size:99% 99%;background-position:center;';

		clock.innerHTML = hours+":"+mins+":"+secs+" "+ampm[1];
	} else {
		clock.innerHTML = hours+":"+mins+":"+secs+" "+ampm[0];
		document.getElementById('app').style.cssText = 'background:url(../images/day-sky.png)no-repeat;background-size:99% 99%;background-position:center;';

	}

	var timeout = setTimeout(timeClock,500);

};






function locationName(name,id){
 	let loc = `<p><span class="boldText">Location : </span>${name}</p>`;
 	let div = new divCreate(id);
 	div.innerHTML = loc;
 	div.setAttribute('class','col-md-6 col-lg-6');
 	return div
 };
function mainWeather(weather){
	let mainWeather = weather.main;

	let mainDiv = new divCreate('main-weather');
	mainDiv.setAttribute('class','col-md-6 col-lg-6');
	let text = `<p><span class='col-md-12 col-lg-12' id="main-temp">Current Temp: ${mainWeather.temp + 'F'}</span><span class='col-md-12 col-lg-12' id="humidity">Humidity: ${mainWeather.humidity + '%'}</span>  `

	mainDiv.innerHTML = text;

	return mainDiv;

}
		/*Background*/
 var app = new divCreate('app');

  app.setAttribute('class','col-md-12 col-lg-12');
 
 var app2 = new divCreate('app2');
 
 app2.setAttribute('class','col-md-12 col-lg-12');
 
 var cityScape = new divCreate('city');
 cityScape.setAttribute('class','col-md-12 col-lg-12');
 
 		/*Foreground*/
 var foreGround = new divCreate('fore-ground');
 foreGround.setAttribute('class','col-md-12 col-lg-12');
 
 var building = new divCreate('building');
 building.setAttribute('class','col-md-6 col-lg-6');

 var balcony = new divCreate('balcony');
 balcony.setAttribute('class','col-md-12 col-lg-12');

 var messageWindow = new divCreate('message-window');
 messageWindow.setAttribute('class','col-md-12 col-lg-12');

 var weatherText = new divCreate('weather-text');
 weatherText.setAttribute('class','col-md-12 col-lg-12');

 var clock = new divCreate('time');
 clock.setAttribute('class','col-md-6 col-lg-6');

/*  */



/* The actual body of the html document */

	/*Stuff in the building Div*/
building.append(balcony,messageWindow);

	/*Foreground Div*/
foreGround.append(building);

	/*Body + background*/
 var realBody = document.querySelector('body');
realBody.append(app,app2,cityScape,foreGround);
/*  */


/*Variables for the body.*/
 var farClouds = document.getElementById('app');
 var closeClouds = document.getElementById('app2');



/*Dynamic background styling --- later feature but leaving it up for now*/
cityScape.style.cssText = 'background:url(../images/nycskyline.png)no-repeat;background-size:100% 99%;background-position:center;height:100vh;';
balcony.style.cssText = 'background:url(../images/balcony.png)no-repeat;background-size:100%100%;background-position:center;';
messageWindow.style.cssText = 'background:url(../images/messageDisplay.png)no-repeat;background-size:100%100%;background-position:center;';
document.getElementById('app').style.cssText = 'background:url(../images/day-sky.png)no-repeat;background-size:99% 99%;background-position:center;';




 


/*All the data stuff that I need from OpenWeatherMap */

var localData = new LocalData();
localData.getLocation(true)
		 .then(function(data){
			
		 	/*Got the data here and loaded to the location property*/

			localData.location = data;

			

			console.log();



			/* Now getting the weather data*/
			localData.getLocalWeather(data[1],data[0],true).then(function(data){
				localData.weather = JSON.parse(data);
				console.log(localData);

				
				/*Once the weather data is loaded, add it to the weather box div*/
				weatherText.append(locationName(localData.weather.name,'location-name'),mainWeather(localData.weather),clock)
				messageWindow.append(weatherText);
				
				/* Clock */
				timeClock();

				/* Starting the clouds on start up here*/

       			 var starfield = new Starfield(localData.weather.clouds.all);
      			 starfield.initialize(farClouds);
        		 starfield.start(true);
        		 console.log(starfield);
        		 var starfield2 = new Starfield(localData.weather.clouds.all);
        		 starfield2.initialize(closeClouds);
        		 starfield2.start(false);
        		/*  */


        		/* Fixing the canvas for bootstrap*/
        		var canva = document.querySelector('canvas');
 				canva.setAttribute('class','col-md-12 col-lg-12');
				app2.children[0].setAttribute('class','col-md-12 col-lg-12');
		 		console.log(app2);





				
			});
		});

















