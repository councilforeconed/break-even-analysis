export default Ember.Component.extend({
  classNames: ['chart'],

  didInsertElement: function () {
    this.set('svg', document.querySelector('svg'));

    var svg = d3.select(this.get('svg'));

    this.set('height', 400);
    this.set('width', 940);

    var padding = 50;
    this.set('padding', padding);

    var fixedCosts = this.get('fixedCosts');
    var sellingPrice = this.get('sellingPrice');
    var unitCosts = this.get('unitCosts');
    var breakEvenQuantity = this.get('breakEvenQuantity');

    var xWidth = breakEvenQuantity * 2;
    var yHeight = fixedCosts * 5 > breakEvenQuantity * 100 ? fixedCosts * 5 : breakEvenQuantity * 100;

    this.set('xWidth', xWidth);
    this.set('yHeight', yHeight);

    var xScale = d3.scale.linear()
                        .domain([0, xWidth])
                        .range([padding, this.get('width') - padding]);

    var yScale = d3.scale.linear()
                        .domain([0, yHeight])
                        .range([this.get('height') - padding, padding]);

    this.set('xScale', xScale);
    this.set('yScale', yScale);

    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom");

    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left");

    this.set('xAxis', xAxis);
    this.set('yAxis', yAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (this.get('height') - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    // Fixed Costs
    var fixedCostsLine = svg.append("line")
        .attr("x1", padding)
        .attr("y1", yScale(fixedCosts))
        .attr("x2", xScale(xWidth))
        .attr("y2", yScale(fixedCosts))
        .attr("stroke-width", 2)
        .attr("stroke", "orange");

    // Variable Costs
    var variableCostsLine = svg.append("line")
        .attr("x1", padding)
        .attr("y1", yScale(fixedCosts))
        .attr("x2", xScale(xWidth))
        .attr("y2", yScale(fixedCosts))
        .attr("stroke-width", 2)
        .attr("stroke", "orange");

    // Profit
    var profitLine = svg.append("line")
        .attr("x1", padding)
        .attr("y1", yScale(0))
        .attr("x2", xScale(xWidth))
        .attr("y2", yScale(sellingPrice * xWidth))
        .attr("stroke-width", 2)
        .attr("stroke", "green");

    this.set('fixedCostsLine', fixedCostsLine);
    this.set('variableCostsLine', variableCostsLine);
    this.set('profitLine', profitLine);
  },

  updateGraph: function () {

    this.get('fixedCostsLine');
      .attr("x1", this.get('padding'))
      .attr("y1", this.get('yScale')(this.get('fixedCosts')))
      .attr("x2", this.get('xScale')(this.get('xWidth')))
      .attr("y2", this.get('yScale')(this.get('fixedCosts')))
      .attr("stroke-width", 2)
      .attr("stroke", "orange");

    this.get('variableCostsLine');


    this.get('profitLine');



  }.observes('breakEvenQuantity')
});
