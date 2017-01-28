'use strict';


/*
	This is for the clouds. 

	What I want the clouds to do...

		- Take the data from the JSON weather data 

		- Figure out how many clouds it needs render using the data

		- Animate the clouds moving by using the wind speed from the data

		- Have some sort of parallax on it, with the cityscape being on 

		  mid.. uh.. middle between 2 cloud layers.  




*/

function Cloudfield(){
	this.fps = 60;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minVelocity = this.fps/6; 
	this.maxVelocity = this.fps;
	this.clouds = 100;
	this.intervalId = 0; 

	/*
		What the code here does is 

		 - Set the initial FPS (Frames per sec) at 60... 

		     Cause we're the PC master race, not console peasants. 
		 
		 - Set the initial canvas property. This will come in handy later

		 - Set the initial height and width. Both are 0, right now. 

		    Going to see why in the next part. 

		 - Set a minimum/maximum speed for the clouds. This is tied to the fps.

		    Min speed is 15, which gives the illusion of movement. 

		    Max is 60, because thats the max of the fps.

	*/

}


var cloudfield = new Cloudfield();
var cloud1 = new Image();
var cloud2 = new Image();





Cloudfield.prototype = {
		initialize: function(something){
			var _this = this; 
			cloud1.src = '../images/cloud3.png';
			cloud2.src = '../images/clouds4.png';
			_this.height = window.innerHeight;
			_this.width = window.innerWidth;

			window.addEventListender('resize',function(e){
				_this.width = window.innerWidth;
				_this.height = window.innerHeight;
				_this.canvas.height = _this.height;
				_this.canvas.width = _this.width;
				_this.draw();
			})
		}
}