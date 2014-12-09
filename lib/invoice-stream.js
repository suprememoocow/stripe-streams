'use strict';

var StripeStream = require('./stripe-stream');

var util = require('util');

function InvoiceStream(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(InvoiceStream, StripeStream);

InvoiceStream.prototype._stripeList = function(query) {
  return this.stripeClient.invoices.list(query);
};

module.exports = InvoiceStream;
