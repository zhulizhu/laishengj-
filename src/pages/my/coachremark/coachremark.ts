import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name:'CoachremarkPage',
  segment:'CoachremarkPage/:openid/:avatar'
})
@Component({
  selector: 'page-fitnessdetail',
  templateUrl: 'coachremark.html'
})

export class CoachremarkPage {
  avatar:'';
  comment=[];

  constructor(public navCtrl: NavController,
              private LoadCtrl: LoadingController,
              private commonService:CommonService,
              private navParams: NavParams) {

    this.avatar=this.navParams.get('avatar')
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
  userInfor(){
    let openid =this.navParams.get('openid');
    let param={
      r:'wx_api.teacher.get_user_builder',
      openid:openid,
      wxref:'mp.weixin.qq.com'
    };

    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        let a=this.commonService.isEmptyObject(res.result.comment);
        for(let i=0;i<res.result.comment.length;i++){
          let c=this.commonService.isEmptyObject(res.result.comment[i].content);
          if(!c){
            res.result.comment[i].content=[];
          }
        }
        this.comment=a?res.result.comment:[];
      }else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }
    })
  }


}

