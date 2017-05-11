<template>
	<div>
		<recommend-content v-for="item in contentData" :data="item" :key="item"></recommend-content>
		<product-list v-for="item in productData" :data="item" :key="item"></product-list>
	</div>
</template>
<script>
	import recommendContent from "./recommend_content";
	import productList from "./product_list";
	export default {
		props:{
			id:{
				type:String,
				default:"2"
			}
		},
		data () {
			return {
				contentData:[],
				productData:[]
			}
		},
		created () {
			let that=this;
			this.$http.jsonp("http://m.haimi.com/api/ad-module/get",{
				params:{
					Alias:"index_"+that.id,
					platform:"WAP"
				},
				jsonp:"_callback"
			}).then(res=>{
				const data=res.body.data;
				that.contentData=data;
			})
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
		},
		components:{
			recommendContent,
			productList
		}
	}
</script>