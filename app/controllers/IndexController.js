/**
 * @class iCal.controllers.IndexController
 * @extends ExtMVC.Controller
 * Default root controller
 */
iCal.controllers.IndexController = Ext.extend(ExtMVC.Controller, {
  constructor: function() {
    //super
    iCal.controllers.IndexController.superclass.constructor.call(this, {
      viewsPackage: iCal.views.index
    });
  }
});

ExtMVC.OS.getOS().registerController('index', iCal.controllers.IndexController);

Ext.ns('iCal.views.index');