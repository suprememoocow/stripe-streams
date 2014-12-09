'use strict';

var extend = require('util-extend');

var Readable = require('stream').Readable;
var util = require('util');

function StripeStream(query/*, options*/) {
  Readable.call(this, { objectMode: true });
  this.query = query;
}
util.inherits(StripeStream, Readable);

StripeStream.prototype._read = function() {
  if(this._fetching) return;

  var self = this;

  var query = extend({ limit: 100 }, this.query);

  /* Don't include this in the extend! */
  if(this._startingAfter) {
    query.starting_after = this._startingAfter;
  }

  self._fetching = true;
  return this._stripeList(query)
    .then(function(results) {
      if (results.data.length === 0) {
        self.push(null);
        return;
      }

      self._startingAfter = results.data[results.data.length - 1].id;
      self._fetching = false;

      results.data.forEach(function(item) {
        self.push(item);
      });

      if (!results.has_more) {
        self.push(null);
      }
    });
};

module.exports = StripeStream;

