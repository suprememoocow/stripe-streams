'use strict';

var InvoiceStream = require('..').InvoiceStream;

describe('invoice-stream', function() {
  var stripe;

  before(function() {
    stripe = require('stripe')(process.env.STRIPE_KEY);
  });

  it('should stream invoices', function(done) {
    new InvoiceStream(stripe)
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
