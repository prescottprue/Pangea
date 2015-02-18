goog.require('pangea.utils');
goog.provide('pangea.Explorer')

pangea.Explorer = function(map){
	this.map = map;
	this.mapData = map.data;
	this.possibles = [];
	this.islands = [];
}
/** Boolean of whether all of the land in the map is connected or not
 * @function pangea.explorer.landIsConnected
 * @param {2D Array} map 2D Array that corresponds to the rows and columns of a map
 * @returns {Boolean} - Whether or not land all land in map is connected.
 *
 */
pangea.Explorer.prototype.landIsConnected = function(){
 	for(i = 0; i < this.map.data.length; i++){ //Loop Through Rows
		for(j = 0; j < this.map.data[i].length; j++){ //Loop Through Columns
			if(map.data[i][j] == this.map.legend.land){ //Check if location is land
				console.log('['+ i +',' + j + '] is land. Pushing to toExplore array.');
				this.possibles.push([i, j]);
			}
		}
	}
	console.log('Connected:' + this.explore(this.possibles[0][0],this.possibles[0][1]));
	this.explore(this.possibles[0][0],this.possibles[0][1]);
	console.log('Blocks of land:', this.possibles.length,'\n Island length: ', this.islands[0].length);
	if(this.islands[0].length == this.possibles.length){
		return true
	}
	return false;
};
/** Show connection
 * @function pangea.explorer.explore
 * @param {2D Array} map 2D Array that corresponds to the rows and columns of a map
 * @param {Array} exploreCords Array that contains corridinates to currently explore
 * @param {Array} pastCords Preview coordinates in recusion step
 * @param {Array} toExplore Array of cooridates to explore
 *
 */
pangea.Explorer.prototype.explore = function(x, y) {
	console.log('exploring: [' + x + ','+ y + ']');
	if(this.islands.length < 1 || typeof this.islands[0] == "undefined"){
		this.islands.push([]);
		//[TODO] Handle more than one island
		console.log('New Island created with ['+ x +', '+ y +']');
	}
	if(this.map.data[x][y] == this.map.legend.land && !this.isExplored([x,y], this.islands[0])){
		console.log('['+ x +',' + y + '] is land. Adding to island.');
		this.islands[0].push([x,y]);
		//Look Left if not a boundary or where was just searched
		if(x > 0){
			// console.log('Exploring left from: ['+ x +',' + y + ']');
			this.explore(x - 1, y);
		}
		//Look Up
		if(y > 0){ //Is not a boundary
			// console.log('Exploring up from ['+ x +',' + y + ']');
			this.explore(x, y-1);
		}
		//Look Right
		if(x + 1 < map.data.length){
			// console.log('Exploring Right from ['+ x +',' + y + ']');
			this.explore(x + 1, y);
		}
		//Look Down
		if(y < map.data[x].length){
			// console.log('Exploring Down from ['+ x +',' + y + ']');
			this.explore(x, y+1);
		}
	}
};
/** Return if a set of coordinates has been explored
 * @function pangea.explorer.isExplored
 * @param {Array} map 2D Dimensions to check for within island
 * @param {Array} island List of current island coordinates
 * @returns {Boolean} hasBeenExplored
 *
 */
pangea.Explorer.prototype.isExplored = function(locationArray, island){
	//Check to see if location has been explored
	var exists = false;
	for(i = 0; i < island.length; i++){ //Loop through island array
		if(island[i][0] == locationArray[0] && island[i][1] == locationArray[1]){ // Check for matching value 
			console.log(locationArray, ' has been explored before.', island);
			exists = true;
		}
	}
	return exists;
};