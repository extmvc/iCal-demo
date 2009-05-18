ExtMVC.Model.define("Event", {
  fields: [
    {name: 'id',          type: 'number'},
    {name: 'title',       type: 'string'},
    {name: 'calendar_id', type: 'number'},
    {name: 'notes',       type: 'string'},
    {name: 'url',         type: 'string'}
  ],
  belongsTo: 'Calendar'
});