<script setup>
import {ref} from 'vue'

const VideoID = '7b8f101d46c95dc93793cf1116cd6d296542ab78';
const VideoURL = ref('https://cdnv.ai-shijia.cn/videos/' + VideoID + '.mp4')
const CoverURL = ref('https://cdnv.ai-shijia.cn/covers/' + VideoID + '.png')

</script>

<template>
	<div class="player-container" :style="{ background: 'url(' + CoverURL + ')'}">
		<div class="background-box"></div>
		<video class="player" v-if="VideoURL" :src="VideoURL" muted autoplay controls loop></video>
		<div class="flip"></div>
	</div>
</template>

<style scoped>
.player-container {
	width: calc(100% - 35px);
	height: 100%;
	border-radius: 15px;
	background-size: cover;
	background-repeat: no-repeat;
	background-color: rgba(48, 48, 61, 0.5);
	position: relative;
}

.background-box {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	backdrop-filter: blur(20px);
}

.player {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 15px;
}
</style>