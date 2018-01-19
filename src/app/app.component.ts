import {Component} from '@angular/core';
import {AlertController, MenuController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CommonService} from "../providers/CommonService";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  public backButtonPressed: boolean = false;

  constructor(platform: Platform,
              statusBar: StatusBar,
              private commonService: CommonService,
              private alertCtrl: AlertController,
              public menuCtrl:MenuController,
              splashScreen: SplashScreen,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuCtrl.enable(false);
      this.myDetail();

    });
  }

  myDetail() {
    let param = {
      r: 'wx_api.teacher',
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.rootPage = 'MyPage';
      } else if (res.status == 0) {
        if (res.result.message == '您还不是教练！') {
          let alerting = this.alertCtrl.create({
            title: '温馨提示',
            message:'你还不是教练',
            buttons: [
              {
                text:'确定',
                handler:data=>{
                  window.opener=null;
                  window.open('','_self');
                  window.close();
                }
              }
            ]
          });
          alerting.present()
        } else {

        }

      }

    })
  }

}
