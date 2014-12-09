'use strict';

var StripeStream = require('./stripe-stream');
var util = require('util');

function PlanStream(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(PlanStream, StripeStream);

PlanStream.prototype._stripeList = function(query) {
  return this.stripeClient.plans.list(query);
};


module.exports = PlanStream;
