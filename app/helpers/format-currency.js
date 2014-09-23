export default Ember.Handlebars.makeBoundHelper(function(number) {
  return numeral(number).format('$0,0.00');
});
