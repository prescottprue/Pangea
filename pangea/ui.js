 goog.provide('pangea.ui')
 goog.require('pangea.defaults')

 /** Function to draw the map in the view. 
  * @params {2D Array} map The map array to draw in the view.
  */ 
	pangea.ui.displayMap = function(map, wrapperDiv){
    var canv = document.createElement('canvas');
    // canv.width = map.getDims().rows * dimensions;
    // canv.height = map.getDims().rows * dimensions;
    var canvas = canv.getContext("2d");
    console.log('canvas:', canvas);
		var dimensions = 175; //
	  var xUnitSize = dimensions/map.getDims().rows; // Set size of blocks
    var yUnitSize = dimensions/map.getDims().cols; // Set size of blocks
		canvas.style = {width: map.getDims().rows * dimensions + " px", height: map.getDims().rows * dimensions + " px"}; //Set width to match number of blocks
    console.log('style:', canvas.style);
    for(var x = 0; x < map.data.length; x++) {
      for(var y = 0; y < map.data[x].length; y++){
        if(map.data[x][y] == map.legend.land){
          canvas.fillStyle = "rgb(0,200,0)"; // Set color to green for land
        } else if(map.data[x][y] == map.legend.water){
          canvas.fillStyle = "rgb(0,0,200)"; // Set color to blue for water
        }
        canvas.strokeRect(x*xUnitSize, y*yUnitSize, xUnitSize, yUnitSize ); // Draw frame around box 
        canvas.fillRect(x*xUnitSize, y*yUnitSize, xUnitSize, yUnitSize ); //Draw box
      }  
    }
    wrapperDiv.appendChild(canv);
	};

  /** Display land connection status within view
 * @param {2D Array} mapData 2D Array that corresponds to the rows and columns of a map
 * @returns {Boolean} 
 *
 */
pangea.ui.showConnectionStatus = function (status, wrapperDiv){
  var statusText = document.createTextNode(status);
  var statusEle = document.getElementById('status');
  if(!status){
    statusEle.style = {color:"red"};
  }
  statusEle.appendChild(statusText);
}