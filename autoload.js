$(window).on("load", function () {
	loadlive2d("live2d", "./model/haruto/haruto.model.json");
    //loadlive2d("live2d", "./model/neptune/model.json");
	var current = {
        body: document.getElementsByClassName("live2d-container left")[0],
		canvas: document.getElementById("live2d"),
		dialog: document.getElementsByClassName("live2d-dialog")[0],
		button_home: document.getElementsByClassName("live2d-button-home")[0],
		button_language: document.getElementsByClassName("live2d-button-language")[0],
		button_close: document.getElementsByClassName("live2d-button-close")[0],
		root: "https://aasynch.me"
    };

	console.log(current.root);
	var modules = {
		
		create: function (tag, prop) {
			var e = document.createElement(tag);
			if (prop.class) e.className = prop.class;
			return e;
        },

        rand: function (arr) {
			return arr[Math.floor(Math.random() * arr.length + 1) - 1];
        },

		render: function (text) {
			if (text.constructor == Array) {
				current.dialog.innerText = modules.rand(text);
			} else if (text.constructor == String) {
				current.dialog.innerText = text;
			} else {
				current.dialog.innerText = "输入出现问题了 嘤嘤嘤～～";
			}

			current.dialog.classList.add("active");

			clearTimeout(this.t);
			this.t = setTimeout(function () {
				current.dialog.classList.remove("active");
			}, 3000);
        },

		destroy: function() {
			current.body.parentNode.removeChild(current.body);
		}
	};

	var action = {
		touch: function() {
			current.canvas.onclick = function () {
				modules.render(["是…是不小心碰到了吧…", "我可要报警了！⌇●﹏●⌇", "你在干什么？！"]);
			};

			current.canvas.onmouseover = function () {
				modules.render(["干嘛呢你，快把手拿开～～", "鼠…鼠标放错地方了！", "你要干嘛呀？", "喵喵喵？", "怕怕(ノ≧∇≦)ノ", "非礼呀！救命！", "这样的话，只能使用武力了！", "我要生气了哦", "不要动手动脚的！", "真…真的是不知羞耻！", "Hentai！"]);
            }
		},

        button_home: function () {
			current.button_home.onclick = function () {
				location.href = current.root;
            }

            current.button_home.onmouseover = function () {
				modules.render("点击这里回到首页!");
            }
        },

        button_close: function () {
			current.button_close.onclick = function () {
				modules.destroy();
            };

            current.button_close.onmouseover = function () {
				modules.render("还..还能在见到你嘛? T T");
            }
        }
	};

	action.touch();
	action.button_home();
	action.button_close();


    var body = current.body;
    body.onmousedown = function () {
    	var location = {
            x: event.clientX - this.offsetLeft,
            y: event.clientY - this.offsetTop
        };

        function move(e) {
            body.classList.add("active");
            body.classList.remove("right");
            body.style.left = (event.clientX - location.x) + 'px';
            body.style.top  = (event.clientY - location.y) + 'px';
        }

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", function () {
            body.classList.remove("active");
            document.removeEventListener("mousemove", move);
        });
    };
});