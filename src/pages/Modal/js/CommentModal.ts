import {IonicPage, NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {CommonService} from "../../../providers/CommonService";
import { Buffer } from 'buffer';

@IonicPage({
  name:'CommentModal',
  segment:'CommentModal'
})

@Component({
  selector: 'page-modal',
  templateUrl: '../template/CommentModal.html'
})

export class CommentModal{

  con=[];
  grade=80;
  level=2;
  content=[];

  constructor(private viewCtrl:ViewController,
              private commonService: CommonService,
              private navParams: NavParams){
    if(this.navParams.get('con')){
      this.con=JSON.parse(this.navParams.get('con'));
    }

  }

  sure(){

    let openid = this.navParams.get('openid');
    let goodsid = this.navParams.get('goodsid');
    let orderid = this.navParams.get('orderid');

    if(this.con&&this.con.length>0){
      this.content=this.con.concat(this.content);
    }
    // let cont = new Buffer(JSON.stringify(this.content)).toString('base64');
    let cont = new Buffer(JSON.stringify(this.content)).toString('base64');


    let id=this.navParams.get('id');

    let param;
    if(id){
      param={
        r:'wx_api.teacher.add_member_comment',
        orderid:orderid,
        openid:openid,
        goodsid:goodsid,
        grade:this.grade,
        level:this.level,
        content:cont,
        id:id
      };
    }else {
      param={
        r:'wx_api.teacher.add_member_comment',
        orderid:orderid,
        openid:openid,
        goodsid:goodsid,
        grade:this.grade,
        level:this.level,
        content:cont,
      };
    }
    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        this.viewCtrl.dismiss(1);
      }else {
        // alert(res.result.message);
      }
    });
  }

  close(){
    this.viewCtrl.dismiss(1);
  }

}
