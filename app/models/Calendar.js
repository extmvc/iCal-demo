ExtMVC.Model.define("Calendar", {
  fields: [
    {name: 'id',   type: 'number'},
    {name: 'name', type: 'string'}
  ],
  hasMany: "Event"
});