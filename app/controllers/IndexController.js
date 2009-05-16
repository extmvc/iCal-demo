/**
 * @class MyApp.controllers.IndexController
 * @extends ExtMVC.Controller
 * Default root controller
 */
MyApp.controllers.IndexController = Ext.extend(ExtMVC.Controller, {
  constructor: function() {
    //super
    MyApp.controllers.IndexController.superclass.constructor.call(this, {
      viewsPackage: MyApp.views.index
    });
  }
});

ExtMVC.OS.getOS().registerController('index', MyApp.controllers.IndexController);

Ext.ns('MyApp.views.index');