window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //1.鼠标经过focus 显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器的变量
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);

    })
    //2.动态生成圆圈，有多少张图生成多少个圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        //创建li
        var li = this.document.createElement('li');
        //记录当前圆圈的索引号
        li.setAttribute('index', i);
        //把li插入到ol里面
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击圆圈，移动图片
            //ul移动的距离 圆圈的索引号 乘以 图片的宽度 
            var index = this.getAttribute('index');
            //当我们点击了li，就把这个li的索引号赋值给num
            num = index;
            //当我们点击了li，就把这个li的索引号赋值给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片放在ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，图片向右滚动
    var num = 0;
    // circle 控制圆圈的移动
    var circle = 0;
    //flag 就是节流阀
    var flag = true;
    //右侧按钮
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, - num * focusWidth, function () {
                flag = true;//打开节流阀
            });
            circle++;
            //如果circle = 4 说明走到最后的图片，复原
            if (circle == 4) {
                circle = 0
            }
            //清楚圆圈的所有样式
            circleChange()
        }
    });
    //左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, - num * focusWidth, function () {
                flag = true;
            });
            circle--;
            //如果circle < 0 说明第一张图片，则圆圈改为第四个圆圈
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange()
        }
    });
    function circleChange() {
        //清楚圆圈的所有样式
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //重新给圆圈赋值current的类名
        ol.children[circle].className = 'current';
    }
    //自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
})