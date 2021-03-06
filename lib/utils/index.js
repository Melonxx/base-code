var _utils = {
  // 身份证号校验
  testIdCard: function(idCard) {
    idCard = idCard.toString()
    var city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    }
    var num = idCard.toUpperCase()
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      // alert('身份证位数格式错误！')
      return false
    }
    if (city[parseInt(num.substr(0, 2))] === undefined) {
      // alert('身份证格式错误！')
      return false
    }
    var len = num.length
    var re = null
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
      var arrSplit = num.match(re)
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      var bGoodDay
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(
        arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]))
      if (!bGoodDay) {
        // alert('身份证日期格式错误')
        return false
      } else {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
        var nTemp = 0
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (var i = 0; i < 14; i++) {
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        num += arrCh[nTemp % 11]
        return true
      }
    }
    if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      var arrSplit = num.match(re)
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4])
      var bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) ===
        Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
      if (!bGoodDay) {
        // alert('身份证日期格式错误')
        return false
      } else {
        var valnum
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
        var nTemp = 0
        for (var i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[nTemp % 11]
        if (valnum != num.substr(17, 1)) {
          // alert('身份证格式错误！')
          return false
        }
        return true
      }
    }
  },
  // 仅适用于微信端查看大图
  WX_pic: function(elements) {
    var urllist = new Array() // 存放所有图片路径的数组
    var imglist = elements // 节点集合
    // 循环节点，将每一个节点的图片路径存入数组、绑定click事件
    imglist.forEach((item, index) => {
      urllist.push(item.src)
      item.onclick = function () {
        WeixinJSBridge.invoke("imagePreview", {
          urls: urllist, // 路径数组
          current: this.src, // 当前需要显示的图片路径
        })
      }
    })
  },
  // 压缩图片 promise用法.then
  canvas_slim(file) {
    var file = file.files[0]
    var img = new Image()
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    var fr = new FileReader()
    var base64Slimimg
    fr.readAsDataURL(file)
    fr.onload = function (e) {
      img.src = e.target.result
      img.alt = '原图'
      img.title = '原图'
    }
    var p = () => new Promise(function (resolve, reject) {
      img.onload = function () {
        // 图片原始尺寸
        var originWidth = this.width
        var originHeight = this.height
        // 最大尺寸限制
        var maxWidth = 1024,
          maxHeight = 1024
        // 目标尺寸
        var targetWidth = originWidth,
          targetHeight = originHeight
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight)
        // canvas.toBlob(function (blob) { //或者使用canvas.toDataURL()转成base64
        //   console.log(blob) //ajax可上传blob图片
        // })
        base64Slimimg = canvas.toDataURL('image/jpeg', .7)
        resolve(base64Slimimg)
      }
    })
    return p
  },
  // 改变伪元素的样式 // https://segmentfault.com/q/1010000002452755
  ruleSelector: function(selector) {
    function uni(selector) {
      return selector.replace(/::/g, ':')
    }
    // es6
    // return Array.from(document.styleSheets).reduce((a,b) => {
    //   return a.concat(Array.from(b.cssRules))
    // }, []).filter(x => {
    //   return uni(x.selectorText) === uni(selector);
    // })
    // es5
    return Array.prototype.filter.call(Array.prototype.concat.apply([], Array.prototype.map.call(document.styleSheets, function (x) {
      return Array.prototype.slice.call(x.cssRules)
    })), function (x) {
      return uni(x.selectorText) === uni(selector)
    })
  },
}