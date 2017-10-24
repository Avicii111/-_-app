var postsData = require("../../../data/index_data.js");
var app = getApp();


Page({
  data: {
    isPlayingMusic: false,
  },
  // onLoad: function (option) {
  //   var postId = option.id;
  //   this.setData({
  //     currentPostId: postId
  //   })
  //   var postData = postsData.postList[postId];
  //   this.setData({
  //     postData: postData
  //   })

  //   //设置缓存
  //   // wx.setStorageSync('key', {
  //   //   name: "梁巧",
  //   //   toDo: "每天吃早餐",
  //   // })

  //   // var posts_Collected = {
  //   //     1: "true",
  //   //     2: "flase",
  //   //     3: "true",
  //   //     ...
  //   // }

  //   var postsCollected = wx.getStorageSync('posts_Collected');
  //   if (postsCollected) {
  //     var postCollected = postsCollected[postId];
  //     //数据绑定
  //     this.setData({
  //       collected: postCollected
  //     })
  //   } else {
  //     var postsCollected = {};
  //     postsCollected[postId] = false;
  //     wx.setStorageSync('posts_Collected', postsCollected);
  //   }

  //   console.log(app.globalData.g_isPlayingMusic);
  //   if (app.globalData.g_isPlayingMusic && app.globalData.g_currentPlayPostId === postId) {
  //     this.setData({
  //       isPlayingMusic: true
  //     })
  //   }
  //   this.setAudioMinitor();

  // },

 
    onLoad: function (option) {
        var postId = option.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        this.setData({
            postData: postData
        })

        var postsCollected = wx.getStorageSync('posts_Collected')
        if (postsCollected) {
            var postCollected = postsCollected[postId]
            this.setData({
                collected: postCollected
            })
        }
        else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_Collected', postsCollected);
        }

        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId
            === postId) {
            this.setData({
                isPlayingMusic: true
            })
        }
        this.setAudioMinitor();
    },
  

  // setAudioMinitor: function () {
  //   var that = this;
  //   wx.onBackgroundAudioPause(function () {
  //     that.setData({
  //       isPlayingMusic: false
  //     });
  //     app.globalData.g_isPlayingMusic = false;
  //     app.globalData.g_currentPlayPostId = null;
  //   });

  //   wx.onBackgroundAudioPlay(function () {
  //     that.setData({
  //       isPlayingMusic: true
  //     });
  //     app.globalData.g_isPlayingMusic = true;
  //     app.globalData.g_currentPlayPostId = that.data.currentPostId;
  //   });

  //   wx.onBackgroundAudioStop(function () {
  //     that.setData({
  //       isPlayingMusic: false
  //     });
  //     app.globalData.g_isPlayingMusic = false;
  //     app.globalData.g_currentPlayPostId = null;
  //   });
  // },


  setAudioMinitor: function () {
        //点击播放图标和总控开关都会触发这个函数
        var that = this;
        wx.onBackgroundAudioPlay(function (event) {
            var pages = getCurrentPages();
            var currentPage = pages[pages.length - 1];
            if (currentPage.data.currentPostId === that.data.currentPostId) {
                // 打开多个post-detail页面后，每个页面不会关闭，只会隐藏。通过页面栈拿到到
                // 当前页面的postid，只处理当前页面的音乐播放。
                if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
                    // 播放当前页面音乐才改变图标
                    that.setData({
                        isPlayingMusic: true
                    })
                }
                // if(app.globalData.g_currentMusicPostId == that.data.currentPostId )
                // app.globalData.g_currentMusicPostId = that.data.currentPostId;
            }
            app.globalData.g_isPlayingMusic = true;

        });
        wx.onBackgroundAudioPause(function () {
            var pages = getCurrentPages();
            var currentPage = pages[pages.length - 1];
            if (currentPage.data.currentPostId === that.data.currentPostId) {
                if (app.globalData.g_currentMusicPostId == that.data.currentPostId) {
                    that.setData({
                        isPlayingMusic: false
                    })
                }
            }
            app.globalData.g_isPlayingMusic = false;
            // app.globalData.g_currentMusicPostId = null;
        });
        wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            // app.globalData.g_currentMusicPostId = null;
        });
    },



  // onCollectionTap: function (event) {
  //   //获取缓存数据
  //   var somethingToDo = wx.getStorageSync('key');
  //   console.log(somethingToDo);
  // },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_Collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;

    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否的缓存值
    wx.setStorageSync('posts_Collected', postsCollected)
    //更新数据绑定变量，实现图片切换
    this.setData({
      collected: postCollected
    })

    console.log(postCollected);
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消收藏",
      duration: 1300,
      icon: "success"
    })

    // this.showModal(postsCollected, postCollected);

    /*
      wx.showModal({
      title: "收藏提示",
      content: "是否收藏该文章",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确定",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          //更新文章是否的缓存值
          wx.setStorageSync('posts_Collected', postsCollected)
          //更新数据绑定变量，实现图片切换
          this.setData({
            collected: postCollected
          })
        }
      }
    })
    */


  },
  


  /*
    showModal:function(postsCollected,postCollected){
     var that = this;
      wx.showModal({
       title: "收藏提示",
       content: postCollected? "收藏该文章?":"取消收藏?",
       showCancel: "true",
       cancelText: "取消",
       cancelColor: "#333",
       confirmText: "确定",
       confirmColor: "#405f80",
       success: function (res) {
         if (res.confirm) {
           //更新文章是否的缓存值
           wx.setStorageSync('posts_Collected', postsCollected)
           //更新数据绑定变量，实现图片切换
           that.setData({
             collected: postCollected
           })
         }
       }
     })
     console.log(postCollected)
   }
  */

  // onShareTap: function (event) {
  //   //指定key来删除缓存数据，同步接口
  //   //缓存的最大上限最多不超过10M
  //   wx.removeStorageSync('key')
  //   //清除所有缓存信息
  //   // wx.clearStorageSync();
  // }


  onShareTap: function () {
    var itemList = [
      "分享到朋友圈",
      "分享给好友",
      "分享到QQ空间",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        // res.cannel //判断用户是否点击了取消按钮
        // res.tapIndex //接受数组下标
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "是否取消分享" + res.cannel
        })
      }
    })
  },


  // onMusicTap: function (event) {
  //   var curPostId = this.data.currentPostId;
  //   var postData = postsData.postList[curPostId];
  //   var isPlayingMusic = this.data.isPlayingMusic;
  //   if (isPlayingMusic) {
  //     wx.pauseBackgroundAudio({
  //     })
  //     this.setData({
  //       isPlayingMusic: false
  //     })
  //   } else {
  //     wx.playBackgroundAudio({
  //       dataUrl: postData.music.dataUrl,
  //       title: postData.music.title,
  //       coverImgUrl: postData.music.coverImgUrl
  //     })
  //     this.setData({
  //       isPlayingMusic: true
  //     })
  //   }

  //   console.log(this.data.isPlayingMusic)
  // }

   onMusicTap: function (event) {
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId];
        var isPlayingMusic = this.data.isPlayingMusic;

        console.log(isPlayingMusic)

        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
            // app.globalData.g_currentMusicPostId = null;
            app.globalData.g_isPlayingMusic = false;
        }
        else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.dataUrl,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImgUrl,
            })
            this.setData({
                isPlayingMusic: true
            })
            app.globalData.g_currentMusicPostId = this.data.currentPostId;
            app.globalData.g_isPlayingMusic = true;
        }
    },



})
