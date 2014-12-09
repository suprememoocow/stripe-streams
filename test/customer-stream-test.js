'use strict';

var CustomerStream = require('..').CustomerStream;

describe('customer-stream', function() {
  var stripe;

  before(function() {
    stripe = require('stripe')(process.env.STRIPE_KEY);
  });

  it('should stream customers', function(done) {
    new CustomerStream(stripe)
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
