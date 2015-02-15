//Given a map, build a function that returns boolean whether islands are connected or not
var map = new Map(8,8);
console.log('Map:', map);
console.log('map[0][1]:', map[0][1]);
drawMap(map); // Draw map in view
/** Boolean of whether all of the land in the map is connected or not
 * @param {2D Array} map 2D Array that corresponds to the rows and columns of a map
 * @returns {Boolean} 
 *
 */
var landIsConnected = function(map){
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
	console.log('calling explore with map:', map, possibles[0], possibles);
	console.log('Connected:' + explore(map, possibles[0], null, null, possibles));
	var firstIsland = [];
	explore(map, possibles[0], null, firstIsland, possibles);
	if(firstIsland.length == possibles.length){
		return true
	}
	return false;
};
function showConnectionStatus(map){
	console.log('Connected:', landIsConnected(map));
  document.getElementById('status').appendChild(document.createTextNode('Land Connected: ' + landIsConnected(map)));
}

showConnectionStatus(map);


function explore(map, eDims, pastDims, island, toExplore){
	console.log('exploring:', eDims);
	var x = eDims[0];
	var y = eDims[1];
	if(!island || typeof island == "undefined"){
		var island = [];
		console.log('New Island created with ['+ x +', '+ y +']');
	}
	if(!pastDims){
		var pastDims = eDims; 
	}
	console.log('island:', island, toExplore);
	console.log('lengths:', island.length, toExplore.length);
	var oldX = pastDims[0];
	var oldY = pastDims[1];
	if(map[x][y] == land && !isExplored([x,y], island)){
		console.log('['+ x +',' + y + '] is land. Adding to island.');
		island.push(eDims);
			//Look Left if not a boundary or where was just searched
		if(x > 0 &&  x - 1 !== pastDims[0]){
			console.log('Exploring left from: ['+ x +',' + y + ']');
			explore(map, [x - 1, y], eDims, island, toExplore);
		}
		//Look Up
		if(y > 0 &&  y - 1 !== pastDims[1]){ //Is not a boundary
			console.log('Exploring up from ['+ x +',' + y + ']');
			explore(map, [x, y-1], eDims, island, toExplore);
		}
		//Look Right
		if(x + 1 < map.length &&  x + 1 !== pastDims[0]){
			console.log('Exploring Right from ['+ x +',' + y + ']');
			explore(map, [x + 1, y], eDims, island, toExplore);
		}
		//Look Down
		if(y < map[x].length &&  y + 1 !== pastDims[1]){
			console.log('Exploring Down from ['+ x +',' + y + ']');
			explore(map, [x, y+1], eDims, island, toExplore);
		}
	}

}

function isExplored(locationArray, island){
	//Check to see if location has been explored
	var exists = false;
	for(i = 0; i < island.length; i++){ //Loop through island array
		if(island[i][0] == locationArray[0] && island[i][1] == locationArray[1]){ // Check for matching value 
			console.log(locationArray, ' has been explored before.', island);
			exists = true;
		}
	}
	return exists;
}

