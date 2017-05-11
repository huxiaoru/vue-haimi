<template>
	<div>
		<div v-if="bannerData" class="banner">
			<img :src="bannerData" alt="">
		</div>
		<product-list v-for="item in productData" :data="item" :key="item"></product-list>
	</div>
</template>
<script>
	import productList from "./product_list";
	export default {
		props:{
			id:{
				type:String,
				default:"2"
			}
		},
		components:{
			productList
		},
		data () {
			return {
				bannerData:null,
				productData:null
			}
		},
		methods:{
			getBanner () {
				let that=this;
				this.$http.jsonp("http://m.haimi.com/api/ad-module/get",{
					params:{
						Alias:"index_"+that.id,
						platform:"WAP"
					},
					jsonp:"_callback"
				}).then(res=>{
					const data=res.body.data;
					if(data.length){
						that.bannerData=data[0].Records[0].Picture;
					}else{
						that.bannerData=null;
					}
					
				})
			},
			getProduct () {
				let that=this;
				this.$http.jsonp("http://m.haimi.com/api/nav/advert-team-products",{
					params:{
						NavID:that.id,
						page:1,
						pageSize:100,
						platform:"WAP"
					},
					jsonp:"_callback"
				}).then(res=>{
					const data=res.body.data;
					that.productData=data;
				})
			}
		},
		watch:{
			id () {
				this.getBanner()
				this.getProduct()
			}
		},
		created () {
			this.getBanner()
			this.getProduct()
		}
	}
</script>
<style lang="scss" scoped>
	.banner{
		width:100%;
		img{
			width:100%;
		}
	}
</style>