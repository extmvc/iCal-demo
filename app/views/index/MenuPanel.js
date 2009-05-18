/**
 * @class iCal.views.index.MenuPanel
 * @extends Ext.Panel
 * The top menu panel for the iCal application
 */
iCal.views.index.MenuPanel = Ext.extend(Ext.Panel, {

  initComponent: function() {
    /**
     * @property todayButton
     * @type Ext.Button
     * The 'Today' button
     */
    this.todayButton = new Ext.Button({
      text:   'Today',
      scope:   this,
      handler: this.onTodayButtonClick
    });
    
    /**
     * @property backButton
     * @type Ext.Button
     * The Back button - expected to scroll back a month
     */
    this.backButton = new Ext.Button({
      text:    '<',
      scope:   this,
      handler: this.onBackButtonClick
    });
    
    /**
     * @property forwardButton
     * @type Ext.Button
     * The Forward button - expected to scroll forwards a month
     */
    this.forwardButton = new Ext.Button({
      text:    '>',
      scope:   this,
      handler: this.onForwardButtonClick
    });
    
    Ext.applyIf(this, {
      layout: 'hbox',
      items: [
        this.todayButton,
        this.backButton,
        this.forwardButton
      ]
    });
    
    iCal.views.index.MenuPanel.superclass.initComponent.apply(this, arguments);
    
    this.addEvents(
      /**
       * @event today-button-clicked
       * Fired when the 'Today' button is clicked
       * @param {Ext.Button} button The 'Today' button object
       */
      'today-button-clicked',
      
      /**
       * @event back-button-clicked
       * Fired when the 'Back' button is clicked
       * @param {Ext.Button} button The back button object
       */
      'back-button-clicked',
      
      /**
       * @event forward-button-clicked
       * Fired when the 'Forward' button is clicked
       * @param {Ext.Button} button The forward button object
       */
      'forward-button-clicked'
    );
  },
  
  /**
   * Called when the 'Today' button is clicked.  Fires the 'today-button-clicked' event
   * @param {Ext.Button} todayButton The today button
   */
  onTodayButtonClick: function(todayButton) {
    this.fireEvent('today-button-clicked', todayButton);
  },
  
  /**
   * Called when the Back button is clicked.  Fires the 'back-button-clicked' event
   * @param {Ext.Button} backButton The back button
   */
  onBackButtonClick: function(backButton) {
    this.fireEvent('back-button-clicked', backButton);
  },

  /**
   * Called when the Forward button is clicked.  Fires the 'forward-button-clicked' event
   * @param {Ext.Button} forwardButton The forward button
   */
  onForwardButtonClick: function(forwardButton) {
    this.fireEvent('forward-button-clicked', forwardButton);
  }
});