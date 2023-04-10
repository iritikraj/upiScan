import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Dialog } from '@capacitor/dialog';
import { StatusBar, Style } from '@capacitor/status-bar';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public platform: Platform) {
    this.showSplash()
    this.initializeApp()
  }

  private async showSplash(){
    await this.platform.ready();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      document.body.setAttribute('data-theme', 'light');
      document.body.classList.toggle('dark', false);
      const setStatusBar = async () => {
        await StatusBar.setStyle({ style: Style.Default });
        await StatusBar.setBackgroundColor({ color: '#6973ff' });
        // await StatusBar.show(Animation.);
        // await StatusBar.setOverlaysWebView({ overlay: true });
      };
      setStatusBar();
    });
  };
}
