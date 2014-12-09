'use strict';

var StripeStream = require('./stripe-stream');

var util = require('util');

function RecipientStream(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(RecipientStream, StripeStream);

RecipientStream.prototype._stripeList = function(query) {
  return this.stripeClient.recipients.list(query);
};

module.exports = RecipientStream;
