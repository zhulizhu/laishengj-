import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name: 'opendoorPage',
  segment: 'opendoorPage/:openid'
})
@Component({
  selector: 'page-opendoor',
  templateUrl: 'opendoor.html'
})

export class opendoorPage {

  time;
  times;
  list = [];


  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private LoadCtrl: LoadingController,
              private commonService: CommonService) {

  }


  ionViewDidEnter() {

    let loading = this.LoadCtrl.create({});

    loading.present();

    setTimeout(() => {

      this.record();
      setTimeout(() => {
        loading.dismiss();
      }, 500)

    }, 500)

  }

  /**
   * 开门
   */
  openDoor() {
    let openid = this.navParams.get('openid');
    let param = {
      r: 'wx_api.lock.teacher_open',
      openid: openid,
    };

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
      } else if (res.status == 0) {
        if (res.result.message == 'device offline') {
          alert('开门失败');
          this.ionViewDidEnter();
        } else {
          alert(res.result.message);
          this.ionViewDidEnter();
        }

      }

    })
  }

  /**
   * 考勤记录
   */
  record() {
    let openid = this.navParams.get('openid');
    let param = {
      r: 'wx_api.teacher.teacher_lock_history',
      openid: openid,
    };

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.list = res.result.list;
        for (let i = 0; i < this.list.length; i++) {
          this.time = this.list[i].record;
          for (let j = 0; j < this.time.length; j++) {
            this.time[j].week = this.getWeekNum(this.time[j].createtime);
          }


        }
      } else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }

    })
  }

  getKeys(item) {
    return Object.keys(item);
  }

  /**
   * 周
   * @param firstday
   * @returns {any}
   */
  public getWeekNum(time) {
    let week;
    let firstday = new Date(time * 1000).getDay();
    if (firstday == 0) {
      week = "星期日";
    } else if (firstday == 1) {
      week = "星期一";
    } else if (firstday == 2) {
      week = "星期二";
    } else if (firstday == 3) {
      week = "星期三";
    } else if (firstday == 4) {
      week = "星期四";
    } else if (firstday == 5) {
      week = "星期五";
    } else if (firstday == 6) {
      week = "星期六";
    }
    return week;
  }


}
