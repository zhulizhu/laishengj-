import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
declare var $: any;
@IonicPage({
  name: 'StudentdetailPage',
  segment: 'StudentdetailPage/:openid'
})
@Component({
  selector: 'page-studentdetail',
  templateUrl: 'studentdetail.html'
})

export class StudentdetailPage {

  infoArray = ['all', 'payment', 'use'];
  info = this.infoArray[0];

  myDate=new Date().toISOString();
  today;
  time=new Date().toISOString();
  maxDate=new Date().toISOString();

  items={
    stage_times:'',
    second_stage_times:'',
    third_stage_times:'',
    data:{

    },
    static:{
      time:'',
      total:''
    },
    grade:''
  };
  avatar:'';
  dataJson;
  builder=[];
  comment=[{content:[]}];

  constructor(public navCtrl: NavController,
              private LoadCtrl: LoadingController,
              private commonService:CommonService,
              private navParams: NavParams) {
    this.today=this.getTodaystamp(this.myDate);
  }


  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.userInfor(this.today);
      setTimeout(() => {
        loading.dismiss();
      }, 500)

    }, 500)

  }


  /**
   * 用户信息
   */
  userInfor(time){
    let openid =this.navParams.get('openid');
    let param={
      r:'wx_api.teacher.get_user_builder',
      openid:openid,
      time:time,
      wxref:'mp.weixin.qq.com'
    };

    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        this.items=res.result.member;
        this.items.grade=Number(res.result.member.grade).toFixed(2);
        this.avatar=res.result.member.avatar;
        this.dataJson=this.commonService.isEmptyObject(res.result.member.data);
        let b=this.commonService.isEmptyObject(res.result.member.builder);
        this.builder=b?res.result.member.builder[0].content:[];
        let a=this.commonService.isEmptyObject(res.result.comment);
        for(let i=0;i<res.result.comment.length;i++){
          let c=this.commonService.isEmptyObject(res.result.comment[i].content);
          if(!c){
            res.result.comment[i].content=[];
          }
        }
        this.comment=a?res.result.comment:[];
        let shi=(Number(res.result.member.static.total)/Number(res.result.member.stage_times))*100;
        if(shi>=100){
          shi=100;
        }
        this.quan(shi);
      }else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }
    })
  }


  changeTime(myDate){
    this.today=this.getTodaystamp(myDate);
    this.userInfor(this.today);
  }

  getTodaystamp(time) {
    let date = time;
    let year = date.slice(0,4);
    let month = date.slice(5,7)-1;
    return new Date(year,month).getTime()/1000;
  }

  moreAction() {
    let openid =this.navParams.get('openid');
    this.navCtrl.push('FitactionPage',{openid:openid});

  }

  moreRemark() {
    let openid =this.navParams.get('openid');
    this.navCtrl.push('CoachremarkPage',{openid:openid,avatar:this.avatar});
  }

  ChooseTime() {
    this.navCtrl.push('ChoosetimePage');
  }

  percentA(n,c) {
    let shi=(n/c)*100;
    if(shi>=100){
      shi=100;
    }
    this.quan(shi);
  }

  quan(shi){
    let range = $("#range"), circle1 = $(".circle1"), circle2 = $(".circle2");
    if (range && circle1 && circle2) {
      //percent1 =  $(".circle1")的百分比/ 100,percent2 = ($(".circle1")的百分比*$(".circle2")的百分比) / 10000
      let percent1 = 70 / 100, perimeter = Math.PI * 2 * 70, percent2 = (shi * 70) / 10000;
      circle1.attr('stroke-dasharray', perimeter * percent1 + " " + perimeter * (1 - percent1));
      circle2.attr('stroke-dasharray', perimeter * percent2 + " " + perimeter * (1 - percent2));
    }
  }



  swipeEvent(event) {
    //向左滑
    let n = this.infoArray.length - 1;
    if (event.direction == 2) {
      if (this.infoArray.indexOf(this.info) < n) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) + 1];
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.infoArray.indexOf(this.info) > 0) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) - 1];
      }
    }
  }



  inforDetail(items) {
    let item = JSON.stringify(items);
    this.navCtrl.push('InformationPage', {item: item});

  }



}

