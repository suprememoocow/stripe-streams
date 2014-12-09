'use strict';

var StripeStream = require('./stripe-stream');
var util = require('util');

function ChargeStream(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(ChargeStream, StripeStream);

ChargeStream.prototype._stripeList = function(query) {
  return this.stripeClient.charges.list(query);
};


module.exports = ChargeStream;
