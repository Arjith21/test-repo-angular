import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  title = 'angular-app';
  paymentAmount = 10.00;
  isGettingCheckout = false;

  connectedAcc: string = 'acct_1HZFstKG6Elb1SM1'
  customerId: any = 'cus_IACqDC6VSPudux'//'cus_I9C8TvbCTsCoe8'
  productId: any = 'prod_I9y6GA0nvQw0Yi'
  priceId: any = 'price_1HZeAPKG6Elb1SM1RQ1eNqqM'


  constructor(private http: HttpClient) { }

  async payAmount() {
    // Replace with your own publishable key:    https://dashboard.stripe.com/test/apikeys
    const PUBLISHABLE_KEY = 'pk_test_51HO0KCESOl6tMOVp9lRJRna9R7lU408bAnZCxpEvMqnDBmGcu0lZTEpo0i2VMXRvDkzZfMhSzA5288DqmXCKwCTD00w71tQarJ';

    // Replace with the domain you want your users to be redirected back to after payment
    const DOMAIN = window.location.hostname;

    // Replace with a SKU for your own product (created either in the Stripe Dashboard or with the API)
    const SUBSCRIPTION_BASIC_PLAN_ID = 'plan_1234';

    // try {
    const stripe = await loadStripe(PUBLISHABLE_KEY,{ stripeAccount: this.connectedAcc});

    const body = {
      connectedAcc: this.connectedAcc,
      customerId: this.customerId,
      productId: this.productId,
      priceId: this.priceId
    }

    const headers = {
      'Content-Type': 'application/json'
    }
    this.http.post<any>('http://localhost:3001/create-checkout-session', body, { headers })
      .subscribe(session => {
        console.log('session ' + session.id);
        return stripe.redirectToCheckout({ sessionId: session.id })
        .then((result) => {
          console.log(result);
        });
      })
  }



}
