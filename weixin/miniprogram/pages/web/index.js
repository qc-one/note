const app = getApp();
let that = null;
Page({
  onLoad(options) {
    console.log(options, 111);
    that = this;
    if (options.url != null) {
      this.setData({
        webUrl: options.url,
      });
      if (options.title != null) {
        wx.setNavigationBarTitle({
          title: options.title,
        });
      }
    } else {
      wx.navigateBack({
        delta: 1,
      });
    }
  },
});
