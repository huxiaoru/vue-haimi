<template>
	<div class="product_list">
		<router-link v-for="item in data" :to="{ path: 'detail', query: { id: item.ProductID }}" tag="div" class="product_item left" :key="1">
			<div class="img_box" v-lazy:background-image="item.Pictures" ></div>
			<span class="ellipsis">{{item.Subject}}</span>
			<span class="price">￥{{item.FinalPrice}}</span>
		</router-link>
	</div>
</template>
<script>
	export default {
		props:["data"]
	}
</script>
<style lang="scss" scoped>
	.product_list{
		width:100%;
		overflow:hidden;
		.product_item{
			width:50%;
			margin-bottom:.06rem;
			.img_box{
				width:100%;
				padding-top:100%;
				background:no-repeat center center;
				background-size:cover;
			}
			span{
				display:block;
				width:100%;
				padding-left:.06rem;
				background:#fff;
			}
			&:nth-child(odd){
				padding-right:.03rem;
			}
			&:nth-child(even){
				padding-left:.03rem;
			}
		}
	}
</style>