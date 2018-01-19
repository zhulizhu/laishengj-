import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {WriteinforPage} from "./writeinfor";
@NgModule({
  declarations:[WriteinforPage],
  imports:[
    IonicPageModule.forChild(WriteinforPage)
  ],
  exports:[WriteinforPage]
})

export class WriteinforModule{

}
