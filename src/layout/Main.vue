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
root {
	width: 100%;
	height: 100%;
	position: absolute;
}

.header {
	position: fixed;
	right: 0;
	height: 65px;
	width: calc(100% - 160px);
	background-color: rgba(22, 24, 35, .1);
	box-shadow: 0 2px 5px #00000014;
}

.navigation {
	position: fixed;
	width: 160px;
	height: 100%;
	background-color: rgba(22, 24, 35, .1);
}

.content {
	position: fixed;
	top: 65px;
	left: 160px;
	right: 0;
	bottom: 0;
	padding: 20px 20px;
	overflow: hidden;
}

</style>