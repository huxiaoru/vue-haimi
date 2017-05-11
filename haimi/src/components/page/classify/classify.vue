<template>
	<div class="classify">
		<div class="nav_box">
			<nav class="navbar" id="nav" v-touchmove>
				<a v-for="(item,index) in btns" href="javascript:;" :class="{'on':!index}" @click="toggleClass(index)">
					{{item.text}}
				</a>
			</nav>
		</div>
		
		<component :is="currentView" :data="contentData"></component>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
	import footerBar from "@/components/base/footer";
	import classifyContent from "./classify_content";
	import brandContent from "./brand_content";
	export default {
		components:{
			footerBar,
			classifyContent,
			brandContent
		},
		data () {
			return {
				btns:[
					{
						"text":"分类",
						"parame":"yanxuan-cat-list"
					},
					{
						"text":"品牌",
						"parame":"yanxuan-brand-list"
					}
				],
				contentData:[],
				index:0,
				currentView:"classifyContent"
			}
		},
		methods:{
			toggleClass (index) {
				let btns=document.querySelectorAll("#nav a");
				for(let i=0;i<btns.length;i++){
					btns[i].className="";
				}
				btns[index].className="on";
				this.index=index;
				this.getData(index)
			},
			getData (index) {
				if(!index){
					this.currentView="classifyContent"
				}else{
					this.currentView="brandContent"
				}
				let that=this;
				this.$http.jsonp("http://m.haimi.com/api/ad-module/get",{
					params:{
						Alias:that.btns[index].parame,
						platform:"WAP"
					},
					jsonp:"_callback"
				}).then(res=>{
					const data=res.body.data;
					that.contentData=data;
				})
			}
		},
		created () {
			this.getData(this.index)
		}
	}
</script>
<style lang="scss" scoped>
	.classify{
		padding-bottom:.5rem;
	}
	.nav_box{
		width:100%;
		height:.44rem;
	}
	.navbar{
		width:100%;
		height:.44rem;
		background:#fff;
		display:flex;
		align-items:center;
		justify-content:center;
		a{
			height:.44rem;
			line-height:.44rem;
			padding:0 5px;
			margin:0 5px;
			&.on{
				border-bottom:3px solid #000;
			}
		}
	}
</style>