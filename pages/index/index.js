//定義一個變量來接收數據
var postData = require("../../data/index_data.js");
Page({
  data:{
    //小程序总是会先读取data对象来做数据绑定
    //而data数据绑定是在onLoad事件执行之后发生的
  },

  onLoad:function(options){
    // 生命周期函数--监听页面加载
    //頁面初始化options為頁面跳轉所帶來的參數

        // this.data.postList =postData.postList;//此条已死
    this.setData({
      index_key:postData.postList
    });
  },

  onPostTap:function(event){
    //postid，因为前面wxml的自定义属性没有连字符，而当自定义属性到js来的时候，data和-会被消除，自定义名称相连(首字母小写，第二个单词开始首字母大写，所以此处应该用postid(小写))
    var postId = event.currentTarget.dataset.postid;
    // console.log(postId);
    wx.navigateTo({
      url: 'index_detail/index_detail?id='+postId,
    })
  },

  onSwiperTap:function(event){
    //target 和 currentTarget 
    //target是指当前点击的组件，currentTarget是指事件捕获的组件 
    //target这里指的是image,currentTarget这里指的是swiper
    var postId = event.target.dataset.postid;
    console.log(postId);
      wx.navigateTo({
      url: 'index_detail/index_detail?id='+postId,
    })
  }
})