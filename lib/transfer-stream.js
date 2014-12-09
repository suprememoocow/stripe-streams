'use strict';

var StripeStream = require('./stripe-stream');

var util = require('util');

function TransferStream(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(TransferStream, StripeStream);

TransferStream.prototype._stripeList = function(query) {
  return this.stripeClient.transfers.list(query);
};

module.exports = TransferStream;
