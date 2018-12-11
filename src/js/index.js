require(['./js/config.js'], function() {
    require(['jquery', 'bscroll'], function($, bscroll) {
        var page = 1, //第几页数据
            page_size = 8,
            type = 1,
            total;
        // console.log($);
        var scroll = new bscroll('.content', {
            probeType: 2
        })
        var ts = document.querySelector('.ts');
        scroll.on('scroll', function() {
            console.log(this.maxScrollY);
            if (this.y < this.maxScrollY - 44) {
                if (page < total) {
                    ts.setAttribute('up', '释放加载更多……');
                } else {
                    ts.setAttribute('up', '没有更多数据');
                }

            } else {
                if (page < total) {
                    ts.setAttribute('up', '上拉加载');
                } else {
                    ts.setAttribute('up', '没有更多数据');
                }
            }
        })
        scroll.on('touchEnd', function() {
            //加载下一页数据
            if (ts.getAttribute('up') === '释放加载更多……') {
                if (page < total) {
                    page++;
                    getList();
                    ts.setAttribute('up', '上拉加载');
                } else {
                    ts.setAttribute('up', '没有更多数据');
                }
            }
        });
        getList();

        function getList() {
            //获取数据
            $.ajax({
                url: '/users/api/get/list',
                dataType: 'json',
                data: {
                    page: page,
                    page_size: page_size,
                    type: type
                },
                success: function(res) {
                    // console.log(res);
                    if (res.code === 1) {
                        renderList(res.msg);
                        total = res.total;
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            })
        }



        //渲染数据
        function renderList(data) {
            var str = '';
            var baseUrl = 'http://localhost:3000/images/'
            data.forEach(function(item) {
                    // console.log(res);
                    str += `<dl>
                <dt><img src="${baseUrl}${item.url}" alt=""></dt>
                <dd>${item.title}</dd>
                    </dl>`
                })
                // console.log(str);
            document.querySelector('.childer').innerHTML += str;
            scroll.refresh();
        };
        //点击切换
        var nav = document.querySelector('.header');
        nav.addEventListener('click', function(e) {
            type = e.target.getAttribute('data-id');
            document.querySelector('.childer').innerHTML = "";
            page = 0;
            getList();
        })
    })


})