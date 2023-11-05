<script setup>
import Player from "@/components/Player.vue";
import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";

const token = ref(`${useRoute().params.id}`);
const isPageFull = ref(false);

onMounted(() => {
	if (useRoute().params.id) {
		token.value = useRoute().params.id
		isPageFull.value = true
	}
})

const onQuit = () => {
	if (window.history.length <= 1) {
		window.location.href = window.location.host
	} else {
		window.history.back()
	}
}

</script>

<template>
	<div class="video-container">
		<div class="close-button" @click="onQuit">
			<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M16 4l-8 8.14L16 20" stroke="#fff" stroke-width="4"
				      stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges">
				</path>
			</svg>
		</div>
		<Player v-if="token" :token="token" :isPageFull="isPageFull" class="player"/>
	</div>
</template>

<style scoped>
.video-container {
	position: absolute;
	width: 100%;
	height: 100%;
}

.close-button {
	position: fixed;
	top: 35px;
	left: 35px;
	width: 65px;
	height: 65px;
	display: flex;
	border-radius: 50%;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, .18);
	border: 1px solid hsla(0, 0%, 100%, 0.3);
	filter: drop-shadow(0 0 5px rgba(0, 0, 0, .5));
	z-index: 1000;
	opacity: 0.7;
}

.close-button:hover {
	cursor: pointer;
	opacity: 1;
}

.player {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>