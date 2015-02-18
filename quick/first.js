var map = new Map(8,8); // Build a new 8/8 map using the map constructor
console.log('Map:', map);
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
	console.log('Connected:' + explore(map, possibles[0], null, null, possibles));
	var firstIsland = []; //Land variable to be set by exploring
	//[TODO] Handle variables differenlty here (Return with recusion?)
	explore(map, possibles[0], null, firstIsland, possibles);
	console.log('Blocks of land:', possibles.length,'\n Island length: ', firstIsland.length);
	if(firstIsland.length == possibles.length){
		return true
	}
	return false;
};
/** Display land connection status within view
 * @param {2D Array} map 2D Array that corresponds to the rows and columns of a map
 * @returns {Boolean} 
 *
 */
var showConnectionStatus = function (map){
	console.log('Connected:', landIsConnected(map));
	var connectedStatus = landIsConnected(map)
	var statusText = document.createTextNode(connectedStatus);
	var statusEle = document.getElementById('status');
	if(!connectedStatus){
		statusEle.style = {color:"red"};
	}
	statusEle.appendChild(statusText);

}

showConnectionStatus(map);

/** Show connection
 * @function explore
 * @param {2D Array} map 2D Array that corresponds to the rows and columns of a map
 * @param {Array} exploreCords Array that contains corridinates to currently explore
 * @param {Array} pastCords Preview coordinates in recusion step
 * @param {Array} toExplore Array of cooridates to explore
 *
 */
 //[TODO] Remove checking past dims and just check explored
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
	if(map[x][y] == land && !isExplored([x,y], island)){
		console.log('['+ x +',' + y + '] is land. Adding to island.');
		island.push(eDims);
		//Look Left if not a boundary or where was just searched
		if(x > 0){
			// console.log('Exploring left from: ['+ x +',' + y + ']');
			explore(map, [x - 1, y], eDims, island, toExplore);
		}
		//Look Up
		if(y > 0){ //Is not a boundary
			// console.log('Exploring up from ['+ x +',' + y + ']');
			explore(map, [x, y-1], eDims, island, toExplore);
		}
		//Look Right
		if(x + 1 < map.length){
			// console.log('Exploring Right from ['+ x +',' + y + ']');
			explore(map, [x + 1, y], eDims, island, toExplore);
		}
		//Look Down
		if(y < map[x].length){
			// console.log('Exploring Down from ['+ x +',' + y + ']');
			explore(map, [x, y+1], eDims, island, toExplore);
		}
	}
}
/** Return if a set of coordinates has been explored
 * @function isExplored
 * @param {Array} map 2D Dimensions to check for within island
 * @param {Array} island List of current island coordinates
 * @returns {Boolean} hasBeenExplored
 *
 */
var isExplored = function(locationArray, island){
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
