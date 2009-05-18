/**
 * @class iCal.views.index.EventsPanel
 * @extends Ext.Panel
 * Displays all the events for a given month
 */
iCal.views.index.EventsPanel = Ext.extend(Ext.Panel, {
  defaultType: 'event-cell',
  layout:      'table',
  layoutConfig: {
    rows:    6, //top row used for day names
    columns: 7,
    
    tableAttrs: {
      style: {
        width:  '100%',
        height: '100%'
      }
    }
  },
  
  /**
   * @property cls
   * @type String
   * The CSS class to apply to the EventsPanel containing div
   */
  cls: 'ical-events-panel',
  
  /**
   * @property currentMonth
   * @type Number
   * The current month number (between 1 and 12)
   */
  currentMonth: new Date().format('n'),
  
  /**
   * @property currentYear
   * @type Number
   * The current year
   */
  currentYear: new Date().format('Y'),

  /**
   * Sets this component up, creates the cells
   */
  initComponent: function() {
    /**
     * @property cells
     * @type Array
     * An array of Event cells
     */
    this.cells = [];
    
    Ext.each(Date.dayNames, function(dayName) {
      this.cells.push({
        xtype: 'panel',
        height: 20,
        cls:    'ical-event-panel-day',
        html:   'Sunday' //dayName
      });
    }, this);
    
    /**
     * Create a 5 x 7 grid of cells for this month
     */
    for (var col=1; col < 8; col++) {
      for (var row=1; row < 6; row++) {
        this.cells.push({
          html: 'test - column ' + col + ' row ' + row
        });
      };
    };
    
    Ext.apply(this, {
      items: this.cells,
      title: 'Current month'
    });
    
    iCal.views.index.EventsPanel.superclass.initComponent.apply(this, arguments);
    
    this.updateTitle();
  },
  
  /**
   * Sets this panel's title according to the current month and year
   */
  updateTitle: function() {
    this.setTitle(String.format("{0} {1}", Date.monthNames[this.currentMonth - 1], this.currentYear));
  },
  
  /**
   * Sets the current month and updates the title
   * @param {Number} monthNumber The new month number (between 1 and 12)
   */
  setMonth: function(monthNumber) {
    if (monthNumber >= 1 && monthNumber <= 12) {
      this.currentMonth = monthNumber;
      this.updateTitle();
    }
  },
  
  /**
   * Sets the current year and updates the title
   * @param {Number} yearNumber The new year
   */
  setYear: function(yearNumber) {
    if (yearNumber >= 1 && yearNumber <= 12) {
      this.currentYear = yearNumber;
      this.updateTitle();
    }
  },
  
  /**
   * Moves the calendar forward one month
   */
  incrementMonth: function() {
    if (this.currentMonth == 12) {
      this.setMonth(1);
      this.setYear(this.currentYear + 1);
    } else {
      this.setMonth(this.currentMonth + 1);
    }
  },
  
  /**
   * Moves the calendar back one month
   */
  decrementMonth: function() {
    if (this.currentMonth == 1) {
      this.setMonth(12);
      this.setYear(this.currentYear - 1);
    } else {
      this.setMonth(this.currentMonth - 1);
    }
  }
});