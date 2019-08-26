alert('2223333');
!function () {
  var model = Model({
    resourceName: 'Message'
  });
  var view = View('section.message');
  var controller = Controller({
    init: function (view, controller) {
      this.messageList = document.querySelector('#messageList');
      this.form = document.querySelector('#postMessageForm');
      this.loadMessages();
    },
    loadMessages: function () {
      this.model.fetch().then(messages => {
        let array = messages.map(item => item.attributes);
        array.forEach(item => {
          let li = document.createElement('li');
          li.innerText = `${item.name}: ${item.content}`;
          this.messageList.appendChild(li);
        });
      });
    },
    bindEvents: function () {
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.saveMessage();
      });
    },
    saveMessage: function () {
      let myForm = this.form;
      let content = myForm.querySelector('input[name=content]').value;
      let name = myForm.querySelector('input[name=name]').value;
      this.model.save({
        'name': name,
        'content': content
      }).then(object => {
        let li = document.createElement('li');
        li.innerText = `${object.attributes.name} : ${object.attributes.content}`;
        let messageList = document.querySelector('#messageList');
        messageList.appendChild(li);
        myForm.querySelector('input[name=content]').value = ''; // 提交后清空输入框内容

        console.log(object);
      });
    }
  });
  controller.init(view, model);
}.call();
/*
// 创建 TestObject 表
var TestObject = AV.Object.extend('TestObject');
// 在表中创建一行数据
var testObject = new TestObject();
// 数据内容是 words：'Hello world!' 并保存
// 如果保存成功 就运行 console.log('保存成功。')
testObject.set('words', 'Hello world!');
testObject.save().then(function (testObject) {
    console.log('保存成功。')
})
*/