<script setup>

</script>

<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style scoped>
#app {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: no-repeat url("@/assets/background.png") rgba(22, 24, 35);
	font-family: "HarmonyOS", sans-serif;
}
</style>
