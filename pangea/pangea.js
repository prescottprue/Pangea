
  goog.require('pangea.defaults');
  goog.require('pangea.utils');
  goog.require('pangea.Explorer');
  goog.provide('pangea.Map');
  goog.provide('pangea.Map.legend');

  /** Build a map array that is a 2D array of randomly placed land and water. 
   * @constructor pangea.Map
   * @params {Object} options Settings for creating map `optional`
   * @params {Number} options.rows Number of rows in map
   * @params {Number} options.columns Number of columns in map
   * @params {String} options.water Symbol for water
   * @params {String} options.land Symbol for land
   * @example
   * var map = new pangea.Map({rows:5, cols:9});
   * map//[[~~~~~~~~~]
   *      [~~~~~~~~~]
   *      [~MMM~~~~~]
   *      [~M~~~~MM~]
   *      [~~~~~~MMM]]
   *
   */
  pangea.Map = function(opts) {
    this.data = [];
    this.options = pangea.utils.existsOrSetDefault(['rows', 'cols'], opts);
    this.legend = this.buildLegend(this.options);
    //Build map
    for(x = 0; x < this.options.rows; x++) {
  		var row = [];
  		for(y = 0; y < this.options.cols; y++) {
  			//Randomly select one of the possible characters and push to current position.
  			row.push(this.legend.possible.charAt(Math.floor(Math.random()* this.legend.possible.length)));
  		}
  		this.data.push(row);
  	}
  };
  /** Used internally to Build map legend from options within map constructor. 
   * @memberof #pangea.Map
   * @params {Object} options Settings for creating map `optional`
   *
   */
  pangea.Map.prototype.buildLegend = function(opts) {
    var legend = {};
    if(!opts.hasOwnProperty('water') || typeof opts.rows != "string"){ // Check for rows or set default
      legend.water = pangea.defaults.water;
    }
    if(!!opts.hasOwnProperty('land') || typeof opts.cols != "string"){ // Check for cols or set default
      legend.land = pangea.defaults.land;
    }
    legend.possible = legend.land + legend.water + legend.land;
    legend.getPossibles = function(){ 
      //[TODO] Take ratio of land to water as input
      return this.land + this.water + this.land; //Set land and water as possible options
    };
    return legend;
  };
  /** Get dimensions of map. 
   * @memberof #pangea.Map
   * @returns {Object} dims - Dimensions object
   * @returns {number} dims.rows - Row dimension of map data
   * @returns {number} dims.cols - Column dimension of map data
   */
  pangea.Map.prototype.getDims = function(){
    return {
      rows : this.data.length,
      cols :this.data[0].length,
    }
  }

 /** Function to draw the map in the view. 
  * @params {2D Array} map The map array to draw in the view.
  */ 
	pangea.Map.prototype.draw = function(canvas){
    return pangea.ui.displayMap(this, canvas);
  }
  pangea.Map.prototype.getExplorer = function(){
    return new pangea.Explorer(this);
  }
  pangea.Map.prototype.showConnectionStatus = function(wrapperDiv) {
    //Explorer function to find connection status
    console.log('getExplorer:', this.getExplorer());
    var connectionStatus = this.getExplorer().landIsConnected();
    //UI function to display result
    pangea.ui.showConnectionStatus(connectionStatus, wrapperDiv);
  }