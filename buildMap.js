
/** Build a map array that is a 2D array of randomly placed land and water. 
 * Map object then also maps the drawMap function to _.draw
 * @constructor Map
 * @params {Number} rows Number of rows in map
 * @params {Number} columns Number of columns in map
 * @example
 * var map = new Map(5,9);
 * map//[[~~~~~~~~~]
 * 	    [~~~~~~~~~]
 * 	    [~MMM~~~~~]
 * 	    [~M~~~~MM~]
 * 	    [~~~~~~MMM]]
 *
 */
 var land = "M";
 var water = "~";
 var possible = land + water + land + land + land;//Set land and water as possible options
 var Map = function(rows, cols) {
 	var map = [];
 	if(!rows || typeof rows != "number"){ // Check for rows or set default
 		rows = defaultNum;
 	}
 	if(!cols || typeof cols != "number"){ // Check for cols or set default
 		cols = defaultNum;
 	}
 	for(x = 0; x < rows; x++){
 		var row = [];
 		for(y = 0; y < cols; y++){
 			//Randomly select one of the possible characters and push to current position.
 			row.push(possible.charAt(Math.floor(Math.random()* possible.length)));
 		}
 		map.push(row);
 	}
 	return map;
 }
 /** Function to draw the map in the view. 
  * @params {2D Array} map The map array to draw in the view.
  */ 
	var drawMap = function(map){
		var canvasElm = document.getElementById("canvas"),
		defaultNum = 8,
		dimensions = 150; //
		var canvas = canvasElm.getContext("2d");//Canvas context set as canvas    
	  unitSize = dimensions/map.length; // Set size of blocks
		canvas.style={width: dimensions * map.length + "px"}; //Set width to match number of blocks
    for(var x = 0; x < map.length; x++) {
      for(var y = 0; y < map[x].length; y++){
        if(map[x][y] == land){
          canvas.fillStyle = "rgb(0,200,0)"; // Set color to green for land
        } else if(map[x][y] == water){
          canvas.fillStyle = "rgb(0,0,200)"; // Set color to blue for water
        }
        canvas.strokeRect(x*unitSize, y*unitSize, unitSize, unitSize ); // Draw frame around box 
        canvas.fillRect(x*unitSize, y*unitSize, unitSize, unitSize ); //Draw box
      }  
    }
	};

