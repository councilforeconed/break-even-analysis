export default Ember.Handlebars.makeBoundHelper(function(number) {
  if (number.toString() === number) return number;
  if (isNaN(number) || number < 0) return "--";
  return numeral(number).format('0.00');
});
