//Given a map, build a function that returns boolean whether islands are connected or not
var map = new Map(8,8);
console.log('Map:', map);
console.log('map[0][1]:', map[0][1]);
drawMap(map) // Draw map in view
/** Boolean of whether all of the land in the map is connected or not
 * @param {2D Array} map 2D Array that corresponds to the rows and columns of a map
 * @returns {Boolean} 
 *
 */
var landIsConnected = function(map){
	var islands = [];
	var possibles = [];
 	for(i = 0; i < map.length; i++){ //Loop Through Rows
		for(j = 0; j < map[i].length; j++){ //Loop Through Columns
			if(map[i][j] == land){ //Check if location is land
				console.log('['+ i +',' + j + '] is land. Pushing to toExplore array.');
				possibles.push([i, j]);
			}
		}
	}
	// explore(map, possibles[0]);

	console.log('one search', explore(map, possibles[0]));
};
landIsConnected(map);

// Search till stop
//	check to see if it is land
//		if it is land check its surroundings
//			if a surronding piece is land start check there
//			else land is an island



function isWater(map, x, y){
	if(map[x][y] == water){
		return true;
	}
	return false;
}



function explore(map, eDims, pastDims, island){
	var x = eDims[0];
	var y = eDims[1];
	if(!island){
		var island = [];
		console.log('New Island created with ['+ x +', '+ y +']');
	}
	if(!pastDims){
		var pastDims = eDims; 
	}
	if(map[x][y] == land){
		console.log('['+ x +',' + y + '] is land. Adding to island.');
		island.push(eDims);
			//Look Left if not a boundary or where was just searched
		if(x > 0 &&  x - 1 !== pastDims[0]){
			console.log('Exploring up from: ['+ x +',' + y + ']');
			explore(map, [x - 1, y], eDims, island);
		}
		//Look Up
		if(y > 0 &&  y + 1 !== pastDims[1]){ //Is not a boundary
			console.log('Exploring up from ['+ x +',' + y + ']');
			explore(map, [x, y+1], eDims, island);
		}
		//Look Right
		if(x < map.length &&  x + 1 !== pastDims[0]){
			console.log('Exploring Right from ['+ x +',' + y + ']');
			explore(map, [x + 1, y], eDims, island);
		}
		//Look Down
		if(y < map[x].length &&  y - 1 !== pastDims[1]){
			console.log('Exploring Down from ['+ x +',' + y + ']');
			explore(map, [x, y-1], eDims, island);
		}
	}



	if(map[x][y] !== map[pastDims[0], pastDims[1]]){
		return island.length;
	}
}


//[TODO] Check if search location is already part of an island

function isExplored(x, y){
	//Check to see if location has been explored
	var exists = false;
	for(i = 0; i < hasBeenExplored.length; i++){ //Loop through hasBeenExplored array
		if(hasBeenExplored[i][0] == x && hasBeenExplored[i][1] == y){ // Check for matching value 
			exists = true;
		}
	}
	return exists;
}

