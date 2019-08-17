!function () {
    var view = document.querySelector('section.message')
    var model = {
        init: function () {
            var APP_ID = 'u6VrpSkEt9ETuDgMsCpuaV6x-gzGzoHsz'
            var APP_KEY = 'eQatGyoAsL442eCpkHydVf3q'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function () { // 获取数据
            var query = new AV.Query('Message');
            return query.find() // Promise 对象
        },
        save: function (name, content) { // 创建数据
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({ // Promise 对象
                'name': name,
                'content': content
            })
        }
    }
    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = document.querySelector('#messageList')
            this.form = document.querySelector('#postMessageForm')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}: ${item.content}`
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then((object) => {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name} : ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value = '' // 提交后清空输入框内容
                console.log(object)
            })
        }
    }
    controller.init(view, model)
}.call()




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