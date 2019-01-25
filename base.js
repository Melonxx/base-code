function getUrlParm(parm){
    var paraArr = location.search.substring(1).split('&')
    for(var i = 0;i < paraArr.length;i++){
        if(parm == paraArr[i].split('=')[0]){
            return paraArr[i].split('=')[1]
        }
    }
    return null;
}

function setCookie(cname,cvalue,exdays){
    var d = new Date()
    d.setTime(d.getTime()+(exdays*24*60*60*1000))
    var expires = "expires="+d.toGMTString()
    document.cookie = cname+"="+cvalue+"; "+expires
}

function getCookie(cname){
    var name = cname + "="
    var ca = document.cookie.split(';')
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return ""
}

function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
        for (var i = keys.length; i--;)
        document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }

//身份证校验
function recard(value){
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
    if (aCity[parseInt(num.substr(0, 2))] == null){
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
}