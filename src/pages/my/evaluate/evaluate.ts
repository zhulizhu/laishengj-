import { Component} from "@angular/core";
import {IonicPage, LoadingController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
@IonicPage({
  name:'EvaluatePage',
  segment:'EvaluatePage/:openid'
})
@Component({
  selector: 'page-evaluate',
  templateUrl: 'evaluate.html'
})

export class EvaluatePage {
  infoArray = ["all", "good-eval", "bad-eval"];
  info = this.infoArray[0];
  list=[];
  thisStartNo;
  starAcArray = [
    {"id":1,"src1":"assets/img/start1-act.png"},
    {"id":2,"src1":"assets/img/start1-act.png"},
    {"id":3,"src1":"assets/img/start1-act.png"},
    {"id":4,"src1":"assets/img/start1-act.png"},
    {"id":5,"src1":"assets/img/start1-act.png"},
  ];

  aver=[];//综合星
  lev1=[];//服务星
  lev2=[];//课程星
  lev3=[];//环境星
  grade;
  goodGrade=[];//好评
  badGrade=[];//差评
  constructor(private LoadCtrl: LoadingController,
              private navParams:NavParams,
              private commonService: CommonService,) {

  }
  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({});
    loading.present();

    setTimeout(() => {
      this.userEval();
      setTimeout(() => {
        loading.dismiss();
      }, 500)

    }, 500)

  }
   /**
 * 我的评价
 */
userEval() {

  let openid = this.navParams.get('openid');
  let param = {
    r: 'wx_api.teacher.myComment',
    openid:openid
  };

  this.commonService.getResult(param).then(res => {
    if(res.status==1){
      this.list=res.result.list;
      this.aver=this.getStart(res.result.avg);
      this.lev1=this.getStart(res.result.level);
      this.lev2=this.getStart(res.result.level2);
      this.lev3=this.getStart(res.result.level3);
      for(let i=0;i<this.list.length;i++){
        this.grade=this.list[i].level_avg;
        if(Number(this.grade)>2){
          this.goodGrade.push(this.list[i]);
        }else{
          this.badGrade.push(this.list[i]);
        }
      }
    }else {
      alert(res.result.message);
      this.ionViewDidEnter();
    }
  })
}

getStart(data){
  let starNoArray = [
    {"id":1,"src1":"assets/img/start1.png"},
    {"id":2,"src1":"assets/img/start1.png"},
    {"id":3,"src1":"assets/img/start1.png"},
    {"id":4,"src1":"assets/img/start1.png"},
    {"id":5,"src1":"assets/img/start1.png"},
  ];
    let item=Math.round(data);
    for(let i=0;i<=Number(item)-1;i++){
      this.thisStartNo={"id":i+1,"src1":"assets/img/start1-act.png"};
      starNoArray[i]=this.thisStartNo;
    }
    for(let i=Number(item);i<5;i++){
      this.thisStartNo={"id":i+1,"src1":"assets/img/start1.png"};
      starNoArray[i]=this.thisStartNo;
    }
   return starNoArray;



}

}
