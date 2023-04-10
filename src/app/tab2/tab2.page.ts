import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Browser } from '@capacitor/browser';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  scanActive: boolean = false;
  url: any;
  upiId: any;

  constructor(private toastController: ToastController) {}
  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();
    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.scanActive = false;
        this.upiId = result.content;
        console.log(result.content); //The QR content will come out here
        //Handle the data as your heart desires here
        this.payNow();
       
      } else {
        this.presentToast()
        console.log('No Data Found')
      }
    } else {
      alert('NOT ALLOWED!');
      console.log('NOT ALLOWED!')
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please Try Again Later!',
      duration: 1500,
      icon: 'globe',
      position: 'bottom'
    });

    await toast.present();
  }

  payNow(){
    let name = 'Swapnil'
    let upi = this.upiId.split(" ").join("")
    let amount = 2
    let note = 'Payingforproduct'
    console.log(name , upi , amount , note)

    this.url = `upi://pay?pa=${upi}&pn=${upi}&am=${amount}&cu=INR&tn=${note}&mode=02`;
    this.openBrowser()

  }

  async openBrowser(){
    console.log('browser opened')
    await Browser.open({url : this.url})
  }
}




