import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
@IonicPage({
  name: 'IncomePage',
  segment: 'IncomePage/:avatar'
})
@Component({
  selector: 'page-income',
  templateUrl: 'income.html'
})

export class IncomePage {

  myDate=new Date().toISOString();

  time=new Date().toISOString();
  today=this.getTodaystamp(this.myDate);
  maxDate=new Date().toISOString();
  items = {
    course: [],
    courese_time: 0,
    attendance: 0,
    salary:0
  };

  avatar;

  constructor(private commonService: CommonService,
              private navParams:NavParams,
              private navCtrl:NavController,
              private LoadCtrl: LoadingController) {

    this.avatar=this.navParams.get('avatar');
  }


  ionViewDidEnter() {

    let loading = this.LoadCtrl.create({});

    loading.present();

    setTimeout(() => {
      this.myPay(this.getToday());

      setTimeout(() => {
        loading.dismiss();
      }, 500)

    }, 500)

  }

  /**
   * 我的收入
   */


  myPay(time) {
    let param;
    let nowDay = this.getToday();
    if (time) {
      param = {
        r: 'wx_api.teacher.myPay',
        time: time
      };
    }else {
      param = {
        r: 'wx_api.teacher.myPay',
        time: nowDay
      };
    }

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.items = res.result;
        // for(let i=0;i<res.result.course.length;i++){
        //   this.items.course[i].course_starttime=this.commonService.getStrtotime(res.result.course[i].course_starttime);
        //   this.items.course[i].course_endtime=this.commonService.getStrtotime(res.result.course[i].course_endtime);
        // }
        // this.items = res.result;
      } else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }

    })
  }


  /**
   *
   */

  changeTime(myDate){
    this.today=this.getTodaystamp(myDate);
    this.myPay(this.today);
  }
  /**
   *
   * @returns {number}
   */

  getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    return new Date(year, month).getTime() / 1000;
  }

  getTodaystamp(time) {
    let date = time;
    let year = date.slice(0,4);
    let month = date.slice(5,7)-1;
    return new Date(year,month).getTime()/1000;
  }

  /**
   * 常见问题
   */
  problem(){
    this.navCtrl.push('ProblemPage');
  }
}
