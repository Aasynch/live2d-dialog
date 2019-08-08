$(window).on("load", function () {
	loadlive2d("live2d", "./model/haruto/haruto.model.json");
    //loadlive2d("live2d", "./model/neptune/model.json");
	var current = {
        body: document.getElementsByClassName("live2d-container left")[0],
		canvas: document.getElementById("live2d")
    };

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
				dialog.innerText = modules.rand(text);
			} else if (text.constructor == String) {
				dialog.innerText = text;
			} else {
				dialog.innerText = "输入出现问题了 嘤嘤嘤～～";
			}

			dialog.classList.add("active");

			clearTimeout(this.t);
			this.t = setTimeout(function () {
				dialog.classList.remove("active");
			}, 3000);
        },

		destroy: function() {
			current.body.parentNode.removeChild(current.body);
		}
	};

	var elements = {
		home: modules.create("span", {class: "live2d-button-home"}),
		language: modules.create("span", {class: "live-2d-button-language"}),
		close: modules.create("span", {class: "live-2d-button-close"})
	};

	var dialog = modules.create("div", {class: "live2d-dialog"});
	current.body.appendChild(dialog);

	var action = {
		touch: function() {
			current.canvas.onclick = function () {
				modules.render(["是…是不小心碰到了吧…", "我可要报警了！⌇●﹏●⌇", "你在干什么？！"]);
			};

			current.canvas.onmouseover = function () {
				modules.render(["干嘛呢你，快把手拿开～～", "鼠…鼠标放错地方了！", "你要干嘛呀？", "喵喵喵？", "怕怕(ノ≧∇≦)ノ", "非礼呀！救命！", "这样的话，只能使用武力了！", "我要生气了哦", "不要动手动脚的！", "真…真的是不知羞耻！", "Hentai！"]);
            }
		}
	};

	action.touch();


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