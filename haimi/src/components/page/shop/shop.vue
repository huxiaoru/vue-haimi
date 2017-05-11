<template>
	<div class="wrap">
		<div v-if="!length" class="shop_content">
			<img src="../../../public/img/shopCar.png" alt="">
			<router-link to="/" tag="span" class="goHome">去首页逛逛</router-link>
			<h1>大家都在买的宝贝</h1>
			<show-product :data="contentData"></show-product>
		</div>
		<div v-else class="guowu">
			<div>
				<header class="header">
					<input type="checkbox" class="check" v-model="checkAll" @click="check">
					<i class="logo"></i>
					<span>海蜜严选</span>
				</header>
				<main class="gou_main">
					<ul>
						<li v-for="(item,index) in proData">
							<aside>
								<input type="checkbox" class="check" v-model="item.ischecked" 
								@click="check">
								<i class="logo"></i>
							</aside>
							<dl >
								<router-link 
								:style="{backgroundImage:'url('+item.pic+')'}"
								:to="{ path: 'detail', query: { id: item.productId }}"
								tag="dt"
								:key="item.productId"></router-link>
								<dd>
									<p>
										<span class="ellipsis">{{item.title}}</span>
										<span @click="del(index)">删除</span>
									</p>
									<p v-if="item.class" class="ellipsis">{{item.class}}</p>
									<p><span>￥ {{item.price}}</span><span> x {{item.size}}</span></p>
								</dd>
							</dl>
						</li>
					</ul>
				</main>
				<footer class="footer">
					<aside><input type="checkbox" class="check" v-model="checkAll" @click="check">
					<i class="logo"></i><span>全选</span></aside>
					<aside>
						<aside><span>合计：￥{{price}}</span><span>以优惠 0 元</span></aside>
						<aside><button>结算</button></aside>
					</aside>
				</footer>
			</div>
		</div>
		<footer-bar></footer-bar>
		<div class="mark" v-show="markFlag">
			<div class="content">
				<p>确认从购物车删除?</p>
				<div class="btn_box">
					<span class="cancel" @click="cancel">取消</span>
					<span class="confirm" @click="confirm">确定</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import footerBar from "@/components/base/footer";
	import showProduct from "./show_product";
	export default {
		components:{
			footerBar,
			showProduct
		},
		data () {
			return {
				contentData:[],
				proData:[],
				length:this.$store.state.shopCar.shopCar.length,
				ind:0,
				markFlag:false,
				checkAll:false,
				price:0
			}
		},
		methods:{
			getData () {
				let that=this;
				this.$http.jsonp("http://m.haimi.com/api/cart/info",{
					params:{
						clearInvalidProducts:"Y",
						platform:"WAP"
					},
					jsonp:"_callback"
				}).then(res=>{
					const data=res.body.extra.Suggest;
					that.contentData=data;
				})
			},
			del (index) {
				this.ind=index;
				this.markFlag=true;
			},
			cancel () {
				this.markFlag=false;
			},
			confirm () {
				this.markFlag=false;
				this.proData.splice(this.ind,1)
				this.$store.dispatch("addPro")
			},
			check () {
				let that=this;
				setTimeout(()=>{
					that.price=0;
					that.proData.forEach((val)=>{
						if(val.ischecked){
							that.price+=val.price*1
						}
					})
				},100)
			}
		},
		created () {
			this.getData()
			this.proData=this.$store.state.shopCar.shopCar;
		},
		watch:{
			proData () {
				this.length=this.$store.state.shopCar.shopCar.length
			},
			checkAll () {
				this.proData.forEach((val)=>{
					val.ischecked=this.checkAll
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.mark{
		position:fixed;
		top:0;
		bottom:0;
		width:100%;
		background:rgba(0,0,0,.5);
		z-index:101;
		display:flex;
		justify-content: center;
		align-items: center;
		.content{
			width:100%;
			background:#fff;
			width:2.8rem;
			p{
				padding:.37rem .12rem;
				text-align: center;
				font-size:.16rem; 
			}
			.btn_box{
				width:100%;
				height:.44rem;
				border-top:1px solid #eee;
				display:flex;
				span{
					flex:1;
					line-height:.44rem;
					text-align: center;
				}
				.cancel{
					border-right:1px solid #eee;
				}
				.confirm{
					color:#991f33;
				}
			}
		}
	}
	.shop_content{
		width:100%;
		img{
			display:block;
			width:1rem;
			margin:1.4rem auto .15rem;
		}
		.goHome{
			display:block;
			width:.82rem;
			text-align:center;
			border:1px solid #000;
			margin:0 auto;
			line-height:.18rem;
			font-size:.12rem;
		}
		h1{
			width:100%;
			text-align:center;
			margin-top:.7rem;
			background:#fff;
			font-size:.14rem;
			font-weight:normal;
			line-height:.44rem;
		}
	}
	.guowu{
		width:100%;
		height:100%;
		background:#fff;
		box-sizing: border-box;

	.logo{
		display: block;
		background:url(../../../public/img/xun.png) no-repeat center center;
		background-size: cover ;
		height:.24rem;
		width:.24rem;
		margin-right:.15rem;
	}
	.check{
		position: absolute;
		height:.24rem;
		width:.24rem;
		opacity: 0;
		top:0;
		&:checked+.logo{
			background-image:url("../../../public/img/yes.png");
		}
	}

	&>div{
		position:relative;
		height:100%;
		width:100%;
		main{
			padding:.44rem 0 .94rem;
		}
		.header{
			display:-webkit-box;
			padding:0 .15rem;
			box-sizing: border-box;
			-webkit-box-align:center;
			border-bottom:1px solid #eee;
			width:100%;
			height:.44rem;
			position: fixed;
			top:0;
			background:#fff;
			z-index:100;
			i,span{
				display: block;
				color:#333;
			}
		}
		.gou_main{
			ul{
				li{
					display: -webkit-box;
					width:100%;
					padding:.15rem .15rem;
					box-sizing: border-box;
					margin-bottom:.15rem;
					border-bottom:1px solid #eee;
					-webkit-box-align:center;
					aside{
						position: relative;
						display: -webkit-box;
						-webkit-box-align:center;
					}
					dl{
						-webkit-box-flex:1;
						display: -webkit-box;
						box-sizing: border-box;
						dt{
							width:.7rem;
							height:.7rem;
							border:1px solid #eee;
							margin-right:.15rem;
							background:center center no-repeat;
							background-size:cover;
						 
						}
						dd{
							-webkit-box-flex:1;
							display: -webkit-box;
							-webkit-box-orient:vertical;
							-webkit-box-pack:justify;
							height:.7rem;
							p{
								display: -webkit-box;
								-webkit-box-pack:justify;
								width:100%;
								span{
									display: block;
									&:first-child{
									flex:1;
									};
									&:last-child{
										width:20%;
										text-align:right;
									color:#999;
									};
								}
							}
						}
					}
				}
			}
		}

		.footer{
			position: fixed;
			bottom:.5rem;
			width:100%;
			background:#fff;
			display: -webkit-box;
			-webkit-box-pack:justify;
			border-top:1px solid #eee;
			border-bottom:1px solid #eee;
			height:.44rem;
			aside{
				display: -webkit-box;
				-webkit-box-align:center;

				i,span{
					display: block;
				}

				&:first-child{
					padding:0 .15rem;
					box-sizing: border-box;
					position:relative;
				};

				&:last-child{
					height:100%;
					aside{
						height:100%;
						display: -webkit-box;
						-webkit-box-orient:vertical;
						button,span{
							display: block;
						}
						button{
							border:none;
							width:.65rem;
							height:100%;
							color:#fff;
							background:#991f33;
						}
						&:first-child{
							padding:.04rem;
							span{
								line-height: .2rem;
								&:first-child{
									color:#991f33;
									font-size:.14rem;
								};

								&:last-child{
									color:#999;
								};
							}
						};
					}
					
				};
			}
		}
	}
}
</style>