// Model 就是个模板
window.Model = function (options) {
  let resourceName = options.resourceName;
  return {
    init: function () {
      var APP_ID = 'u6VrpSkEt9ETuDgMsCpuaV6x-gzGzoHsz';
      var APP_KEY = 'eQatGyoAsL442eCpkHydVf3q';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    fetch: function () {
      var query = new AV.Query(resourceName);
      return query.find(); // Promise 对象
    },
    save: function (object) {
      var X = AV.Object.extend(resourceName);
      var x = new X();
      return x.save(object);
    }
  };
};