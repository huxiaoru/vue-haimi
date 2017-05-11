<template>
	<div>
		<!--轮播-->
		<swiper v-if="type=='Slides'" :options="swiperOption" ref="mySwiper">
			<swiper-slide v-for="item in records" :key="item.Picture">
				<img :src="item.Picture" alt="">
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<!--导航条-->
		<nav v-if="type=='Col4ImageWithTitleNoDesc'" class="sub_nav">
			<a href="javascript:;" v-for="item in records">
				<img :src="item.PictureWebp" alt="">
				<span :style="{color:item.SlideNameColor}">{{item.SlideName}}</span>
			</a>
		</nav>
		<!--banner-->
		<div v-if="type=='Col1ImageOnly'" class="banner_box">
			<router-link :to="{ path: 'detail', query: { id: records[0].CastID }}" tag="img" :src="records[0].PictureWebp" alt=""></router-link>
		</div>
		<!--产品展示图-->
		<div v-if="type=='Col2LeftTop1LeftBottom1Right1' || type=='Col2ImageOnly'" class="product_box">
			<h3 class="title">{{title}}</h3>
			<div :class="type=='Col2LeftTop1LeftBottom1Right1'?'brand_img':'goods_img'">
				<router-link v-for="item in records" tag="img" :to="{ path: 'detail', query: { id: item.CastID }}" v-lazy="item.Picture" alt="" :key="1"></router-link>
			</div>
		</div>
		<!--产品列表-->
		<div v-if="type=='Col3AndHalfWithTitleAndDesc'" class="product_list">
			<router-link v-for="item in records" :to="{ path: 'detail', query: { id: item.CastID }}" tag="div" :key="1" class="product_item">
				<img v-lazy="item.Picture" alt="">
				<div class="aside">
					<span class="ellipsis">{{item.SlideName}}</span>
					<span class="price">{{item.Description}}</span>
				</div>
			</router-link>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			data:{
				type:Object,
				required:true
			}
		},
		data () {
			return {
				type:this.data.Channel.Type,
				records:this.data.Records,
				title:this.data.Channel.Name,
				swiperOption:{
					autoplay:3000,
					speed:1000,
					autoplayDisableOnInteraction:false,
					loop:true,
					pagination:".swiper-pagination"
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.swiper-slide img{
		width:100%;
	}
	.sub_nav{
		width:100%;
		height:.9rem;
		margin-top:.1rem;
		background:#fff;
		display:flex;
		a{
			flex:1;
			display:flex;
			flex-direction:column;
			justify-content:center;
			align-items:center;
			img{
				width:100%;
			}
			span{
				font-size:.14rem;
				padding-top:.05rem;
			}
		}
	}
	.banner_box{
		width:100%;
		margin-top:.1rem;
		img{
			width:100%;
		}
	}
	.product_box{
		width:100%;
		margin-top:.1rem;
		background:#fff;
		.title{
			width:100%;
			text-align:center;
			line-height:.5rem;
			font-size:.16rem;
			color:#5c5c5c;
			font-weight:normal;
		}
		.brand_img{
			width:100%;
			height:2.4rem;
			position:relative;
			img{
				position:absolute;
			}
			img:nth-child(3n+1){
				width:50%;
				height:50%;
				top:0;
				left:0;
			}
			img:nth-child(3n+2){
				width:50%;
				height:50%;
				top:1.2rem;
				left:0rem;
			}
			img:nth-child(3n){
				width:50%;
				height:100%;
				top:0rem;
				right:0rem;
			}
		}
		.goods_img{
			width:100%;
			overflow:hidden;
			img{
				float:left;
				width:50%;
			}
		}
	}
	.product_list{
		width:100%;
		overflow-x:scroll;
		display:-webkit-box;
		background:#fff;
		.product_item{
			width:25%;
			display:flex;
			flex-direction:column;
			justify-content:center;
			align-items:center;
			margin:0 3px;
			padding-bottom:3px;
			img{
				width:100%;
				display:block;
			}
			.aside{
				width:100%;
				span{
					width:100%;
					font-size:.14rem;
					text-align:center;
					display:block;
					&.price{
						color:#999;
						font-size:.12rem;
					}			
				}
			}
		}
	}
</style>