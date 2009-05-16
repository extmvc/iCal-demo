/**
 * FIXME: ugh, don't code tired, you write shit like this:
 * 
 * @class ExtMVC.plugin.LeftMenuViewportBuilder.MenuLink
 * @extends Ext.Component
 * Renders a basic link which fires an event when clicked
 */
ExtMVC.plugin.LeftMenuViewportBuilder.MenuLink = function(config) {
  var config = config || {};
 
  Ext.applyIf(config, {
    html: '<a href="#' + config.url + '" cls="' + config.cls + '">' + config.text + '</a>'
  });
  
  config.cls += ' x-menu-link';
  delete config.xtype ;
  delete config.url;
  delete config.text;
 
  ExtMVC.plugin.LeftMenuViewportBuilder.MenuLink.superclass.constructor.call(this, config);
};
Ext.extend(ExtMVC.plugin.LeftMenuViewportBuilder.MenuLink, Ext.Component, {
  
  onRender: function(ct, position) {
    this.el = ct.createChild(this.initialConfig);
    
    this.el.on('click', this.initialConfig.handler, this);
    
    ExtMVC.plugin.LeftMenuViewportBuilder.MenuLink.superclass.onRender.apply(this, arguments);
  }
});

Ext.reg('menu_link', ExtMVC.plugin.LeftMenuViewportBuilder.MenuLink);