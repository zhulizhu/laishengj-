import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {opendoorPage} from "./opendoor";
@NgModule({
  declarations:[opendoorPage],
  imports:[
    IonicPageModule.forChild(opendoorPage)
  ],
  exports:[opendoorPage]
})

export class OpendoorModule{

}
