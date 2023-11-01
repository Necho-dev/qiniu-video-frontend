<template>
	<div class="root">
		<div class="navigation">
			<div class="navigation-content"/>
		</div>
		<div class="header">
			<div class="header-content"/>
		</div>
		<div class="content">
			<div class="main-content"/>
		</div>
	</div>
</template>
<script>

</script>
<style scoped>
.root {
	width: 100vw;
	height: 100vh;
	background: no-repeat url("@/assets/background.png") rgba(22, 24, 35);
	position: fixed;
}

.header {
	position: fixed;
	right: 0;
	height: 65px;
	width: calc(100% - 160px);
	background-color: rgba(22, 24, 35, .3);
	border-bottom: 1px solid rgba(99, 99, 101, 0.3);
	box-shadow: 0 2px 5px #00000014;
	z-index: 999;
}

.navigation {
	position: fixed;
	width: 160px;
	height: 100%;
	background-color: rgba(22, 24, 35, .3);
	border-right: 1px solid rgba(99, 99, 101, 0.3);
	z-index: 999;
}

.content {
	position: absolute;
	top: 65px;
	left: 160px;
	width: calc(100% - 170px);
	height: calc(100% - 71px);
	border-radius: 15px;
	margin: 3px 5px;
	padding: 20px 25px;
	overflow: hidden;
	transition: all .15s linear;
}
</style>