var _date = {
  // 获取当前时间2019-05-17
  getToday: function() {
    var date = new Date()
    var seperator = "-"
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    var currentdate = date.getFullYear() + seperator + month + seperator + strDate
    return currentdate
  },

  //获取当前完整时间2019-05-17&14:58:11
  getTodayFull: function() {
    var date = new Date()
    var seperator1 = "-"
    var seperator2 = ":"
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    var strhour = date.getHours()
    var strmin = date.getMinutes()
    var strsec = date.getSeconds()
    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    if (strhour >= 0 && strhour <= 9) {
      strhour = "0" + strhour
    }
    if (strmin >= 0 && strmin <= 9) {
      strmin = "0" + strmin
    }
    if (strsec >= 0 && strsec <= 9) {
      strsec = "0" + strsec
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      "&" + strhour + seperator2 + strmin + seperator2 + strsec
    return currentdate
  },

  // 得到第几周 默认为今天 // https://blog.csdn.net/carllucasyu/article/details/78569525
  getWeekOfYear: function(date){
      var today = date ? new Date(date) : new Date()
      var firstDay = new Date(today.getFullYear(), 0, 1)
      var dayOfWeek = firstDay.getDay() 
      var spendDay = 1
      if (dayOfWeek !== 0) {
        spendDay = 7 - dayOfWeek + 1
      }
      firstDay = new Date(today.getFullYear(), 0, 1 + spendDay)
      var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000)
      var result = Math.ceil(d / 7)
      return result + 1
      // https://www.cnblogs.com/lr-blog/p/9559102.html
      // var today = date ? new Date(date) : new Date()
      // var d1 = new Date(today)
      // var d2 = new Date(today)
      // d2.setMonth(0)
      // d2.setDate(1)
      // var rq = d1 - d2
      // var days = Math.ceil(rq / (24 * 60 * 60 * 1000))
      // var num = Math.ceil(days / 7)
      // return num
    },
}