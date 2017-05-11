<template>
	<footer class="footerbar">
		<router-link to="/" active-class="on" class="home" exact>
			<i></i>
			<span>首页</span>
		</router-link>
		<router-link to="/classify" active-class="on" class="fenlei">
			<i></i>
			<span>分类</span>
		</router-link>
		<router-link to="/shop" active-class="on" class="shop">
			<i></i>
			<span>购物车</span>
			<span class="tip" v-show='len'>{{len}}</span>
		</router-link>
		<router-link to="/my" active-class="on" class="my">
			<i></i>
			<span>我的</span>
		</router-link>
	</footer>
</template>
<script>
	export default {
		data () {
			return {
				len:0
			}
		},
		created () {
			this.len=this.$store.state.shopCar.shopCar.length;
		},
		watch:{
			'$store.state.shopCar' () {
				this.len=this.$store.state.shopCar.length;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.footerbar{
		width:100%;
		height:.5rem;
		display:flex;
		position:fixed;
		bottom:0;
		z-index:100;
		background:#fff;
		a{
			flex:1;
			display:flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
			font-size:.12rem;
			i{
				width:.25rem;
				height:.25rem;
				background-size:100% 100%;
				background-repeat:no-repeat;
				background-position:center center;
			}
			span{
				color:#999;
			}
		}
		.home{
			i{
				background-image:url("../../public/img/home1.png");
			}
			&.on{
				i{
					background-image:url("../../public/img/home2.png");
				}
				span{
					color:#801a2a;
				}
			}
		}
		.fenlei{
			i{
				background-image:url("../../public/img/fenlei1.png");
			}
			&.on{
				i{
					background-image:url("../../public/img/fenlei2.png");
				}
				span{
					color:#801a2a;
				}
			}
		}
		.shop{
			position:relative;
			.tip{
				position:absolute;
				min-width:.15rem;
				height:.15rem;
				line-height:.15rem;
				text-align: center;
				background: #801a2a;
				color:#fff!important;
				top:.05rem;
				right:.25rem;
				border-radius:.15rem;
			}
			i{
				background-image:url("../../public/img/shop1.png");
			}
			&.on{
				i{
					background-image:url("../../public/img/shop2.png");
				}
				span{
					color:#801a2a;
				}
			}
		}
		.my{
			i{
				background-image:url("../../public/img/my1.png");
			}
			&.on{
				i{
					background-image:url("../../public/img/my2.png");
				}
				span{
					color:#801a2a;
				}
			}
		}
	}
</style>