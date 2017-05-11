<template>
	<div class="classify_content">
		<div v-for="item in data">
			<div v-if="item.Channel.Type=='Col1ImageOnly'" class="banner_box">
				<img v-lazy="item.Records[0].Picture" alt="">
			</div>
			<div v-if="item.Channel.Type=='ColNWithTitleAndBorder'" class="product_list">
				<span v-for="item in item.Records" :style="{color:item.SlideNameColor}" class="product_item">{{item.SlideName}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			data:{
				type:Array,
				default:[]
			}
		}
	}
</script>
<style lang="scss" scoped>
	.banner_box{
		width:100%;
		img{
			width:100%;
		}
	}
	.product_list{
		width:100%;
		padding:.15rem 0 .03rem;
		background:#fff;
		overflow:hidden;
		.product_item{
			float:left;
			border:1px solid #e5e5e5;
			padding:.05rem .08rem;
			margin:0 0 .12rem .14rem;
		}
	}
</style>