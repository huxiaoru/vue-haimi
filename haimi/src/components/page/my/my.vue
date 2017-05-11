<template>
	<div class="wrap">
		<div class="title">
			请输入手机号验证码直接登录
		</div>
		<form class="form" id="Myform">
			<p>
				<label for="">手机号：</label>
				<input type="text" name="phone" id="phone" required="*手机号不能为空" >
			</p>
			<p>
				<label for="">验证码：</label>
				<input type="text" id="code">
				<span>发送验证码</span>
			</p>
			<button type="submit">登录</button>
		</form>
		<footer-bar></footer-bar>
	</div>
</template>
<script>
	import footerBar from "@/components/base/footer"
	export default {
		components:{
			footerBar
		}
	}
</script>
<style lang='scss' scoped>
	.title{
		width: 100%;
		padding: 0.07rem 0;
		text-align: center;
		background: #fff9f3;
		color:#991f33;
		font-size: 0.14rem;
		margin-bottom: 0.12rem;
	}
	.form{
		font-size: 0.14rem;
		width: 100%;

		padding: 0.07rem 0.1rem;
			box-sizing: border-box;
		p{
			width: 100%;
			display: -webkit-box;
			-webkit-box-align:center;
			-webkit-box-pack:center;
			border-bottom: 1px solid #ccc;
			margin-bottom: 0.2rem;
			padding: 0.07rem 0;
			box-sizing: border-box;
			label{
				color:#666;
			}
			input{
				display: block;
				-webkit-box-flex:1;
				border:0px;
				outline: none;
			}
			span{
				color: #991f33;
				font-size: 0.12rem;
			}
		}
		button{
			width: 100%;
			margin-top:0.2rem;
			padding: 0.1rem 0;
			background: #991f33;
			color:#fff;
			font-weight: bolder;
			border:0px;
			font-size: 0.16rem;
		}
	}
</style>
</style>