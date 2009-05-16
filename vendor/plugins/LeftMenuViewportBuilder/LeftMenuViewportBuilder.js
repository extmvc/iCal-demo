/**
 * @class ExtMVC.plugin.LeftMenuViewportBuilder
 * @extends ExtMVC.ViewportBuilder
 * Creates a viewport with a left menu and a main tabpanel.
 */
ExtMVC.plugin.LeftMenuViewportBuilder = function() {
  ExtMVC.plugin.LeftMenuViewportBuilder.superclass.constructor.call(this);
};
Ext.extend(ExtMVC.plugin.LeftMenuViewportBuilder, ExtMVC.ViewportBuilder, {
  
  /**
   * Creates the viewport elements, taking config options from OS.viewportBuilderConfig
   * @param {ExtMVC.OS} os The OS instance to link built viewport components to
   * Assigns this.topBar, this.sideMenu, this.mainPanel, this.contentPanel and this.viewport
   * to the passed os when calling build(os)
   * @return {ExtMVC.OS} The same OS instance, now decorated with topBar, sideMenu, mainPanel,
   * contentPanel and viewport
   */
  build: function(os) {
    var config  = os.getViewportBuilderConfig() || {};
    config.menu = config.menu || {};
    
    //menu items are placed into a child container, allow config.menu.items to
    //pass straight through to the child
    config.menu.items = [
      new Ext.Panel({
        bodyStyle: 'background-color: #DFE8F6;',
        items:     config.menu.items,
        defaults:  {
          xtype: 'menu_link'
        }
      })
    ];
    
    var viewportItems = [];
    
    if (config.topBar) {
      //config.topBar could either be true, or an object.  Normalise into an object
      config.topBar = (typeof(config.topBar) == 'object' ? config.topBar : {});
      
      os.topBar = Ext.applyIf(config.topBar, {
        region: 'north',
        cls:    'x-mvc-topbar'
      });
    
      viewportItems.push(os.topBar);
    };
    
    os.sideMenu = new Ext.Panel(Ext.applyIf(config.menu, {
      region:      'west',
      width:       200,
      frame:       true,
      margins:     '8 0 8 8',
      title:       'Menu',
      split:       true,
      collapsible: true,
      autoScroll:  true,
      bodyStyle:   'background-color: #DFE8F6;'
    }));
    
    os.mainPanel = this.createMainPanel(config);
    
    os.contentPanel = new Ext.Panel({
      region:    'center',
      layout:    'border',
      bodyStyle: 'background-color: #c5d1e7; padding: 10px;',
      items:     [os.sideMenu, os.mainPanel]
    });
    
    viewportItems.push(os.contentPanel);
    
    os.viewport = new Ext.Viewport({
      layout:    'border',
      bodyStyle: 'background-color: #c5d1e7; margin-bottom: 10px;',
      items:     viewportItems
    });
            
    //Tell controllers to add views to the mainPanel instead of rendering directly
    ExtMVC.Controller.prototype.addTo = os.mainPanel;
    
    //don't render views automatically, return a renderable instantiation instead (a subclass of Ext.Component)
    ExtMVC.Controller.prototype.renderMethod = 'add';
    
    return os;
  },
  
  //private - decides whether to create a TabPanel or not, based on os.viewportBuilderConfig.useTabs
  createMainPanel: function(config) {
    var config  = config || {};
    config.main = config.main || {};
    Ext.applyIf(config.main, {
      region:   'center',
      border:   false,
      defaults: { frame: true }
    });

    if (config.useTabs) {
      return new Ext.TabPanel(Ext.applyIf(config.main, {
        margins:    '8 8 8 0',
        items:      []
      }));
    } else {
      return new Ext.Panel(Ext.applyIf(config.main, {
        margins:    '0 8 8 0',
        layout:     'fit',
        bodyBorder: false,
        bodyStyle:  'padding-top: 8px; background-color: #c5d1e7;',
        listeners:  {
          'beforeadd': {
            //removes the current component so newly added component shows up automatically
            fn: function(ct, component, index) {
              if (ct.items) {
                ct.items.each(function(i) {this.remove(i);}, this);
              };
            }
          }
        },
        items: [{
          hideMode:  'offsets',
          bodyStyle: 'background-color: #c5d1e7;',
          iconCls:   'home',
          border:    false
        }]
      }));
    };
  }
  
});

ExtMVC.ViewportBuilderManager.register('leftmenu', ExtMVC.plugin.LeftMenuViewportBuilder);