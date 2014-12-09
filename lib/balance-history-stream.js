'use strict';

var StripeStream = require('./stripe-stream');

var util = require('util');

function BalanceHistory(stripeClient, query, options) {
  StripeStream.call(this, query, options);
  this.stripeClient = stripeClient;
}
util.inherits(BalanceHistory, StripeStream);

BalanceHistory.prototype._stripeList = function(query) {
  return this.stripeClient.balance.listTransactions(query);
};

module.exports = BalanceHistory;
