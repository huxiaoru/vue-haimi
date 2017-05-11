<template>
	<div id="app" class="wrap">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<div class="loading-box" v-show="loading">
			<div class="loading-css3">
				<div class="loader">Loading...</div>
				<div>正在加载</div>
			</div>
		</div>
	</div>  
</template>
<script type="text/javascript">
	import rem from "./public/js/rem.js";
	export default {
		computed:{
			loading () {
				return this.$store.state.loding.loadFlag
			}
		}
	}
</script>
 <style lang="scss">
	@import "public/css/reset.css";
	body{
		background: #f7f7f7
	}
	.wrap{
		width:100%;
	}
	.loading-box{
	   position:fixed;
	   z-index:1000;
	   bottom:0;
	   left:0;
	   width:100%;
	   height:100%;
	   background:rgba(0,0,0,.5);
	}
	.loading-css3{
	  position:fixed;
	  top:50%;
	  left:50%;
	  margin-top:-1rem;
	  margin-left:-1.1rem;
	  padding:.3rem;
	  text-align:center;
	  background:rgba(0,0,0,.65);
	  border-radius:.15rem;
	  z-index:1001;
	  min-width:2.1rem;
	  max-width:5rem;
	  div{
	  	color:#fff;
	  }
	}
	.loading-box .loader{
	  animation:loading 1.1s infinite linear;
	  text-indent:-9999em;
	  border-top:.3em solid hsla(0,0%,100%,.2);
	  border-right:.3em solid hsla(0,0%,100%,.2);
	  border-bottom:.3em solid hsla(0,0%,100%,.2);
	  border-left:.3em solid #fff
	}
	.loading-box .loader,.loading-box .loader:after{
	  width:2.5em;
	  height:2.5em;
	  margin:0 auto .125rem;
	  border-radius:50%
	}
	@-webkit-keyframes loading{
	    0%{-webkit-transform:rotate(0deg);
	    transform:rotate(0deg)
	    }to{
	      -webkit-transform:rotate(1turn);
	      transform:rotate(1turn)
	  	}
	}
</style>