'use strict';

var StripeStream = require('./stripe-stream');

var util = require('util');

function InvoiceItemStream(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(InvoiceItemStream, StripeStream);

InvoiceItemStream.prototype._stripeList = function(query) {
  return this.stripeClient.invoiceItems.list(query);
};

module.exports = InvoiceItemStream;
