'use strict';

var StripeStream = require('./stripe-stream');
var util = require('util');

function CouponStream(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(CouponStream, StripeStream);

CouponStream.prototype._stripeList = function(query) {
  return this.stripeClient.coupons.list(query);
};


module.exports = CouponStream;
