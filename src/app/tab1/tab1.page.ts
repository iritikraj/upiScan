import { Component } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  upiForm!: FormGroup;
  upi: any
  name: any;
  url: any;
  amount: any;
  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(){
    this.upiForm = this.formBuilder.group({
      upi: this.upi,
      name: this.name,
      amount: this.amount
  })}

  payNow(){
    let name = this.upiForm.value.name.split(" ").join("")
    let upi = this.upiForm.value.upi.split(" ").join("")
    let amount = parseInt(this.upiForm.value.amount)
    let note = 'Payingforproduct'
    const tid = this.getRandomString();
    const orderId = this.getRandomString();
    console.log(name , upi , amount , note , tid , orderId)

    this.url = `upi://pay?pa=${upi}&pn=${upi}&tid=${tid}&am=${amount}&cu=INR&tn=${note}&tr=${orderId}&mode=02`;
    this.openBrowser()

    
    // this.url = `upi://pay?pa=${upi}&pn=${upi}&tr=8312916361&am=${amount}&mode=02`
    /**
     * sample url :- upi://pay?pa=payu@axisbank&pn=SMSPLUS&tr=8312916361&am=10.17
     * sample url provided by Harish :- upi://pay?pa=abc@ybl&pn=Sathishkumar&am=1&mode=02
     * */
    
    // this.url = `upi://pay?pa=${upi}&pn=${upi}&mode=02&am=${amount}&cu=INR&mc=&tr=102030402`
    // this.url = `upi://pay?pa=${upi}&pn=${name}&tn=${note}&am=${this.upiForm.value.amount}&mode=02`
    // upi://pay?pa=abc@ybl&pn=Sathishkumar&am=1&mode=02
    // upi://pay?pa=7596858593@paytm&pn=RituMahato&tn=transactionNote&am=5&mode=02
  }

  async openBrowser(){
    console.log('browser opened')
    await Browser.open({url : this.url})
  }

  async info(){
     await Browser.open({url : 'https://www.linkedin.com/in/iritiikk/'})
  }

  getRandomString() {
    const len = 10;
    const arr = '1234567890asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM';
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }
}
