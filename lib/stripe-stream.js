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
  if(this._spooling) {
    this._nextRead = true;
    return;
  }

  var self = this;

  var query = extend({ limit: 100 }, this.query);

  /* Don't include this in the extend! */
  if(this._startingAfter) {
    query.starting_after = this._startingAfter;
  }

  this._fetching = true;
  return this._stripeList(query)
    .then(function(results) {
      self._spooling = true;
      self._fetching = false;

      results.data.forEach(function(item) {
        self.push(item);
      });

      /* Push a null if we're at the end of the stream */
      if (!results.has_more || results.data.length === 0) {
        self.push(null);
      } else {
        self._startingAfter = results.data[results.data.length - 1].id;
      }

      self._spooling = false;

      if(self._nextRead) {
        self._nextRead = false;
        self._read();
      }

    }, function(err) {
      self._fetching = false;
      self.emit('error', err);
    });
};

module.exports = StripeStream;

