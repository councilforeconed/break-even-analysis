/* global numeral */

export default Ember.Handlebars.makeBoundHelper(function(number) {
  if (number.toString() === number) return number;
  return numeral(number).format('0.00%');
});
