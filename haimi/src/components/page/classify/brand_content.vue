<template>
	<div class="brand_content">
		<div class="brand_card" v-for="item in data[0].Records">
			<div class="img_box" v-lazy:background-image="item.Picture"></div>
			<span class="ellipsis">{{item.SlideName}}</span>
			<span class="ellipsis">{{item.Description}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			data:{
				type:Array,
				required:true
			}
		}
	}
</script>
<style lang="scss" scoped>
	.brand_content{
		width:100%;
		overflow:hidden;
		.brand_card{
			width:33.33%;
			float:left;
			.img_box{
				width:100%;
				padding-top:100%;
				background:no-repeat center center;
				background-size:cover;
			}
			span{
				display:block;
				text-align:center;
				width:100%;
				padding:0 3px;
			}
		}
	}
</style>