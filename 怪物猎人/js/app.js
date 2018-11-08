new Vue({
			el:"#app",
			data:{
				isStart:false,
				mine:100,
				guaiwu:100,
				my:{
					backgroundColor:'red',
					height:10+'px'
				},
				log:[]
			},
			
			methods:{
				//  开始游戏按钮
				startGame:function(){
					this.isStart=true;
					this.mine = 100;
					this.guaiwu = 100;
					this.log=[];
				},
				// 放弃--结束游戏
				overGame:function(){
					this.isStart=false;
					
				},
				//  攻击按钮
				go:function(){
					var damage = this.random(3,10);
					this.guaiwu-=damage;
					this.log.unshift({
						isplayer:true,
						text:'你对怪物造成'+damage+'点伤害'
					});
					if(this.checkWin()){
						return;
					}
					this.mousego();
				},
				// 大招按钮
				bigGo:function(){
					var damage = this.random(10,20);
					this.guaiwu-=damage;
					this.log.unshift({
						isplayer:true,
						text:'你的大招对怪物造成'+damage+'点伤害'
					});
					if(this.checkWin()){
						return;
					}
					this.mousego();
				},
				// 回血按钮
				zhiliao:function(){
					if(this.mine<=90){
						this.mine+=10;
					}else{
						this.mine=100;
					}
					this.log.unshift({
						isplayer:true,
						text:'你回复了10点血'
					});
					this.mousego();
				},
				// 随机数
				random:function(min,max){
					return Math.max(Math.floor(Math.random()*max),min);
					
				},
				// 怪物攻击
				mousego:function(){
					var damage = this.random(5,12);
					this.mine-=damage
					this.log.unshift({
						isplayer:false,
						text:'怪物对你造成'+damage+'点伤害'
					});
					this.checkWin();
				},
				//  判断是否获胜  是否进行下一次游戏 return boolean
				checkWin:function(){
					if (this.guaiwu<=0) {
						if(confirm("你赢了，是否重新游戏！")){
							this.startGame();
						}else{
							this.isStart=false;
						}
						return true;
					}else if(this.mine<=0){
						if(confirm("你输了，是否重新游戏！")){
							this.startGame();
						}else{
							this.isStart=false;
						}
						return true;
					}
					return false;
				}	
			}
});