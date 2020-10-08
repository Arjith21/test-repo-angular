import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  sessionId: string = '';
  connectedAcc: string = 'acct_1HZFstKG6Elb1SM1'
  customer: any;
  phone: any;
  email: any;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];

      console.log('---session_id--' + this.sessionId)
      this.retrieveSession(this.sessionId);
    });
    
  }
  

  async retrieveSession(sessionId) {
    const body = {
      connectedAcc: this.connectedAcc,
      sessionId: sessionId
    }
    this.http.post<any>('http://localhost:3001/retrieve-customer', body)
      .subscribe(customer => {
        console.log('session.customer.name----' + JSON.stringify(customer))
         this.customer = customer.name;
         this.phone = customer.phone;
         this.email = customer.email;
      })
    
  }
}
