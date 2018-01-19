import {NgModule} from "@angular/core";
import {StudentdetailPage} from "./studentdetail";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[StudentdetailPage],
  imports:[
    IonicPageModule.forChild(StudentdetailPage)
  ],
  exports:[StudentdetailPage]
})

export class StudentdetailModule{

}
