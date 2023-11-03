<script setup>
import Header from '@/components/Header.vue'
</script>

<template>
	<div class="root">
		<div class="navigation">
			<div class="navigation-content"/>
		</div>
		<div class="header">
			<Header></Header>
		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
.root {
	width: 100vw;
	height: 100vh;
	background: no-repeat url("@/assets/background.png") rgba(22, 24, 35);
	position: fixed;
	font-family: "HarmonyOS", sans-serif;
}

.header {
	position: fixed;
	right: 0;
	height: 65px;
	width: calc(100% - 160px);
	background-color: rgba(22, 24, 35, .1);
	border-bottom: 1px solid rgba(99, 99, 101, 0.3);
	box-shadow: 0 2px 5px #00000014;
	z-index: 999;
}

.navigation {
	position: fixed;
	width: 160px;
	height: 100%;
	background-color: rgba(22, 24, 35, .1);
	border-right: 1px solid rgba(99, 99, 101, 0.3);
	z-index: 999;
}

.content {
	position: absolute;
	top: 65px;
	left: 160px;
	width: calc(100% - 170px);
	height: calc(100% - 71px);
	margin: 3px 5px;
	padding: 20px 15px;
	overflow: hidden;
	transition: all .15s linear;
}
</style>