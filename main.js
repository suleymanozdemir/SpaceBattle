$(function() {
	/*var container = $('#container'),
		allies = $('#allies'),
		enemy = $('#enemy'),
		fire = $('#lazer'),
		body = $('body'),
		enemyFire = $('.enemy_fire'),
		score =	$('#score'),		
		game_over = false,
		move_left = false,
		move_right = false,
		move_top = false,
		move_bottom = false,
		move_fire = false,
		isFire = false,
		enemycount = Math.floor(Math.random() * 5 ) + 1,
		enemies = [],
		bgInterval,
		enemyInterval,
		fireInterval
		score = 0;

	$(document).on('keydown', function(e) {
		if (game_over === false) {
			var key = e.keyCode;
			if ( key === 37 && move_left === false ) {
				move_left = requestAnimationFrame(left);
			} else if (key === 39 && move_right === false) {
				move_right =requestAnimationFrame(right);
			} else if (key === 38 && move_top === false) {
				move_top = requestAnimationFrame(top);
			} else if (key === 40 && move_bottom === false) {
				move_bottom = requestAnimationFrame(bottom);
			} else if (key === 32 && move_fire === false){
				move_fire = requestAnimationFrame(setFire);
			}
		}
	});

	$(document).on('keyup', function(e) {
		if ( game_over === false ) {
			var key = e.keyCode;
			if ( key === 37) {
				cancelAnimationFrame(move_left);
				move_left = false;
			} else if (key === 39 ) {
				cancelAnimationFrame(move_right);
				move_right = false;
			} else if (key === 38 ) {
				cancelAnimationFrame(move_top);
				move_top = false;
			}else if (key === 40 ) {
				cancelAnimationFrame(move_bottom);
				move_bottom = false;
			}if (key === 32){
				cancelAnimationFrame(move_fire);
				move_fire = false;
			}
		}
	});

	function left() {
		if ( game_over === false && parseInt(allies.css('left')) > 0 ) {
			allies.css('left', parseInt(allies.css('left')) - 5 );
			move_left = requestAnimationFrame(left);
		}
	}
	function right() {
		if ( game_over === false && parseInt(allies.css('left')) < $(window).width() - allies.width() ){
			allies.css('left', parseInt(allies.css('left')) + 5 );
			move_right = requestAnimationFrame(right);
		}
	}

	function top() {
		if ( game_over === false && parseInt(allies.css('top')) >= 0 ){
			allies.css('top', parseInt(allies.css('top')) - 5);
			move_top = requestAnimationFrame(top);
		} 
	}
	function bottom() {
		if ( game_over === false && parseInt(allies.css('top')) < $(window).height() - allies.height() ) {
			allies.css('top', parseInt(allies.css('top')) + 5);
			move_bottom = requestAnimationFrame(bottom);
		}
	}

	var x = 0;
	var y = 0;
	function background() {
		if ( y <= 1080 ) {
			y += 1;
			container.css('background-position', + x + 'px ' + y + 'px ');
		} else {
			y = 0;
		}
	}
	bgInterval = setInterval(background, 6);

	// Enemy Ship //
	
	function spanEnemies() {
		for (var i = 1; i <= enemycount; i++) {
			var new_enemy = enemy.clone().removeClass('template').appendTo( "#container" ); 
			new_enemy.css('top', (-(Math.random() * 200) - new_enemy.height()) + 'px');
			new_enemy.css('left', (Math.random() * ($(window).width() - new_enemy.width())) + 'px');
			enemies.push(new_enemy);
		}
	}
	spanEnemies();

	function enemyAnim() {
		if ( enemies.length > 0 ) {
			for (var i = 0; i < enemycount; i++) {
				var oldTop = enemies[i].offset().top;

				if ( oldTop < $(window).height() )
					enemies[i].css('top', (oldTop + 5 ) + 'px');
				else
					enemies[i].remove()
			}
			if ( container.find('#enemy').length === 0 ) {
				enemies = [];
				enemycount = Math.floor(Math.random() * 5 * Math.floor(score / 5) ) + 1;
				setTimeout(spanEnemies, 5000);
			}
		}
	}
	enemyInterval = setInterval(enemyAnim, 50);

	function detectCollision(offset) {
		if ( enemies.length > 0 ) {
			var collide = false;
			for (var i = 0; i < enemycount; i++) {
				var en = enemies[i],
					enTop = en.offset().top,
					enLeft = en.offset().left,
					enRight = enLeft + en.width(),
					enBottom = enTop + en.height(),
					fiTop = offset.top;
					fiLeft = offset.left,
					fiRight = fiLeft + fire.width();
					fiBottom = fiTop + fire.height();

				if (
					(fiRight > enLeft && fiLeft < enRight ) && 
					fiTop < enBottom
				) {
					collide = enemies[i];

				}
			}
			return collide;
		}
	}

	function fireAnime() {
		if ( fire.offset().top + fire.height() > 0 ) {
			fire.css('top', (fire.offset().top - 5) + 'px');
			var collide = detectCollision(fire.offset());
			if ( collide) {
				isFire = false;
				fire.css('display', 'none');
				collide.remove();
				clearInterval(fireInterval);
			}
		}else {
			isFire = false;
			fire.css('display', 'none');
			clearInterval(fireInterval);
		}
		if (collide) {
			score++;
			
			$(".counter").text("Score : " + score);
			}

	}
	function setFire() {
		if ( !isFire ) {
			fire.css({
				display: 'block',
				top: (allies.offset().top - fire.height()) + 'px',
				left: (allies.offset().left + (allies.width() / 2) - (fire.width() / 2)) + 'px'
			});
			isFire = true;
			fireInterval = setInterval(fireAnime, 5);
		}
	}
});