Page({
  onTap: function (event) {
    // navigateTo,隐藏当前页面,从父页面跳转到子页面，可返回
    // wx.navigateTo({
    //   url: '../index/index',
    // });
    //  console.log("naigateTo")

    //redirectTo关闭当前页面，跳转到应用内的其他页面
    //switchTap
    wx.switchTab({
      url: '../index/index',
    })
    console.log("naigateTo")
  },
  onSubTap: function (event) {
    wx.switchTab({
      url: '../index/index',
    })
     console.log("onSubTap")
  }
})