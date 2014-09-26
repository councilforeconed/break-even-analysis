// import Respondent from 'appkit/models/respondent';

export default Ember.ObjectController.extend({

  fixedCosts: 200,
  unitCosts: 20,
  sellingPrice: 40,

  breakEvenQuantity: function () {
    var breakEvenQuantity = this.get('fixedCosts') / (this.get('sellingPrice') - this.get('unitCosts'));
    return breakEvenQuantity;
  }.property('fixedCosts', 'unitCosts', 'sellingPrice')

});
