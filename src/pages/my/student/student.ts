import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name: 'StudentPage',
  segment: 'StudentPage'
})
@Component({
  selector: 'page-student',
  templateUrl: 'student.html'
})

export class StudentPage {

  lists=[];
  dataJson=false;

  constructor(public navCtrl: NavController,
              private LoadCtrl:LoadingController,
              private commonService:CommonService) {

  }



  ionViewDidEnter() {

    let loading=this.LoadCtrl.create({

    });

    loading.present();

    setTimeout(()=>{
      this.studentList();

      setTimeout(()=>{
        loading.dismiss();
      },500)

    })

  }

  /**
   * 学员列表
   */
  studentList(){
    let param={
      r:'wx_api.teacher.getMember',
    };

    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        this.lists=res.result.list;
      }else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }

    })
  }

  /**
   * 学员详情
   * @param openid
   */
  studentDetail(openid) {
    this.navCtrl.push('StudentdetailPage',{openid:openid});
  }

}
