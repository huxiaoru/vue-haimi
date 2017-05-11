<template>
	<div class="home_wrap">
		<div class="search">
			<input type="search" placeholder="搜索宝贝">
			<span class="btn">搜索</span>
			<img src="../../../public/img/search.png" alt="">
		</div>
		<nav-bar :data="data" @recommend="isRecommend"></nav-bar>
		<component :is="currentView" :id="navId"></component>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
	import footerBar from "@/components/base/footer";
	import navBar from "@/components/base/navbar";
	import recommend from "@/components/page/home/recommend";
	import other from "@/components/page/home/other";
	export default {
		data () {
			return {
				data:[],
				currentView:"recommend",
				navId:"2"
			}
		},
		components:{
			footerBar,
			navBar,
			recommend,
			other
		},
		created () {
			let that=this;
			this.$http.jsonp("http://m.haimi.com/api/nav/list",{
				params:{
					platform:"WAP"
				},
				jsonp:"_callback"
			}).then(data=>{
				that.data=data.body.data
			})
		},
		methods:{
			isRecommend (index) {
				this.navId=this.data[index].NavID;
				if(index){
					this.currentView="other"
				}else{
					this.currentView="recommend"
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.home_wrap{
		padding-bottom:.5rem;
	}
	.search{
		width:100%;
		height:.44rem;
		border-bottom: 1px solid #e5e5e5;
		background: #242424;
		padding:.08rem .1rem;
		display:flex;
		align-items: center;
		position:relative;
		img{
			position:absolute;
			width:4%;
			left:4%;
		}
		.btn{
			color:#fff;
			width:.37rem;
			text-align:center;
			font-size:.12rem;
		}
		input{
			flex:1;
			background:#1a1a1a;
			height:100%;
			border-radius:3px;
			padding-left:10%;
			color:#fff;
		}
	}
</style>