export default Ember.Component.extend({
  classNames: ['chart'],

  height: 400,
  width: 940,

  padding: 50,

  unitCosts: function () {
    return parseInt(this.get('unitCostsValue'), 10);
  }.property('unitCostsValue'),

  fixedCosts: function () {
    return parseInt(this.get('fixedCostsValue'), 10);
  }.property('fixedCostsValue'),

  sellingPrice: function () {
    return parseInt(this.get('sellingPriceValue'), 10);
  }.property('sellingPriceValue'),

  xWidth: function () {
    return this.get('breakEvenQuantity') * 2;
  }.property('breakEvenQuantity'),

  yHeight: function () {
    if (this.get('fixedCosts') * 5 > this.get('breakEvenQuantity') * 100) {
      return this.get('fixedCosts') * 5;
    } else {
      return this.get('breakEvenQuantity') * 100;
    }
  }.property('breakEvenQuantity', 'fixedCosts'),

  xScale: function () {
    return d3.scale.linear()
             .domain([0, this.get('xWidth')])
             .range([this.get('padding'), this.get('width') - this.get('padding')]);
  }.property('xWidth', 'padding', 'width'),

  yScale: function () {
    return d3.scale.linear()
                   .domain([0, this.get('yHeight')])
                   .range([this.get('height') - this.get('padding'), this.get('padding')]);
  }.property('yHeight', 'height', 'padding'),

  xAxis: function () {
    return d3.svg.axis()
                 .scale(this.get('xScale'))
                 .orient("bottom");
  }.property('xScale'),

  yAxis: function () {
    return d3.svg.axis()
                 .scale(this.get('yScale'))
                 .orient("left");
  }.property('yScale'),

  didInsertElement: function () {
    var self = this;
    this.set('svg', document.querySelector('svg'));

    var svg = d3.select(this.get('svg'));

    var xScale = this.get('xScale');
    var yScale = this.get('yScale');
    var xAxis = this.get('xAxis');
    var yAxis = this.get('yAxis');

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (this.get('height') - this.get('padding')) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + this.get('padding') + ",0)")
        .call(yAxis);

    // Fixed Costs
    var fixedCostsLine = svg.append("line")
        .attr("x1", this.get('padding'))
        .attr("y1", yScale(this.get('fixedCosts')))
        .attr("x2", xScale(this.get('xWidth')))
        .attr("y2", yScale(this.get('fixedCosts')))
        .attr("stroke-width", 2)
        .attr("stroke", "orange");

    // Variable Costs
    var variableCostsLine = svg.append("line")
        .attr("x1", this.get('padding'))
        .attr("y1", yScale(this.get('fixedCosts')))
        .attr("x2", xScale(this.get('xWidth')))
        .attr("y2", yScale(this.get('fixedCosts') + this.get('unitCosts') * this.get('xWidth')))
        .attr("stroke-width", 2)
        .attr("stroke", "red");

    // Profit
    var profitLine = svg.append("line")
        .attr("x1", this.get('padding'))
        .attr("y1", yScale(0))
        .attr("x2", xScale(this.get('xWidth')))
        .attr("y2", yScale(this.get('sellingPrice') * this.get('xWidth')))
        .attr("stroke-width", 2)
        .attr("stroke", "green");

    this.set('fixedCostsLine', fixedCostsLine);
    this.set('variableCostsLine', variableCostsLine);
    this.set('profitLine', profitLine);
  },

  updateFixedCostsLine: function () {
    this.get('fixedCostsLine')
      .attr("y1", this.get('yScale')(this.get('fixedCosts')))
      .attr("y2", this.get('yScale')(this.get('fixedCosts')))
  }.observes('fixedCosts'),

  updateVariableCostsLine: function () {
    var totalCosts = this.get('fixedCosts') + this.get('unitCosts');
    this.get('variableCostsLine')
      .attr("y2", this.get('yScale')(totalCosts * this.get('xWidth')))
  }.observes('fixedCosts', 'unitCosts'),

  updateProfitLine: function () {
    this.get('profitLine')
      .attr("y2", this.get('yScale')(this.get('sellingPrice') * this.get('xWidth')));
  }.observes('sellingPrice')
});
