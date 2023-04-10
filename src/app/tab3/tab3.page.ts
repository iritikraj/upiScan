import { Component, ViewEncapsulation } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { NativeAudio } from '@capacitor-community/native-audio';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userProfileURL: string | undefined;

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  qrData = '';
  createdCodeName = '';

  constructor(private toastController:ToastController) {}

  ngOnInit(){
    NativeAudio.preload({
      assetId: 'qrgeneratednotification',
      assetPath: 'http://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg',
      audioChannelNum: 1,
      isUrl: false
  });
  }
    
  createQrCode () {
    (this.qrData == '') ? this.presentToast('Please Enter Any Text!') : '';
    this.createdCodeName = this.qrData;
    console.log(this.createdCodeName);
  }

  async presentToast(message:any) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: message,
      duration: 1500,
      position: 'bottom',
      icon: 'log-in-outline'
    });
    await toast.present();
  }

  saveImage(){
    if(this.qrData == ''){
     this.presentToast('Please Enter Any Text!');
    } else {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      const imageData = canvas.toDataURL('image/jpeg')
      console.log(imageData , 'imageData')
      this.savePicture(imageData)
    }
  }

  async savePicture(photo: any) {
    const base64Data = photo;
    // Write the file to the data directory
    const fileName =  this.createdCodeName +  new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.External
    }).then((info) => console.log('Stat Info: ',  info))
    .catch((e) => console.log('Error occurred while doing stat: ', e));
    this.presentToast('Image saved successfully!')
    this.playSound()
    console.log(savedFile , 'savedFile')
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  playSound(){
    NativeAudio.play({
      assetId: 'qrgeneratednotification',
      time: 6.0
    });
    NativeAudio.isPlaying({
      assetId: 'qrgeneratednotification'
    })
    .then(result => {
      console.log(result.isPlaying);
    })
  }
}
