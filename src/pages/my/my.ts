import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController} from "ionic-angular";
import {CommonService} from "../../providers/CommonService";

declare var $: any;
@IonicPage({
  name: 'MyPage',
  segment: 'MyPage'
})

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})

export class MyPage {

  items = [];
  self = {
    info: {
      realname: '',
      avatar: '',
      openid: '',
    },
    courese_time: '0',
    course: '0',
    attendance: '0',
    stay: '0',
    salary: '0'

  };
  myNum = {};
  signature:'';
  loading;
  loadingCtrl=false;

  constructor(public navCtrl: NavController,
              private LoadCtrl: LoadingController,
              private commonService: CommonService,) {

    this.items = [
      {id: 1, name: "我的学员", icon: "assets/img/xueyuan.png"},
      {id: 2, name: "我的课程", icon: "assets/img/kecheng.png"},
      {id: 3, name: "我的评论", icon: "assets/img/pinglun.png"},
      {id: 4, name: "我的收入", icon: "assets/img/shouru.png"},
      {id: 5, name: "考勤扫码", icon: "assets/img/saoma.png"},
    ];


  }

  ionViewDidEnter() {
    this.loading = this.LoadCtrl.create({});
    this.loading.present();

    setTimeout(() => {
      this.myDetail();
    })

  }

  /**
   *
   * @param id
   */

  itemSelected(id) {
    switch (id) {
      case 1:
        this.navCtrl.push('StudentPage');
        break;
      case 2:
        this.navCtrl.push('CourseTablePage', {openid: this.self.info.openid});
        break;
      case 3:
        this.navCtrl.push('EvaluatePage', {openid: this.self.info.openid});
        break;
      case 4:
        this.navCtrl.push('IncomePage', {avatar: this.self.info.avatar});
        break;
      case 5:
        this.navCtrl.push('opendoorPage', {openid: this.self.info.openid});
        break;
    }
  }

  /**
   * 我的详情
   */

  myDetail() {
    let param = {
      r: 'wx_api.teacher'
    };

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.loadingCtrl=true;
        if(this.loadingCtrl){
          setTimeout(() => {
            this.loading.dismiss();
          }, 500)
        }

        this.self = res.result;
        this.signature=res.result.info.signature;
        this.self.info = res.result.info;
        this.quan(this.self.salary? this.self.salary : '0')
      } else if (res.status == 0) {
        setTimeout(() => {
          this.loading.dismiss();
        }, 500)
        if (res.result.message == '你还不是教练！') {

        } else {
          setTimeout(() => {
            this.loading.dismiss();
          }, 500)
        }

      }

    })
  }

  // 修改签名
  alterSignature() {
    let param = {
      r: 'wx_api.teacher.updateSignature',
      signature:this.signature
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
      } else if (res.status == 0) {

      }

    })
  }



  /**
   *
   */

  quan(salary) {
    salary=(salary/600);
    if(salary>=100){
      salary=85;
    }
    let range = $("#range"), circle1 = $(".circle1"), circle2 = $(".circle2");
    if (range && circle1 && circle2) {
      //percent1 =  $(".circle1")的百分比/ 100,percent2 = ($(".circle1")的百分比*$(".circle2")的百分比) / 10000
      let percent1 = 70 / 100, perimeter = Math.PI * 2 * 70, percent2 = (salary * 70) / 10000;
      circle1.attr('stroke-dasharray', perimeter * percent1 + " " + perimeter * (1 - percent1));
      circle2.attr('stroke-dasharray', perimeter * percent2 + " " + perimeter * (1 - percent2));
    }
  }


}
