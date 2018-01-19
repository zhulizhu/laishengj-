import {Component} from "@angular/core";
import {IonicPage,NavController} from "ionic-angular";

@IonicPage({
  name:'ChoosetimePage',
  segment:'ChoosetimePage'
})
@Component({
  selector: 'page-choosetime',
  templateUrl: 'choosetime.html'
})

export class ChoosetimePage {
  // time=new Date().toISOString();
  // time1=new Date().toISOString();
  item=1;
  constructor(public navCtrl: NavController) {

  }
  chooseTime(tip){
    if(tip==1){
      this.item=2;
    }else{
      this.item=1;
    }

  }
  close(){
      this.navCtrl.push('StudentdetailPage');
  }



}

