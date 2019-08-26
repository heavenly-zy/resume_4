!function () {
  var view = View('#topNavBar'); // 等价于 var view = window.View('#topNavBar')

  var controller = {
    view: null,
    init: function (view) {
      this.view = view;
      this.bindEvents(); //this.bindEvents.call(this)
    },
    bindEvents: function () {
      var view = this.view;
      window.addEventListener('scroll', x => {
        if (window.scrollY > 0) {
          // 如果滑动，就给 topNavBar 添加一个黏着状态 sticky
          this.active();
        } else {
          this.deactive();
        }
      }); // 箭头函数没有 this，此时里面的 this 就是函数外面的 this，this 的值不会发生改变
    },
    active: function () {
      this.view.classList.add('sticky');
    },
    deactive: function () {
      this.view.classList.remove('sticky');
    }
  };
  controller.init(view); //controller.init.call(controller,view)
}.call();