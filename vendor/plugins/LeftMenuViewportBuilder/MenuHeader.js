/**
 * @class ExtMVC.plugin.LeftMenuViewportBuilder.MenuHeader
 * @extends Ext.Component
 * Renders a header divider element in a menu
 */
ExtMVC.plugin.LeftMenuViewportBuilder.MenuHeader = function(config) {
  var config = config || {};
 
  Ext.applyIf(config, {
    title: 'Header'
  });
 
  ExtMVC.plugin.LeftMenuViewportBuilder.MenuHeader.superclass.constructor.call(this, config);
};
Ext.extend(ExtMVC.plugin.LeftMenuViewportBuilder.MenuHeader, Ext.Component, {
  /**
   * Renders the HTML for this component
   * @param {Ext.Container} ct The container to render this component to
   * @param {Number} position The position within the parent container to render this component to
   */
  onRender: function(ct, position) {
    this.el = ct.createChild({
      tag: 'h1',
      cls: 'x-menu-header',
      html: this.initialConfig.title
    });
  
    ExtMVC.plugin.LeftMenuViewportBuilder.MenuHeader.superclass.onRender.apply(this, arguments);
  }
});

Ext.reg('menu_header', ExtMVC.plugin.LeftMenuViewportBuilder.MenuHeader);