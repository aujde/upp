class Game {
	views = null;
	ui = null;

	tickPrevious = null;
	tickInterval = 800;
	tickHandle = null;

	foo = 1;

	start() {
		this.ui = new UI();
		this.ui.register();

		this.views = new ViewHandler();

		this.views.registerView("#mid-top", () => `Hello, world ${game.foo}`);
		this.views.render();

		this.generateBattle();

		this.timerId = setInterval(() => {
			var currentTime = new Date().getTime();
			if (this.tickPrevious) {
				this.tick(currentTime - this.tickPrevious);
			}
			this.tickPrevious = currentTime;
		}, this.tickInterval);
	}

	generateBattle() {
		
	}

	tick(delta) {
		// console.log(delta);
		this.foo++;
		this.views.render();
	}
}

class ViewHandler {
	views = {};

	registerView(target, html) {
		this.views[target] = html;
	}

	removeView(target) {
		delete this.views[target];
	}

	render() {
		for (var target in this.views) {
			$(target).html(this.views[target]());
		}
	}
}

class UI {
	currentHoverHandle = null;

	register() {
		jQuery("#tabs ul li").click(this.tabclick);
		jQuery(".has-hover").mouseenter(this.infoboxHover).mousemove(this.infoboxMove).mouseleave(this.infoboxClear);
	}

	infoboxHover(e) {
		jQuery(this).children(".hover").addClass('hovered').show();
	}

	infoboxMove(e) {
		jQuery(this).children(".hover").css('left', (e.clientX + 10) + 'px').css('top', (e.clientY + 10) + 'px');
	}

	infoboxClear(e) {
		jQuery(this).children(".hover").removeClass('hovered').hide();
	}

	tabclick() {
		game.ui.switchTab($(this).data('tab'));

	}

	switchTab(tab) {
		jQuery("#tabs ul li").removeClass('selected');
		jQuery("#tabs ul li[rel=" + tab + "]").addClass('selected');
		jQuery(".main").hide();
		jQuery("#" + tab).show();
		console.log("Tab switch: " + tab);
	}
}

const game = new Game();
$(function () {
	game.start();
});
