!function () {
    // 添加 offset 类
    let specialTags = document.querySelectorAll('[data-x]') // 获取到含有 data-x 的元素
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
    }
    setTimeout(function () {
        findClosestAndRemoveOffset()
    }, 3000)
    window.addEventListener('scroll', function (x) {
        findClosestAndRemoveOffset()
    })

    // helper
    function findClosestAndRemoveOffset() {
        let specialTags = document.querySelectorAll('[data-x]') // 获取到含有 data-x 的元素
        let minIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }
        }
        for (let i = 0; i < specialTags.length; i++) {
            specialTags[i].classList.remove('active')
        }
        // minIndex 就是离屏幕窗口顶部最近的元素
        specialTags[minIndex].classList.remove('offset')
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')
        let li = a.parentNode
        let brotherAndMe = li.parentNode.children
        for (let i = 0; i < brotherAndMe.length; i++) {
            brotherAndMe[i].classList.remove('highlight')
        }
        li.classList.add('highlight')
    }
    let liTags = document.querySelectorAll('nav.menu > ul > li')
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (x) {
            x.currentTarget.classList.add('active')
        }
        liTags[i].onmouseleave = function (x) {
            x.currentTarget.classList.remove('active')
        }
    }
}.call()

