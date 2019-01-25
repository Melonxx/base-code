var methods = {
  getUrlParm(parm) {
    var paraArr = location.search.substring(1).split('&')
    for (var i = 0; i < paraArr.length; i++) {
      if (parm == paraArr[i].split('=')[0]) {
        return paraArr[i].split('=')[1]
      }
    }
    return null;
  },
  setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires=" + d.toGMTString()
    document.cookie = cname + "=" + cvalue + "; " + expires
  },
  getCookie(cname) {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return ""
  },
  clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  },
  testIdCard(value) {
    var aCity = {
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
    var num = value.toUpperCase();
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      // alert('身份证位数格式错误！');
      return false;
    }
    if (aCity[parseInt(num.substr(0, 2))] == null) {
      // alert('身份证格式错误！');
      return false;
    }
    var len, re;
    len = num.length;
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      var arrSplit = num.match(re);
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(
        arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        // alert('身份证日期格式错误');
        return false;
      } else {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0,
          i;
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
        for (i = 0; i < 14; i++) {
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        num += arrCh[nTemp % 11];
        return true;
      }
    }
    if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var arrSplit = num.match(re);
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) ==
        Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        // alert('身份证日期格式错误');
        return false;
      } else {
        var valnum;
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0,
          i;
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != num.substr(17, 1)) {
          // alert('身份证格式错误！');
          return false;
        }
        return true;
      }
    }
  },
  siblings(context) {
    var siblings = [];
    /*获得父节点*/
    var parent = context.parentNode;
    /*获得父节点的所有孩子节点*/
    var childs = parent.children;
    for (var i = 0; i < childs.length; i++) {
      if (childs[i] !== context) {
        siblings.push(childs[i])
      }
    }
    return siblings;
  },
  WX_pic(elements) { // 仅适用于微信端查看大图
    var urllist = new Array(); // 存放所有图片路径的数组
    var imglist = elements; // 节点集合
    // 循环节点，将每一个节点的图片路径存入数组、绑定click事件
    imglist.forEach((item, index) => {
      urllist.push(item.src);
      item.onclick = function () {
        WeixinJSBridge.invoke("imagePreview", {
          urls: urllist, // 路径数组
          current: this.src, // 当前需要显示的图片路径
        })
      }
    })
  },
  canvas_slim(file) {
    var file = file.files[0];
    var img = new Image();
    var canvas = document.createElement('canvas');;
    var context = canvas.getContext('2d');;
    var fr = new FileReader();
    var base64Slimimg;
    fr.readAsDataURL(file);
    fr.onload = function (e) {
      img.src = e.target.result
      img.alt = '原图'
      img.title = '原图'
    }
    var p = () => new Promise(function (resolve, reject) {
      img.onload = function () {
        // 图片原始尺寸
        var originWidth = this.width;
        var originHeight = this.height;
        // 最大尺寸限制
        var maxWidth = 1024,
          maxHeight = 1024;
        // 目标尺寸
        var targetWidth = originWidth,
          targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        // canvas.toBlob(function (blob) { //或者使用canvas.toDataURL()转成base64
        //   console.log(blob); //ajax可上传blob图片
        // })
        base64Slimimg = canvas.toDataURL('image/jpeg', .7)
        resolve(base64Slimimg)
      }
    })
    return p
  },
  gettoday() {
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
  gettodayfull() {
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
      "&" + strhour + seperator1 + strmin +
      seperator1 + strsec + "&";
    return currentdate;
  },
}

//类似jq append()方法。//高版本可用原生insertAdjacentHTML方法代替
HTMLElement.prototype.appendHTML = function (html) {
  var divTemp = document.createElement("div"),
    nodes = null
    // 文档片段，一次性append，提高性能
    ,
    fragment = document.createDocumentFragment();
  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;
  for (var i = 0, length = nodes.length; i < length; i += 1) {
    fragment.appendChild(nodes[i].cloneNode(true));
  }
  this.appendChild(fragment);
  // 据说下面这样子世界会更清净
  nodes = null;
  fragment = null;
}