/**
 * @class MyApp.views.index.Index
 * @extends Ext.Panel
 * Default Welcome to Ext MVC Panel - replace this with your own thing
 */
MyApp.views.index.Index = Ext.extend(Ext.Panel, {

  initComponent: function() {
    Ext.applyIf(this, {
      title: "Welcome to Ext MVC",
      html:  "This is the default template, which is found in app/views/index/Index.js.  This is being displayed because your config/routes.js file has a map.root setting telling it to use the Index view of the IndexController"
    });
    
    MyApp.views.index.Index.superclass.initComponent.apply(this, arguments);
  }
});