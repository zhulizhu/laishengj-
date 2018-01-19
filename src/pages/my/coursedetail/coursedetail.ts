import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
@IonicPage({
  name: 'CoursedetailPage',
  segment: 'CoursedetailPage/:id/:tip/:param'
})
@Component({
  selector: 'page-coursedetail',
  templateUrl: 'coursedetail.html'
})

export class CoursedetailPage {

  tip: '';
  course_endtime;
  course_starttime;
  items = {
    course: {
      title: '',
      week: ''
    },
    store: {
      address: ''
    },

  };
  member = [];
  param = {
    person: "",
    courseType: "",
    price: "",
    isstart: 0
  };
  comment = [];
  doing = '正在上课';
  nowTime = this.commonService.timeStamp();
  timer;
  second: any;
  day: number;
  hour;
  minute;

  constructor(private LoadCtrl: LoadingController,
              private navParams: NavParams,
              private navCtrl: NavController,
              private commonService: CommonService,) {

    this.param = JSON.parse(this.navParams.get('param'));
    this.tip = this.navParams.get('tip');
  }

  ionViewDidEnter() {
    let loading = this.LoadCtrl.create({});
    loading.present();
    setTimeout(() => {
      this.courseDetail();

      setTimeout(() => {
        loading.dismiss();
      }, 500)
    })

  }


  /**
   * 课程详情
   */

  courseDetail() {
    let id = this.navParams.get('id');
    let paramDea = {
      r: 'wx_api.teacher.course_detail',
      id: id
    };

    this.commonService.getResult(paramDea).then(res => {
      if (res.status == 1) {
        this.items = res.result;
        this.course_endtime = new Date(res.result.course.course_endtime).getTime() / 1000;
        this.course_starttime = new Date(res.result.course.course_starttime).getTime() / 1000;
        this.items.course.week = this.getWeekNum(res.result.course.week);
        this.member = res.result.order;
        this.comment = res.result.comment;
        this.Countdown(this.course_starttime, this.course_endtime, this.param.isstart);


      } else {
        this.ionViewDidEnter();
      }

    })
  }

  /**
   * 填写资料
   */
  writeInfor(course_starttime, course_endtime, title, obj) {
    let item = {
      course_starttime: course_starttime,
      course_endtime: course_endtime,
      title: title,
      openid: obj.openid,
      orderid: obj.id,
      goodsid: obj.goodsid,
    };
    let items = JSON.stringify(item);
    this.navCtrl.push('WriteinforPage', {items: items});
  }

  /**
   * 开始上课
   */

  start(starttime, endTime, star) {
    this.Countdown(starttime, endTime, star);
    // let nowTime=this.commonService.timeStamp();
    if (star == 1 && starttime < this.nowTime) {
      alert('正在上课');
      return false;
    }
    if (starttime - 60 > this.nowTime) {
      alert('不好意思，还没有上课,请查看上课时间');
      return false;
    } else {
      let id = this.navParams.get('id');
      let paramStart = {
        r: 'wx_api.teacher.start',
        id: id
      };

      this.commonService.getResult(paramStart).then(res => {
        if (res.status == 1) {
          this.param.isstart == 1;
          this.ionViewDidEnter();
        } else {
          alert(res.result.message);
          this.ionViewDidEnter();
        }

      })
    }

  }

  // 倒计时
  Countdown(startTime, endTime, star) {
    if (startTime > this.nowTime && star == 0) {
      this.doing = '开始上课'
    }
    if ((startTime < this.nowTime && this.nowTime < endTime) && star == 1) {
      let jian = endTime - this.nowTime;
      if (jian > 0) {
        this.timer = setInterval(() => {
          this.day = Math.floor(jian / (60 * 60 * 24));
          this.hour = Math.floor(jian / (60 * 60)) - (this.day * 24);
          this.minute = Math.floor(jian / 60) - (this.day * 24 * 60) - (this.hour * 60);
          this.second = Math.floor(jian) - (this.day * 24 * 60 * 60) - (this.hour * 60 * 60) - (this.minute * 60);
          jian = jian - 1;
          if (this.hour < 10) {
            this.hour = "0" + this.hour;
          }
          if (this.minute < 10) {
            this.minute = "0" + this.minute;
          }
          if (this.second < 10) {
            this.second = "0" + this.second;
          }
          this.doing = this.hour + ":" + this.minute + ":" + this.second;
          if (jian < 0) {
            clearInterval(this.timer);
            this.doing = '正在上课';
          }
        }, 1000);
      }
    } else if (this.nowTime > endTime) {
      this.doing = '上课时间结束'
    } else {
      this.doing = '开始上课'
    }

  }


  /**
   *周
   * @param firstday
   * @returns {any}
   */

  getWeekNum(firstday) {
    let week;
    if (firstday == 0) {
      week = "日";
    } else if (firstday == 1) {
      week = "一";
    } else if (firstday == 2) {
      week = "二";
    } else if (firstday == 3) {
      week = "三";
    } else if (firstday == 4) {
      week = "四";
    } else if (firstday == 5) {
      week = "五";
    } else if (firstday == 6) {
      week = "六";
    }
    return week;
  }


}
