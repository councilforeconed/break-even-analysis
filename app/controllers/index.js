// import Respondent from 'appkit/models/respondent';

export default Ember.ObjectController.extend({

  fixedCosts: 0,
  unitCosts: 0,
  sellingPrice: 0,

  breakEvenQuantity: function () {
    var breakEvenQuantity = this.get('fixedCosts') / (this.get('sellingPrice') - this.get('unitCosts'));
    isNan(breakEvenQuantity) ? return '--' : return breakEvenQuantity;
  }.property('fixedCosts', 'unitCosts', 'sellingPrice')

});
