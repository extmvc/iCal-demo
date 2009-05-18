/**
 * @class iCal.OS
 * @extends ExtMVC.OS
 */
iCal.OS = Ext.extend(ExtMVC.OS, {
  name:            "iCal",
  usesHistory:     true,
  
  initializeViewport: function() {
    var C = iCal.models.Calendar;
    C.create({name: 'First'});
    C.create({name: 'Second'});
    
    C.find(1, {success: function() {console.log(arguments);}});
    
    /**
     * @property menuPanel
     * @type iCal.views.index.MenuPanel
     * The Menu Panel instance
     */
    this.menuPanel = new iCal.views.index.MenuPanel({
      region: 'north',
      height: 30
    });
    
    /**
     * @property calendarsPanel
     * @type iCal.views.index.CalendarsPanel
     * The Calendars Panel instance
     */
    this.calendarsPanel = new iCal.views.index.CalendarsPanel({
      region: 'west',
      width:  200,
      split:  true
    });
    
    /**
     * @property eventsPanel
     * @type iCal.views.index.EventsPanel
     * The main Events Panel instance
     */
    this.eventsPanel = new iCal.views.index.EventsPanel({
      region: 'center'
    });
    
    /**
     * @property bottomPanel
     * @type Ext.Panel
     * The bottom toolbar panel
     */
    this.bottomPanel = new Ext.Panel({
      region: 'south',
      html:   'bottom',
      height: 30
    });
    
    this.viewport = new Ext.Viewport({
      layout: 'border',
      cls:    'ical',
      items:  [
        this.menuPanel,
        this.calendarsPanel,
        this.eventsPanel,
        this.bottomPanel
      ]
    });
  }
});

iCal.OS = new iCal.OS();