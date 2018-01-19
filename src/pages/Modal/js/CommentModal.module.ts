import {NgModule} from "@angular/core";
import {CommentModal} from "./CommentModal";
import {IonicPageModule} from "ionic-angular";
@NgModule({
  declarations:[CommentModal],
  imports:[
    IonicPageModule.forChild(CommentModal)
  ],
  exports:[CommentModal]
})

export class CommentModalModule{

}
