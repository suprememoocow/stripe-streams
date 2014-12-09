# stripe-streams

A library for streaming Stripe API calls

```
npm install stripe-stream
```

## Reasoning

Stripe's API pagenates the results. You can fetch a maximum of 100 items in a single query, after which you need to requery with the `starting_after` parameter set to the last item from the previous query. 

This library allows you to stream results from the Stripe API without having to worry about pagenation. It will be taken care of for you.

For example, to stream a list of customers, you can call:

```javascript
var CustomerStream = require('stripe-stream').CustomerStream;
var stripe = require('stripe')(process.env.STRIPE_KEY);

new CustomerStream(stripe)
      .on('data', function (data) {
        console.log(data);
      });
```

This will fetch all customers from Stripe and return each customer object as an object in an objectstream.

#### Parameters

It is also possible to pass query parameters to Stripe:

```javascript
var CustomerStream = require('stripe-stream').CustomerStream;
var stripe = require('stripe')(process.env.STRIPE_KEY);

// Fetch all new customers in the last day...
new CustomerStream(stripe, { created: { gt: Math.floor(Date.now() / 1000) - 86400 } })
      .on('data', function (data) {
        console.log(data);
      });
```

#### Pipes

Stripe streams are fully compliant node streams, so you can transform them, pipe them to other streams, etc

```javascript
var BalanceHistoryStream = require('stripe-stream').BalanceHistoryStream;
var stripe = require('stripe')(process.env.STRIPE_KEY);
var csv = require('fast-csv');

new BalanceHistoryStream()
  .pipe(new CustomerTransactionTransformer())
  .pipe(csv.createWriteStream({ headers: true }))
  .pipe(fs.createWriteStream('./transactions'))
  
```

# API

The API supports the following streams:

| Stream               | Stripe API |
|----------------------|---|
| BalanceHistoryStream | [https://stripe.com/docs/api/node#balance_history](https://stripe.com/docs/api/node#balance_history)  |
| ChargeStream         | [https://stripe.com/docs/api/node#list_charges](https://stripe.com/docs/api/node#list_charges)  |
| CouponStream         | [https://stripe.com/docs/api/node#list_coupons](https://stripe.com/docs/api/node#list_coupons)  |
| CustomerStream       | [https://stripe.com/docs/api/node#list_customers](https://stripe.com/docs/api/node#list_customers)  |
| InvoiceItemStream    | [https://stripe.com/docs/api/node#list_invoiceitems](https://stripe.com/docs/api/node#list_invoiceitems)  |
| InvoiceStream        | [https://stripe.com/docs/api/node#invoices](https://stripe.com/docs/api/node#invoices)  |
| PlanStream           | [https://stripe.com/docs/api/node#list_plans](https://stripe.com/docs/api/node#list_plans)  |
| RecipientStream      | [https://stripe.com/docs/api/node#list_recipients](https://stripe.com/docs/api/node#list_recipients)  |
| TransferStream       | [https://stripe.com/docs/api/node#list_transfers](https://stripe.com/docs/api/node#list_transfers)  |

# Licence

License
The MIT License (MIT)

Copyright (c) 2014, Andrew Newdigate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


