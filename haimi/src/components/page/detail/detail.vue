<template>
	<div>
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide v-for="item in focusImgData" :key="item.picture">
				<img :src="item.picture" alt="">
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<div class="info">
			<p class="title">{{data.Subject}}</p>
			<div class="price">
				<span class="right">月销{{data.MonthSalesNum}}件</span>
				<span>￥{{data.FinalAmount}}</span>
				<span>￥{{data.DomesticPrice}}</span>
			</div>
			<div class="postage">
				<span>邮费{{data.Postage}}元</span>
			</div>
		</div>
		<div class="other">
			<ul>
				<li class="promises">
					<span v-for="item in data.Promises">{{item}}</span>
				</li>
				<li>
					<a v-for="item in data.Promotions">{{item.Subject}}</a>
				</li>
			</ul>
		</div>
		<div class="other" v-show="detailProductInfo.length">
			<ul @click="showMenu">
				<li>
					<a id="sizeClassify2">请选择：{{title}}</a>
				</li>
			</ul>
		</div>
		<div class="comment">
			<p class="product-score">
				<span>宝贝评分</span>
				<span><i :style="{width:data.ProductScore*20+'%'}"></i></span>
				<span>{{data.ProductScore}}分</span>
			</p>
			<ul class="comment_list">
				<li v-for="item in data.TopReviews">
					<div class="comment-info clear">
						<time class="create-time right">{{item.CreateTime | time}}</time>
						<div class="heade-img left">
							<img :src="item.Buyer.Avatar" alt="">
						</div>
						<div class="nickname left">{{item.Buyer.NickName}}</div>
					</div>
					<p class="content_text">{{item.BuyerNote}}</p>
					<div class="comment-img clear">
						<div class="left">
							<img :src="item.BuyerPicturesThumb" alt="">
						</div>
					</div>
				</li>
			</ul>
			<a href="javascript:;" class="all-btn">全部评价({{data.ReviewCount}})</a>
		</div>
		<div class="shop-box clear">
			<img :src="mallData.LogoSrc" class="left" alt="">
			<div class="shop_info left">
				<h3>{{mallData.MallName}}</h3>
				<p>{{mallData.Introduction}}</p>
			</div>
		</div>
		<div class="shop-brand">
			<a href="javascript:;">发现更多<span>MUID</span>良品</a>
		</div>
		<div class="details-box">
			<h3 class="title">商品详情</h3>
			<div class="weixin">
				<img :src="mallData.WeixinQRCode" alt="">
			</div>
			<div class="content_box" v-html="data.Descriptioin"></div>
		</div>
		<div class="Recommend_box">
			<div class="title">
				<img src="../../../public/img/product_tj.png" alt="">
			</div>
			<show-product :data="data.Recommend"></show-product>
		</div>
		<div class="copyright">由海蜜提供技术支持</div>
		<div class="buy_box">
			<div class="left_content">
				<router-link to="/" tag="span" class="home"></router-link>
				<span class="fav"></span>
				<span class="car"></span>
			</div>
			<div class="right_content">
				<div @click="showMenu">加入购物车</div>
				<div @click="showMenu">立即购买</div>
			</div>
		</div>
		<div class="tip_box" v-show="tipFlag">
			<span class="tip">{{tip}}</span>
		</div>
		<div class="mark">
			<transition name="bg">
				<div class="bg" @click="hideMenu" v-show="menuFlag"></div>
			</transition>
			<div class="buy_info" ref="info">
				<div class="title clear">
					<img :src="pic" alt="" class="left">
					<div class="left">
						<p>¥{{price}}</p>
						<p>(库存{{stock}}件)</p>
						<p id="sizeClassify" v-show="title">请选择：{{title}}</p>
					</div>
				</div>
				<div class="sku" v-if="title">
					<h3>{{title}}</h3>
					<ul class="list clear" id="sizeList">
						<li v-for="(item,index) in detailProductInfo" class="left" @click="changeProduct(index)" ref="sizeItems">
							{{item.SkuName}}
						</li>
					</ul>
				</div>
				<div class="num">
					<div>购买数量</div>
					<div>
						<span class="btn" @click="reduce">-</span>
						<span class="value">{{num}}</span>
						<span class="btn" @click="add">+</span>
					</div>
				</div>
				<div class="sub_box">
					<span @click="addShopCar">加入购物车</span>
					<span>立即购买</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import showProduct from "../shop/show_product";
	export default {
		components:{
			showProduct
		},
		data () {
			return {
				id:'',
				data:[],
				focusImgData:[],
				mallData:[],
				detailProductInfo:[],
				detailProductImg:[],
				title:'',
				pic:'',
				price:'',
				stock:'',
				class:"",
				productId:'',
				tip:"最少购买一件",
				tipFlag:false,
				menuFlag:false,
				num:1,
				swiperOption:{
					pagination:".swiper-pagination"
				}
			}
		},
		methods:{
			getData () {
				if(!this.id)return false;
				let that=this;
				this.$http.jsonp("http://www.haimi.com/api/product/detail-cdn",{
					params:{
						ProductID:that.id,
						platform:"WAP"
					},
					jsonp:"_callback"
				}).then(res=>{
					const data=res.body.data;
					that.data=data;

					this.focusImgData=JSON.parse(data.ProductPictures);
					this.mallData=data.Mall;
					if(data.AttrInfoArray.length){
						this.title=data.AttrInfoArray[0].AttrName;
						this.detailProductInfo=data.SkuInfo;
						this.detailProductImg=data.SkuPictures;
					}
					this.pic=data.Pictures;
					this.price=data.FinalPrice;
					this.stock=data.Stock;
					this.productId=data.ProductID;
				})
			},
			getId () {
				this.id=this.$route.query.id
			},
			showMenu () {
				this.menuFlag=true
				this.$refs.info.style.bottom=0;
			},
			hideMenu () {
				this.menuFlag=false
				this.$refs.info.style.bottom="-100%";
			},
			add () {
				this.num++;
			},
			reduce () {
				let that=this;
				if(this.num<=1){
					that.changeTip()
					return false;
				}
				this.num--;
			},
			changeTip (text) {
				let that=this;
				if(text)this.tip=text;
				this.tipFlag=true;
				setTimeout(()=>{
					that.tipFlag=false
				},3000)
			},
			changeProduct (index) {
				let sizeItems=this.$refs.sizeItems,
					sizeClassify=document.querySelector("#sizeClassify"),
					sizeClassify2=document.querySelector("#sizeClassify2");
				for(let i=0;i<sizeItems.length;i++){
					sizeItems[i].className='left'
				}
				sizeItems[index].className=sizeItems[index].className+" on";
				this.pic=this.detailProductImg[index].Picture;
				this.price=this.detailProductInfo[index].Price;
				this.stock=this.detailProductInfo[index].Stock;
				this.class=this.detailProductInfo[index].SkuName;
				sizeClassify.innerHTML="已选择："+this.detailProductInfo[index].SkuName;
				sizeClassify2.innerHTML="已选择："+this.detailProductInfo[index].SkuName;
			},
			addShopCar () {
				let proData={
					pic:this.pic,
					price:this.price,
					size:this.num,
					title:this.data.Subject,
					productId:this.productId,
					ischecked:false
				};

				if(this.detailProductInfo.length){
					if(!this.class){
						this.changeTip('请选择分类')
					}else{
						proData.class=this.title+"："+this.class;
						this.$store.commit("addPro",proData)
						this.changeTip('添加购物车成功')
						this.hideMenu()
					}
				}else{
					this.$store.commit("addPro",proData)
					this.changeTip('添加购物车成功')
					this.hideMenu()
				}
			}
		},
		created () {
			this.getId()
			this.getData()
		},
		watch:{
			'$route.query.id' () {
				this.title="";
				this.detailProductInfo=[];
				this.getId()
				this.getData()
			}
		},
		filters:{
			time (val) {
				let time=(new Date()*1-new Date(val)*1)/1000,
					day=Math.ceil(time/(24*60*60)),
					hour=Math.ceil(time/(60*60)%24),
					minute=Math.ceil(time/60%60);
				if(day){
					return day+"天前"
				}else if(hour){
					return day+"小时前"
				}else{
					return day+"分前"
				}
			}
		}
	}
</script>
<style lang="scss">
	.swiper-slide img{
		width:100%;
	}
	.info{
		width:100%;
		background:#fff;
		padding-top:.15rem;
		.title{
			font-size:.16rem;
			padding:0 .15rem;
		}
		.price{
			width:100%;
			padding:.1rem .15rem 0;
			overflow:hidden;
			span:nth-child(1){
				font-size:.12rem;
				color:#999;
				margin-top:.03rem;
			}
			span:nth-child(2){
				font-size:.16rem;
				color:#991f33;
			}
			span:nth-child(3){
				text-decoration:line-through;
				font-size:.12rem;
				color:#999;
				margin-left:.05rem;
			}
		}
		.postage{
			width:100%;
			height:.32rem;
			border-top:1px solid #eee;
			padding:0 .15rem;
			span{
				display:block;
				width:100%;
				height:100%;
				line-height:.32rem;
				color:#999;
				font-size:.12rem;
				padding-left:.07rem;
				background:url("../../../public/img/xiaodian.png") no-repeat left center;
				background-size:.03rem;
			}
		}
	}
	.other{
		width:100%;
		margin-top:.1rem;
		background:#fff;
		li{
			padding:0 .15rem;
			a{
				display:block;
				width:100%;
				height:.43rem;
				line-height:.43rem;
				padding-right:.18rem;
				background:url("../../../public/img/right.png") no-repeat right center;
				background-size:.15rem;
			}
		}
		.promises{
			width:100%;
			border-bottom:1px solid #eee;
			span{
				display:inline-block;
				height:.43rem;
				line-height:.43rem;
				padding:0 .1rem 0 .2rem;
				font-size:.1rem;
				background:url("../../../public/img/yes.png") no-repeat left center;
				background-size:.15rem;
				&:last-child{
					padding-right:0;
				}
			}
		}
	}
	.comment{
		width:100%;
		margin-top:.1rem;
		background:#fff;
		.product-score{
			width:100%;
			padding:.17rem .12rem;
			span:nth-child(3){
				color:#991f33;
			}
			span:nth-child(2){
				display:inline-block;
				width:1rem;
				height:.16rem;
				margin:0 .1rem;
				background-image:url("../../../public/img/star1.png");
				background-size:auto 100%;
				i{
					display:block;
					width:100%;
					height:100%;
					background-image:url("../../../public/img/star2.png");
					background-size:auto 100%;
				}
			}
		}
		.comment_list{
			li{
				margin:.12rem .12rem 0;
				border-bottom:1px solid #eee;
				.comment-info{
					height:.24rem;
					line-height:.24rem;
					.heade-img{
						width:.24rem;
						height:.24rem;
						img{
							width:100%;
							height:100%;
						}
					}
					.nickname{
						color:#999;
						margin-left:.1rem;
					}
					.create-time{
						color:#999;
						font-size:.12rem;
					}
				}
				.content_text{
					padding:.11rem;
				}
				.comment-img{
					padding-bottom:.15rem;
					&>div{
						width:.5rem;
						height:.5rem;
						margin-right:.08rem;
						img{
							width:100%;
							height:100%;
						}
					}
				}
			}
		}
		.all-btn{
			display:block;
			width:100%;
			line-height:.44rem;
			text-align:center;
			border-top:1px solid #eee;
		}
	}
	.shop-box{
		margin-top:.1rem;
		padding:.12rem;
		background:#fff;
		img{
			width:.5rem;
			height:.5rem;
		}
		.shop_info{
			padding-left:.1rem;
			padding-top:.05rem;
			h3{
				font-weight:normal;
			}
			p{
				font-size:.1rem;
			}
		}
	}
	.shop-brand{
		margin-top:.1rem;
		padding:0 .12rem;
		background:#fff;
		a{
			display:block;
			height:.43rem;
			line-height: .43rem;
			background:url("../../../public/img/right.png") no-repeat right center;
			background-size: auto .1rem;
			span{
				color:#991f33;
			}
		}
	}
	.details-box{
		margin-top:.1rem;
		padding:0 .12rem;
		background:#fff;
		.title{
			line-height:.48rem;
			font-weight:normal;
			font-size:.14rem;
		}
		.weixin{
			margin-bottom:.12rem;
			img{
				width:100%;
			}
		}
		.content_box p img{
			width:100%!important;
		}
	}
	.Recommend_box{
		.title{
			img{
				width:100%;
			}
		}
	}
	.copyright{
		line-height:.37rem;
		font-size:.1rem;
		text-align:center;
		color:#ccc;
		padding-bottom:.5rem;
	}
	.buy_box{
		width:100%;
		height:.5rem;
		background:#fff;
		display:flex;
		position:fixed;
		bottom:0;
		.left_content{
			width:40%;
			height:100%;
			display:flex;
			span{
				flex:1;
				background:no-repeat center center;
				background-size:70%;
			}
			.home{
				background-image: url("../../../public/img/home1.png");
			}
			.fav{
				background-image: url("../../../public/img/fav.png");
			}
			.car{
				background-image: url("../../../public/img/shop1.png");
			}
		}
		.right_content{
			flex:1;
			display:flex;
			div{
				flex:1;
				text-align:center;
				line-height:.5rem;
				&:last-child{
					color:#fff;
					background:#801a2a;
				}
			}
		}
	}
	.mark{
		.bg-enter, .bg-leave-active {
		    opacity: 0
		}
		.bg-enter-active, .bg-leave-active {
		    transition: all .3s
		}
		.bg{
			position:fixed;
			width:100%;
			height:100%;
			top:0;
			z-index:100;
			background:rgba(0,0,0,0.5);
		}
		.buy_info{
			position:fixed;
			bottom:-100%;
			background:#fff;
			width:100%;
			z-index:101;
			transition: all .5s;
			.title{
				padding:.15rem .12rem;
				border-bottom: 1px solid #e0e0e0;
				img{
					width:.6rem;
					height:.6rem;
					margin-right:.1rem;
				}
				p:first-child{
					color:#991f33;
				}
				p:nth-child(2){
					color:#999;
					font-size:.1rem;
				}
			}
			.sku{
				padding:.1rem 0;
				margin:0 .12rem;
				border-bottom: 1px solid #e6e6e6;
				h3{
					font-size:.1rem;
					font-weight:normal;
					padding-bottom:.1rem;
				}
				li{
					font-size:.1rem;
					padding:0 .1rem;
					border:1px solid #000;
					margin:0 .12rem .08rem 0;
					line-height:.3rem;
					&.on{
						color:#991f33;
						border-color:#991f33;
					}
				}
			}
			.num{
				height:.6rem;
				padding:.13rem .12rem;
				display: flex;
				justify-content:space-between;
				div{
					display: flex;
					align-items:center;
					span{
						height:100%;
						display:flex;
						align-items:center;
						justify-content:center;
					}
					.value{
						width:.55rem;
						border-top:1px solid #e6e6e6;
						border-bottom:1px solid #e6e6e6;
					}
					.btn{
						border:1px solid #e6e6e6;
						width:.35rem;
						font-size:.2rem;
					}
				}
			}
			.sub_box{
				width:100%;
				height:.44rem;
				display: flex;
				span{
					flex:1;
					text-align:center;
					line-height:.44rem;
					font-size:.16rem;
					&:last-child{
						color:#fff;
						background:#801a2a;
					}
				}
			}
		}
	}
	.tip_box{
		position:fixed;
		width:100%;
		height:100%;
		top:0;
		z-index:101;
		display:flex;
		align-items:center;
		justify-content:center;
		.tip{
			display:block;
			color:#fff;
			background:rgba(0,0,0,.6);
			padding:.08rem .12rem;
			border-radius:3px;
		}
	}
</style>