import { Component} from "@angular/core";
import {IonicPage, NavParams} from "ionic-angular";

@IonicPage({
  name:'InformationPage',
  segment:'InformationPage/:item'
})
@Component({
  selector: 'page-information',
  templateUrl: 'information.html'
})

export class InformationPage {
  items={
  basic: 0,
  fat: 0,
  fatControl: 0,
  skeletal_muscle:0,
  height: "0",
  leanWeight: 0,
  massIndex: 0,
  muscle: 0,
  sex:"1",
  waist:0,
  water:0,
  weight:"0",
  weightPercent:0,
  year:"0",
  };


  constructor(private navParams:NavParams){

    this.items=JSON.parse(this.navParams.get('item'));
  }


}
