import {Component} from "@angular/core";
// import * as echarts from 'echarts';
import {IonicPage, LoadingController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name: 'FitactionPage',
  segment: 'FitactionPage/:openid'
})
@Component({
  selector: 'page-fitnessdetail',
  templateUrl: 'fitaction.html'
})

export class FitactionPage {

  builder=[];

  constructor(private LoadCtrl: LoadingController,
              private navParams:NavParams,
              private commonService: CommonService,) {

  }

  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({});
    loading.present();

    setTimeout(() => {
      this.userInfor();
      setTimeout(() => {
        loading.dismiss();
      }, 500)

    }, 500)

  }

  /**
   * 用户信息
   */
  userInfor() {

    let openid = this.navParams.get('openid');
    let param = {
      r: 'wx_api.teacher.get_user_builder',
      openid: openid,
      wxref: 'mp.weixin.qq.com'
    };

    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        let b = this.commonService.isEmptyObject(res.result.member.builder);
        if(b){
          for(let i=0;i<res.result.member.builder.length;i++){
            for(let j=0;j<res.result.member.builder[i].content.length;j++){
              this.builder.push(res.result.member.builder[i].content[j]);
            }
          }
        }else {
          this.builder=[];
        }


      } else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }
    })
  }

}

