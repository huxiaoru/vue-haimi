<template>
	<div class="navbar">
		<nav v-touchmove>
			<a v-for="(item,index) in data" href="javascript:;" :class="{on:!index}" @click='getIndex(index)' ref="btns">{{item.Title}}</a>
		</nav>
	</div>
</template>
<script>
	export default {
		props:{
			data:{
				type:Array,
				required:true
			}
		},
		methods:{
			getIndex (index){
				let btns=this.$refs.btns;
				for( let i=0;i<btns.length;i++){
					btns[i].className=""
				}
				btns[index].className="on";
				this.$emit("recommend",index)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.navbar{
		width:100%;
		height:.4rem;
		nav{
			height:.4rem;
			display:-webkit-box;
			overflow-x:auto;
			background:#fff;
			position:static;
			z-index:100;
			top:0;
			a{
				display:block;
				height:100%;
				font-size:.12rem;
				line-height:.4rem;
				padding:0 .07rem;
				margin:0 .08rem;
				&.on{
					border-bottom:3px solid #000;
				}
			}
		}
	}
</style>