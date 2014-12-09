'use strict';

var BalanceHistoryStream = require('..').BalanceHistoryStream;

describe('balance-history-stream', function() {
  var stripe;

  before(function() {
    stripe = require('stripe')(process.env.STRIPE_KEY);
  });

  it('should stream transactions', function(done) {
    new BalanceHistoryStream(stripe, { type: 'transfer' })
      .on('data', function (data) {
        console.log(data);
      })
      .on('error', function (err) {
        done(err);
      })
      .on('end', function () {
        done();
      });
  });

});
