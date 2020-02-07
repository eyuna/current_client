<template>
    <div class="container" id="container">
		<div class="form-container log-in-container">
			<form action="#">
				<h1>Login</h1>
				<div class="social-container">
					<a href="#" class="social"><i class="fa fa-facebook fa-2x"></i></a>
					<a href="#" class="social"><i class="fab fa fa-twitter fa-2x"></i></a>
				</div>
				<span>or use your account</span>
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Password" />
				<a href="#">회원이 아니신가요?</a>
				<button>Log In</button>
			</form>
		</div>
		<div class="overlay-container">
			<div class="overlay">
				<div class="overlay-panel overlay-right">
					<h1>광명 지역화폐 검색</h1>
					<p>서비스 지역: 철산3동</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: 'LoginPage',
    data () {
        return {
        }
    }
}
</script>

<style scoped>
@import '/css/LoginStyle.css';
</style>