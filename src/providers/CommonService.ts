/**
 * Created by 聚米粒 on 2017/6/20.
 */
import {Injectable} from "@angular/core";
import {HttpService} from "./HttpService";
import {ToastController} from "ionic-angular";
import {APP_SERVICE_URL} from "./Common";

@Injectable()
export class CommonService {
    public img;
    public path;

    constructor(public httpService: HttpService, private toastCtrl: ToastController) {
    }



    getResult(param) {
            return this.httpService.post(APP_SERVICE_URL, param);

    }


    getTimeStamp(time) {
        var parts = time.match(/\d+/g);
        return new Date(parts[0] + '-' + parts[1] + '-' + parts[2] + ' ' + parts[3] + ':' + parts[4] + ':' + parts[5]).getTime();
    }

    getStrtotime(time) {
        return this.getTimeStamp(time) / 1000;
    }

    myToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 1000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: '关闭'
        });
        toast.present();
    }
  /**
   * 判断json是否为空
   * @param e
   * @returns {boolean}
   */
  isEmptyObject(e) {
    let t;
    for (t in e)
      return !0;
    return !1
  }


  public timeStamp(){
    let time=Math.round(new Date().getTime()/1000);
    return time;
  }
}
