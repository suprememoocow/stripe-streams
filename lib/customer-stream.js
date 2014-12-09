'use strict';

var StripeStream = require('./stripe-stream');

var util = require('util');

function CustomerStream(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(CustomerStream, StripeStream);

CustomerStream.prototype._stripeList = function(query) {
  return this.stripeClient.customers.list(query);
};

module.exports = CustomerStream;
