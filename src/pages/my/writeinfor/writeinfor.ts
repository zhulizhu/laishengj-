import {Component} from "@angular/core";
import {IonicPage, LoadingController, ModalController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";

@IonicPage({
  name: 'WriteinforPage',
  segment: 'WriteinforPage/:items'
})
@Component({
  selector: 'page-writeinfor',
  templateUrl: 'writeinfor.html'
})

export class WriteinforPage {

  lists = [];
  items = {
    data: {
      weight: 0,
      height: 0,
    },
    realname:'',
    nickname_wechat:'',
    nickname:"",
    coursetime: 0,
    createtime: 0,
    avatar: '',
  };
  itemsC={
    course_starttime:'',
    course_endtime:'',
    title:'',
    openid:'',
    orderid:'',
    goodsid:'',
  };

  content = [];
  grade='暂无';
  level='';
  comment=[];
  builder=[];
  commentid;
  builderid;
  myModaling;
  contents={
    grade:'',
    level:'',
    content:[]
  };

  constructor(private myModal: ModalController,
              private LoadCtrl: LoadingController,
              private navParams: NavParams,
              private commonService: CommonService) {
    this.itemsC=JSON.parse(this.navParams.get('items'));

  }

  ionViewDidEnter() {

    let loading = this.LoadCtrl.create({});

    loading.present();

    setTimeout(() => {
      this.uerInfor();
      setTimeout(() => {
        loading.dismiss();
      }, 500)

    }, 500)

  }



  /**
   * 用户信息
   */

  uerInfor(){

    let openid=this.itemsC.openid;
    let orderid=this.itemsC.orderid;
    let goodsid=this.itemsC.goodsid;

    let param={
      r:'wx_api.teacher.get_user_builder',
      openid:openid,
      orderid:orderid,
      goodsid:goodsid,
      wxref:'mp.weixin.qq.com'
    };
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        this.items=res.result.member;
        let b=this.commonService.isEmptyObject(res.result.member.builder);
        this.builder=b?res.result.member.builder.content:[];
        this.builderid=b?res.result.member.builder.id:'';
        let a=this.commonService.isEmptyObject(res.result.comment);

        this.contents=a?res.result.comment:[];
        // this.contents=this.comment[0];
        this.commentid=a?res.result.comment.id:'';
      }else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }
    })


  }


  /**
   * 健身动作添加
   * @param list
   * @param i
   * @constructor
   */
  ProjeModal(list,id,i) {
    let openid=this.itemsC.openid;
    let goodsid=this.itemsC.goodsid;
    let orderid=this.itemsC.orderid;

    this.myModaling = this.myModal.create('ProjectModal',
      {id:id,openid:openid,goodsid:goodsid,orderid:orderid,con:JSON.stringify(list),i:i});
    this.myModaling.onDidDismiss(res => {
      if(res==1){
        this.ionViewDidEnter();
      }
    });
    this.myModaling.present();

    // if (i==1) {
    //
    // } else {
    //   let myModal = this.myModal.create('ProjectModal',{id:id,openid:openid,goodsid:goodsid,orderid:orderid,content:JSON.stringify(list),kong:i});
    //   myModal.onDidDismiss(() => {
    //     // let data = JSON.parse(res);
    //     // this.content[i]=data;
    //   });
    //   myModal.present();
    // }

  }
  /**
   * 离开该页面
   */
  ionViewDidLeave(){
    if(this.myModaling){
      this.myModaling.dismiss();
    }
  }

  /**
   *评论
   */


  CommentModal(id,comment,avatar){
    let openid=this.itemsC.openid;
    let goodsid=this.itemsC.goodsid;
    let orderid=this.itemsC.orderid;
    let con=JSON.stringify(comment.content);
    this.myModaling = this.myModal.create('CommentModal',{id:id,openid:openid,goodsid:goodsid,orderid:orderid,avatar:avatar,con:con});
    this.myModaling.onDidDismiss(res => {
      if(res==1){
        this.ionViewDidEnter()
      }

    });
    this.myModaling.present();
  }


  /**
   * 确定提交信息
   */

  sure(content,grade,level,comment){
    let openid=this.itemsC.openid;
    let goodsid=this.itemsC.goodsid;
    let orderid=this.itemsC.orderid;
    let con=JSON.stringify(content);
    con=encodeURI(con);
    let param={
      r:'wx_api.teacher.add_member_builder',
      orderid:orderid,
      openid:openid,
      goodsid:goodsid,
      content:con,
      grade:grade,
      level:level,
      comment:comment,
      wxref:'mp.weixin.qq.com'
    };
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
      }else {
        alert(res.result.message);
      }
    })
  }

}
