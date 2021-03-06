var util = require('../../../util/util.js');
var app = getApp();
Page({
  data:{
    movie:{}
  },
  onLoad:function(options){
    var movieId = options.id;
    // console.log(movieId);
    var url = app.globalData.doubanBase+ '/v2/movie/subject/'+ movieId;
    util.http(url,this.processDoubanData);
  },

  processDoubanData: function (data) {
       var director = {
         avatar:"",
         name:"",
         id:""
       }

       if(data.directors[0] != null){
          if(data.directors[0].avatars != null){
            director.avatar = data.directors[0].avatars.large;
          }
          director.name = data.directors[0].name;
          director.id = data.directors[0].id;
       }

       var movie = {
         movieImg : data.images ? data.images.large:"",
         country : data.countries[0],
         title : data.title,
         originalTitle : data.original_title,
         wishCount : data.wish_count,
         commentCount : data.comments_count,
         year :data.year,
         generes : data.genres.join("、"),
         stars:util.converToStarsArray(data.rating.stars),
         score:data.rating.average,
         director :director,
         casts:util.convertToCastString(data.casts),
         castsInfo:util.convertToCastInfo(data.casts),
         summary : data.summary
       }

       console.log(movie)

       this.setData({
         movie:movie
       })

    },

    // 查看图片
    viewMoviePostImg:function(event){
        var src = event.currentTarget.dataset.src;
        wx.previewImage({
          current:src, //当前显示图片的http连接
          urls:[src] //需要预览图片的http连接列表
        })
    }
})