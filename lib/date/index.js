let _date = {
  getToday() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = '' + date.getFullYear() + month + strDate;
    return currentdate;
  },
  getTodayFull() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strhour = date.getHours();
    var strmin = date.getMinutes();
    var strsec = date.getSeconds();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (strhour >= 0 && strhour <= 9) {
      strhour = "0" + strhour;
    }
    if (strmin >= 0 && strmin <= 9) {
      strmin = "0" + strmin;
    }
    if (strsec >= 0 && strsec <= 9) {
      strsec = "0" + strsec;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      "&" + strhour + seperator2 + strmin +
      seperator2 + strsec;
    return currentdate;
  }
}