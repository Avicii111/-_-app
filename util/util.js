function converToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var arr = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            arr.push(1);
        } else {
            arr.push(0);
        }
    }

    return arr;
}

function http(url,callBack) {
    wx.request({
        url: url,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            //  "Content-type":"aplication/xml"
            "Content-type": "json"
        }, // 设置请求的 header
        success: function (res) {   
            callBack(res.data)
        },
        fail:function(err){
            console.log(err)
        }
    })
}

function convertToCastString(casts){
    var castsJoin ="";
    for(var idx in casts){
        castsJoin = castsJoin + casts[idx].name + "/";
    }
    return castsJoin.substring(0,castsJoin.length-2)
}

function convertToCastInfo(casts){
    var castsArr = [];
    for(var idx in casts){
        var cast = {
            img : casts[idx].avatars ? casts[idx].avatars.large:"",
            name:casts[idx].name 
        }
        castsArr.push(cast);
    }
    return castsArr
}

module.exports = {
    converToStarsArray: converToStarsArray,
    http : http,
    convertToCastString: convertToCastString,
    convertToCastInfo:convertToCastInfo
}