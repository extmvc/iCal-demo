//set up the application namespaces
var iCal = {models: {}};

/**
 * Add site-wide settings such as BLANK_IMAGE_URL
 */
Ext.BLANK_IMAGE_URL = 'images/default/s.gif';
Date.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
ExtMVC.Model.modelNamespace = iCal.models;

//launch the application
Ext.onReady(function() {
  Ext.QuickTips.init();
  
  iCal.OS.launch();
});