import {Injectable} from "@angular/core";
import {isArray} from "rxjs/util/isArray";
import {CommonService} from "./CommonService";
@Injectable()
export class CommonJs{
  constructor(private commonService:CommonService){

  }

  /**
   * 清除字符串里面的标签
   * @param text
   * @returns {any}
   */
  public contentText(text){
    text=text.replace(/(&lt;.*?.&gt;)|<.*?>|(&nbsp;)/g,'');
    return text;
  }

  /**
   *
   * @param text
   */
  public conArray(text){
    let textArray=[];
    let a=this.commonService.isEmptyObject(text);
    if(a){
      if(text){

        // let regex=new RegExp('、', 'g');
        let regex=new RegExp(/\d、/,'g');
        let length=text.match(regex);
        if(isArray(length)){
          for (let i=0;i<=length.length;i++){
            if(i==length.length){
              textArray.push(text.slice(text.indexOf( i+'、')));
            }else {
              textArray.push(text.slice(text.indexOf((i)+'、'), text.indexOf( (i+1)+'、')));
            }
          }
          for (let j=0;j<=textArray.length;j++){
            for (let i=0;i<textArray.length;i++){
              if(!textArray[i]){
                textArray.splice(i,1);
              }
            }
          }
        }else {
          textArray.push(text);
        }
        return textArray;
      }
    }else {
      return [];
    }

  }


  /**
   * 清楚数组重定向
   */

  public cancelArray(array){
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          array.splice(j, 1);
          j--;
        }
      }
    }
    return array;
  }
}
