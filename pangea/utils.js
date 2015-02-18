  goog.provide('pangea.utils');
  //Check object for parameter, if it doesn't exist assign the default
  pangea.utils.existsOrSetDefault = function(paramsArray, obj){
    if(!obj || typeof obj != "object"){
      obj = {};
    }
    for(i = 0; i < paramsArray.length; i++) {
      if(!obj.hasOwnProperty(paramsArray[i])) {
        if(pangea.defaults.hasOwnProperty(paramsArray[i])){
          obj[paramsArray[i]] = pangea.defaults[paramsArray[i]];
        } else {
          console.error('Default value not set for ' + paramsArray[i]);
        }
      }
    }
    return obj;
  }