/**
 * @class iCal.views.EventCell
 * @extends Ext.Component
 * A single Event cell to be rendered inside an EventsPanel
 */
iCal.views.EventCell = Ext.extend(Ext.Component, {
  /**
   * @property defaultCls
   * @type String
   * The CSS class to apply to month cells (defaults to 'ical-event-cell')
   */
  defaultCls: 'ical-event-cell',
  
  /**
   * @property selectedCls
   * @type String
   * The CSS class to apply to a cell when it is selected (defaults to 'ical-event-cell-selected')
   */
  selectedCls: 'ical-event-cell-selected',
  
  /**
   * @property todayCls
   * @type String
   * The CSS class to apply to a cell when it represents today's date (defaults to 'ical-event-cell-today')
   */
  todayCls: 'ical-event-cell-today',
  
  /**
   * @property otherMonthCls
   * @type String
   * The CSS class to apply to a cell when it is rendered but does not represent a day in the current month
   */
  otherMonthCls: 'ical-event-cell-other-month',
  
  /**
   * Sets up events...
   */
  constructor: function() {
    Ext.apply(this, {
      /**
       * @property currentDay
       * @type Number
       * The day number this cell currenly represents
       */
      currentDay: 1
    });
    
    iCal.views.EventCell.superclass.constructor.apply(this, arguments);
    
    this.addEvents(
      /**
       * @event click
       * Fires when this cell has been clicked
       * @param {iCal.views.EventCell} cell The cell object
       */
      'click'
    );
  },
  
  /**
   * Sets the day of the month this cell currently represents
   * @param {Number} day The day number to have this cell represent
   */
  setCurrentDay: function(day) {
    if (day >= 1 && day <= 31) this.currentDay = day;
  },
  
  /**
   * Renders the HTML for this component
   * @param {Ext.Container} ct The container to render this component to
   * @param {Number} position The position within the parent container to render this component to
   */
  onRender: function(ct, position) {
    this.el = ct.createChild({
      cls: 'ical-event-cell-contents',
      children: [
        {
          tag: 'span',
          html: this.currentDay
        }
      ]
    });
    
    ct.addClass(this.defaultCls);
  
    iCal.views.EventCell.superclass.onRender.apply(this, arguments);
    
    this.el.on('click', function() {
      this.fireEvent('click', this);
    }, this);
  }
});

Ext.reg('event-cell', iCal.views.EventCell);