!function () {
  var view = document.querySelector('nav.menu');
  var controller = {
    view: null,
    aTags: null,
    init: function (view) {
      this.view = view;
      this.bindEvents();
      this.initAnimation();
    },
    initAnimation: function () {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }

      requestAnimationFrame(animate);
    },
    scrollToElement: function (element) {
      let top = element.offsetTop; // element.offsetTop 得到距离顶端的距离
      // 上面四句代码等价于 let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop
      //window.scrollTo(0, top - 80) // 将窗口定位到 x 方向不变， y 方向为到顶端的距离 - 80 的位置

      let currentTop = window.scrollY;
      let targetTop = top - 80;
      let s = targetTop - currentTop; // 路程

      var coords = {
        y: currentTop
      }; // 起始位置

      var t = Math.abs(s / 100 * 300); // 时间

      if (t > 500) {
        t = 500;
      }

      var tween = new TWEEN.Tween(coords) // 起始位置
      .to({
        y: targetTop
      }, t) // 结束为止 & 时间
      .easing(TWEEN.Easing.Cubic.InOut) // 缓动动画类型
      .onUpdate(function () {
        // coords.y 已经变了
        window.scrollTo(0, coords.y); // 如何更新界面
      }).start(); // 开始缓动
    },
    bindEvents: function () {
      let aTags = this.view.querySelectorAll('nav.menu > ul > li > a');

      for (let i = 0; i < aTags.length; i++) {
        aTags[i].onclick = x => {
          x.preventDefault(); // 阻止默认动作（a 标签默认会跳转，但无法设置其距离）

          let a = x.currentTarget; // 获取用户点击的 a 标签

          let href = a.getAttribute('href'); // 获取 a 标签上的 href 地址

          let element = document.querySelector(href); // 根据 href 获取 element

          this.scrollToElement(element);
        };
      }
    }
  };
  controller.init(view);
}.call();