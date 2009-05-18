/**
 * @class iCal.views.index.CalendarsPanel
 * @extends Ext.Panel
 * The list of Calendars managed by this application
 */
iCal.views.index.CalendarsPanel = Ext.extend(Ext.Panel, {

  initComponent: function() {
    Ext.applyIf(this, {
      html: 'Calendars'
    });
    
    iCal.views.index.CalendarsPanel.superclass.initComponent.apply(this, arguments);
  }
});