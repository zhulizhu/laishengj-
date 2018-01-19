import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavParams, ViewController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
import {isNumber} from "ionic-angular/util/util";
import { Buffer } from 'buffer';


@IonicPage({
  name: 'ProjectModal',
  segment: 'ProjectModal'
})

@Component({
  selector: 'page-modal',
  templateUrl: '../template/ProjectModal.html',
})
export class ProjectModal {

  lists = [{id: 0}];
  actionLists = [];
  space = "";
  action;
  content = [{
    space_id: '',
    space_name: '',
    action_id: 0,
    action_name: "",
    group: 1,
    number: 10,
    weight: 0,
  }];

  con=[];
  i;

  constructor(private viewCtrl: ViewController,
              private LoadCtrl: LoadingController,
              private navParams: NavParams,
              private commonService: CommonService) {

    this.i = this.navParams.get('i');
    this.con=JSON.parse(this.navParams.get('con'));

  }


  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.actionList();
      setTimeout(() => {
        loading.dismiss();
      }, 500)
    }, 500)

  }

  /**
   * 健身动作部位
   * @constructor
   */
  actionList() {
    let param = {
      r: 'wx_api.space',
    };
    this.commonService.getResult(param).then(res => {
      if (res.status == 1) {
        this.lists = res.result.list;
        if (isNumber(this.i)) {
          this.space = this.con[this.i].space_id + "、" + this.con[this.i].space_name;
        }else {
          this.space = res.result.list[0].id + '、' + res.result.list[0].name;
        }

      } else {
        alert(res.result.message);
        this.ionViewDidEnter();
      }
    })
  }

  /**
   * 部位的动作
   */

  spaceAction() {
    let length = this.space.indexOf('、');
    let space_id = this.space.slice(0, length);
    this.content[0].space_id = space_id;
    this.content[0].space_name = this.space.slice(length + 1);
    if (Number(space_id) != 0) {
      let param = {
        r: 'wx_api.action',
        space_id: space_id,
      };
      this.commonService.getResult(param).then(res => {
        if (res.status == 1) {
          this.actionLists = res.result.list;
          if (isNumber(this.i)) {
            this.action = this.con[this.i].action_id + "、" + this.con[this.i].action_name
          }else {
            this.action = this.actionLists[0].id + '、' + this.actionLists[0].name;
          }
        } else {
          alert(res.result.message);
          this.ionViewDidEnter();
        }
      })
    }

  }



  sure() {

    // if (this.content[0].weight == 0) {
    //   alert('请选择负重标准');
    //   return false;
    // }
    let openid = this.navParams.get('openid');
    let goodsid = this.navParams.get('goodsid');
    let orderid = this.navParams.get('orderid');
    let length = this.action.indexOf('、');
    this.content[0].action_id = this.action.slice(0, length);
    this.content[0].action_name = this.action.slice(length + 1);
    if(this.con.length>0&&!isNumber(this.i)){
      this.content=this.content.concat(this.con);
    }else if(this.con.length>0&&isNumber(this.i)){
      this.con[this.i]={
        space_id: this.content[0].space_id,
        space_name:  this.content[0].space_name,
        action_id:  this.content[0].action_id,
        action_name:  this.content[0].action_name,
        group:  this.content[0].group,
        number:  this.content[0].number,
        weight:  this.content[0].weight,
      };
      this.content=this.con;
    }
    let content = new Buffer(JSON.stringify(this.content)).toString('base64');
    let param;
    let id=this.navParams.get('id');
    if(id){
      param={
        r:'wx_api.teacher.add_member_builder',
        orderid:orderid,
        openid:openid,
        goodsid:goodsid,
        content:content,
        id:id
      };
    }else {
      param={
        r:'wx_api.teacher.add_member_builder',
        orderid:orderid,
        openid:openid,
        goodsid:goodsid,
        content:content,
      };
    }


    this.commonService.getResult(param).then(res=>{
      if(res.status==1){
        // this.navCtrl.push('WriteinforPage');
        this.viewCtrl.dismiss(1);
      }else {
        // alert(res.result.message);
      }
    })


  }


  close(){
    this.viewCtrl.dismiss(1);
  }

}
