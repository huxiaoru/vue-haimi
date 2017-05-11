<template>
	<div>
		<h3 class="title">{{data.Title}}</h3>
		<show-product :data="data.Products"></show-product>
	</div>
</template>
<script>
	import showProduct from "../shop/show_product";
	export default {
		props:{
			data:{
				type:Object,
				required:true
			}
		},
		components:{
			showProduct
		}
	}
</script>
<style lang="scss" scoped>
	.title{
		width:100%;
		line-height:.5rem;
		font-size:.14rem;
		font-weight:normal;
		text-align:center;
	}
</style>