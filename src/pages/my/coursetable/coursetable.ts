import {Component} from "@angular/core";
import {IonicPage, LoadingController, NavController, NavParams, AlertController} from "ionic-angular";
import {CommonService} from "../../../providers/CommonService";
@IonicPage({
  name: 'CourseTablePage',
  segment: 'CourseTablePage/:openid'
})
@Component({
  selector: 'page-coursetable',
  templateUrl: 'coursetable.html'
})

export class CourseTablePage {
  // infoArray1 = ['order', 'past', 'student'];
  infoArray1 = ['order', 'past'];
  info1 = this.infoArray1[0];
  infoArray = ["base_0", "base_1", "base_2", "base_3", "base_4", "base_5", "base_6", "base_7"];
  info = this.infoArray[0];
  week = [];
  weekth: any;
  lianTime = "";
  // 时间选择
  lastMidYear = 0;//上一个年份
  lastMidMonth = 0;//上一个年份
  lastMidDay = 0;//上一个年份
  firstday: number;
  i: number;
  startName: any = '开始上课';
  timer;
  // endDate:number=5;
  // second:any;
  date = new Date().toISOString();
  todayTime = this.date.slice(0, 10);
  data = {
    page: 1,
    timeYd: this.getToday(),//默认当天的年月日时间戳,//切换的年月日
    // type:"1"
  };
  dataTime;
  param = {};
  list = [];
  itemx = [];
  lists: any;
  itemOld = [];
  studyList = [];
  stop = 0;
  dayLine;//当前日期
  loading;
  loadingCtrl = false;

  constructor(public navCtrl: NavController,
              private LoadCtrl: LoadingController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private commonService: CommonService,) {
    this.getTimeDay();
    // this.getTeacherList(this.week[0]);
  }

  ionViewDidEnter() {
    this.getTeacherList(this.week[0]);
  }


  /**
   * 私教列表
   * @param data
   */
  getList(data) {
    let openid = this.navParams.get('openid');
    this.list = [];
    this.itemOld = [];
    this.itemx = [];

    this.data.page = data.page;
    this.param = {
      r: "wx_api.goods.get_list_by_coach",
      openid: openid,
      time: this.data.timeYd
    };
    this.commonService.getResult(this.param).then(res => {
      if (res.status == 1) {
        this.loadingCtrl = true;
        if (this.loadingCtrl) {
          setTimeout(() => {
            this.loading.dismiss();
          }, 500)
        }
        this.lists = res.result.list;
        for (let i = 0; i < this.lists.length; i++) {
          this.dataTime = this.turnDate(this.lists[i].course_starttime);
          let datatime = Number(this.lists[i].course_starttime);
          let nowTime = this.commonService.timeStamp();
          let endtime = Number(this.lists[i].course_endtime);
          this.lists[i].starclass = '开始上课';
          if (this.dataTime == Number(this.data.timeYd) && (datatime <= nowTime || datatime > nowTime) && endtime >= nowTime) {
            this.list.push(this.lists[i]);
            this.list = this.undulpicate(this.list);
          }
          if (endtime < Number(nowTime)) {
            this.itemOld.push(this.lists[i]);
            this.itemOld = this.undulpicate(this.itemOld);
          }

        }

        this.itemx = this.itemx.concat(this.list);
      } else {
        setTimeout(() => {
          this.loading.dismiss();
        }, 500);
        this.lists = [];
      }
    });
  };

  //获取当前日期
  getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return new Date(year, month, day, 0, 0, 0).getTime() / 1000;
  }

  deletClass(item) {
    let openid = this.navParams.get('openid');
    this.param = {
      r: "wx_api.teacher.delete_course",
      openid: openid,
      goodsid: item.id
    };
    let alerting = this.alertCtrl.create({
      title: '<h2>确定删除课程?</h2>',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            alerting.dismiss();
          }
        }, {
          text: '确定',
          handler: data => {
            this.commonService.getResult(this.param).then(res => {
              if (res.status == 1) {
                this.ionViewDidEnter();
              } else {
                alert(res.result.message);
                this.ionViewDidEnter();
              }
            })
          }
        }
      ]
    });
    alerting.present();
  }


  /**
   * 点击日期获取列表
   * @param times
   */
  getTeacherList(times) {
    this.dayLine = times.time;
    let year = times.year;
    let month = times.time.slice(0, 2) - 1;
    let day = times.time.slice(3, 5);
    this.data.timeYd = new Date(year, month, day, 0, 0, 0).getTime() / 1000;
    this.data.page = 1;
    this.loading = this.LoadCtrl.create({});
    this.loading.present();
    setTimeout(() => {
      this.getList(this.data);
    })


  }


  /**
   * 删除刷新重复数据
   * @param array
   * @returns {any}
   */
  undulpicate(array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i].id === array[j].id) {
          array.splice(j, 1);
          j--;
        }
      }
    }
    return array;
  }


  //将年月日时分秒时间搓转化成年月日时间搓
  turnDate(e) {
    let time = new Date(parseInt(e) * 1000);
    let year = time.getFullYear();
    let month = time.getMonth();
    let day = time.getDate();
    return new Date(year, month, day, 0, 0, 0).getTime() / 1000;
    // let time = new Date(e* 1000).toISOString();
    // let getTimes = time.slice(0, 10);
    // return new Date(Date.parse(getTimes) / 1000).getTime();
  }

  getTimeDay() {
    let D = new Date();
    let curYear = D.getFullYear();
    let curMonth = D.getMonth() + 1;
    let curDay = D.getDate();
    this.lastMidYear = curYear;
    this.lastMidMonth = curMonth;
    this.lastMidDay = curDay;
    this.week = [];
    this.getLasttestDay(curYear, curMonth, curDay);
  }


  getWeekNum(firstday) {
    if (firstday == 0) {
      this.weekth = "日";
    } else if (firstday == 1) {
      this.weekth = "一";
    } else if (firstday == 2) {
      this.weekth = "二";
    } else if (firstday == 3) {
      this.weekth = "三";
    } else if (firstday == 4) {
      this.weekth = "四";
    } else if (firstday == 5) {
      this.weekth = "五";
    } else if (firstday == 6) {
      this.weekth = "六";
    }
    return this.weekth;
  }

  getLasttestDay(year, month, day) {
    let theDay = new Date(year, month - 1, day);
    this.firstday = theDay.getDay();
    let yearname = theDay.getFullYear();
    let monthname: any = theDay.getMonth() + 1;
    let dayname: any = theDay.getDate();
    let daynamestr = dayname;
    let week = this.getWeekNum(this.firstday);
    let monthnamestr = monthname;
    if (monthname < 10) {
      monthnamestr = "0" + monthname;
    }
    if (dayname < 10) {
      daynamestr = "0" + dayname;
    }
    let h = monthnamestr + "月" + daynamestr + "日";
    this.week.push({"id": "0", "time": h, "week": week, 'year': yearname});

    let todyDa = yearname + "." + monthname + "." + dayname + "-";
    this.lianTime = this.lianTime + todyDa;

    for (this.i = 1; this.i <= 6; this.i++) {
      let tomorrow = this.getTomorrow(theDay, this.i);
      let strYear = tomorrow.getFullYear();
      let strDay: any = tomorrow.getDate();
      let strMonth: any = tomorrow.getMonth() + 1;
      if (strMonth < 10) {
        strMonth = "0" + strMonth;
      }
      if (strDay < 10) {
        strDay = "0" + strDay;//若果小于10，则在数字前面加0 eg.09
      }
      let tomday = tomorrow.getDay();
      let tomweekth = this.getWeekNum(tomday);//判断星期几
      let hL = strMonth + "月" + strDay + "日";
      this.week.push({"id": this.i, "time": hL, "week": tomweekth, 'year': strYear});
    }
  }

  getTomorrow(date, n) {
    let tomorrow_milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * n;
    let tomorrow = new Date();
    tomorrow.setTime(tomorrow_milliseconds);
    return tomorrow;
  }

  swipeEvent(event) {
    //向左滑
    let n = this.infoArray.length - 1;
    if (event.direction == 2) {
      if (this.infoArray.indexOf(this.info) < n) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) + 1];
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.infoArray.indexOf(this.info) > 0) {
        this.info = this.infoArray[this.infoArray.indexOf(this.info) - 1];
      }
    }
  }


  /**
   * 开始上课
   */
  start(item) {
    let nowtime = this.commonService.timeStamp();
    let iscalss = item.isstart;
    if (Number(item.course_starttime) > Number(nowtime)) {
      alert('还没有开始上课，请查看上课时间');
      return false;
    }
    ;


    let param = {
      r: 'wx_api.teacher.start',
      id: item.id
    };
    let alerting = this.alertCtrl.create({
      title: '<h2>是否确定开始上课?</h2>',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            alerting.dismiss();
          }
        }, {
          text: '确定',
          handler: data => {
            this.commonService.getResult(param).then(res => {
              if (res.status == 1) {
                this.ionViewDidEnter();
              } else {
                alert(res.result.message);
                this.ionViewDidEnter();
              }
            })
          }
        }
      ]
    });
    if (iscalss == 0) {
      alerting.present();
    } else {
      alert('正在上课');
      alerting.dismiss();
    }

  }


  /**
   * 课程详情
   * @param id
   * @param course_type
   * @param price
   * @param price1
   * @param price2
   * @param person
   * @param tip
   * @param isstart
   */
  coursDetail(id, course_type, price, price1, price2, person, isstart, tip) {
    let showPrice = price;
    if (course_type == 1 && person == 2) {
      showPrice = price2;
    } else if (course_type == 1 && person == 1) {
      showPrice = price1;
    }

    let param = {
      person: person,
      courseType: course_type,
      price: showPrice,
      isstart: isstart
    };

    let param1 = JSON.stringify(param);
    this.navCtrl.push('CoursedetailPage', {id: id, tip: tip, param: param1});
  }


}
