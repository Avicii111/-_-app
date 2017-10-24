var util = require('../../util/util.js')
var app = getApp();
Page({
    //RESTFul API JSON
    //SOAP XML
    data: {
        in_Theaters: {},
        coming_Soon: {},
        top250: {},
        searchResult:{},
        containerShow: true,
        searchPannelShow: false
    },
    onLoad: function (event) {
        var in_TheatersURL = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
        var coming_SoonURL = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top250URL = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

        this.getMovieListData(in_TheatersURL, "in_Theaters", "正在热映");
        this.getMovieListData(coming_SoonURL, "coming_Soon", "即将上映");
        this.getMovieListData(top250URL, "top250", "豆瓣Top250");
    },

    getMovieListData: function (url, settedkey, categoryTitle) {
        var that = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                //  "Content-type":"aplication/xml"
                "Content-type": "json"
            }, // 设置请求的 header
            success: function (res) {
                // success
                that.processDoubanData(res.data, settedkey, categoryTitle)
            }
        })
    },

    onCannelTap: function (event) {
        this.setData({
            containerShow: true,
            searchPannelShow: false,
            searchResult:{}
        })
    },

    onBindFoucs: function (event) {
        this.setData({
            containerShow: false,
            searchPannelShow: true
        })
    },
    onBindChange:function(event){
        var text = event.detail.value;
        var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
        this.getMovieListData(searchUrl, "searchResult", "");
    },

    processDoubanData: function (movieData, settedkey, categoryTitle) {
        //  Console.log("moives");
        var movies = [];
        for (var idx in movieData.subjects) {
            var subject = movieData.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                stars: util.converToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp)
        }
        var readyData = {};
        readyData[settedkey] = {
            categoryTitle: categoryTitle,
            movies: movies
        }
        this.setData(readyData);
    },

    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'movie_more/movie_more?category=' + category
        })
    },

     onMovieTap:function(event){
         var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
          url: 'movie_detail/movie_detail?id='+ movieId,
          success: function(res){
            // success
            console.log("movie") 
          }
        })
    }
})