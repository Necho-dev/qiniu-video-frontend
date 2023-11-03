<script setup>
import {defineProps, onMounted, ref} from 'vue'
import {Hls} from 'xgplayer-hls'

const props = defineProps({
	token: {
		type: String,
		default: ''
	}
})

const item = ref({
	HlsURL: `https://cdnv.ai-shijia.cn/m3u8s/${props.token}.m3u8`,
	ImgURL: `https://cdnv.ai-shijia.cn/covers/${props.token}.png`,
	AvatarURL: 'https://cdnv.ai-shijia.cn/avatars/e7df68fb60cf2efd8133b442d8701605.png',
	like: 9460,
	share: 85,
	collect: 315,
	follow: false
})

onMounted(() => {
	if (Hls.isSupported("video")) {
		const video = document.getElementById("video-player")
		const player = new Hls({
			media: video,
			retryCount: 3,
			retryDelay: 1000,
			loadTimeout: 15000,
		})
		player.load(item.value.HlsURL)
	}
})

</script>

<template>
	<div class="player-container" :style="{ backgroundImage: 'url(' + item.ImgURL + ')' }">
		<div class="background-box"></div>
		<!-- 视频播放器 -->
		<video class="player" id="video-player" :poster="item.ImgURL" controls muted autoplay loop></video>
		<!-- 侧边栏 -->
		<div class="side-box">
			<div class="author">
				<img class="avatar" :src="item.AvatarURL" alt="作者"/>
				<div class="follow" v-if="!item.follow">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
						<g transform="matrix(1,0,0,1,45,45)" opacity="1">
							<g opacity="1" transform="matrix(1,0,0,1,0,0)">
								<path fill="rgb(254,44,85)" fill-opacity="1" d=" M0,-36 C19.881999969482422,-36 36,-19.881999969482422
								36,0 C36,19.881999969482422 19.881999969482422,36 0,36 C-19.881999969482422,36 -36,19.881999969482422
								-36,0 C-36,-19.881999969482422 -19.881999969482422,-36 0,-36z">
								</path>
							</g>
						</g>
						<g transform="matrix(1,0,0,1,45,45)" opacity="1">
							<g opacity="1" transform="matrix(1,0,0,1,0,0)">
								<path stroke-linecap="round" stroke-linejoin="round" fill-opacity="1"
								      stroke="rgb(255,255,255)" stroke-width="6" d=" M-13.5,0 C-13.5,0 13.562000274658203,0
								      13.562000274658203,0 C13.562000274658203,0 -13.5,0 -13.5,0z">
								</path>
							</g>
							<g opacity="1" transform="matrix(0,1,-1,0,0,0)">
								<path stroke-linecap="round" stroke-linejoin="round" fill-opacity="1"
								      stroke="rgb(255,255,255)" stroke-width="6" d=" M-13.5,0 C-13.5,0 13.562000274658203,0
								      13.562000274658203,0 C13.562000274658203,0 -13.5,0 -13.5,0z">
								</path>
							</g>
						</g>
					</svg>
				</div>
			</div>
			<div class="likes side-item">
				<a-tooltip placement="left">
					<template #title>
						<span>点赞</span>
					</template>
					<svg class="icon" viewBox="64 64 896 896" width="28" height="28">
						<path d="M834.1 469.2A347.49 347.49 0 00751.2 354l-29.1-26.7a8.09 8.09 0 00-13 3.3l-13 37.3c-8.1
						23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3
						171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64
						295.64 0 01-47.5 46.1 352.6 352.6 0 00-100.3 121.5A347.75 347.75 0 00160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0075.5
						110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 00760.8 857c32.4-32 57.8-69.4
						75.5-110.9a344.2 344.2 0 0027.7-136c0-48.8-10-96.2-29.9-140.9z" fill="currentColor">
						</path>
					</svg>
				</a-tooltip>
				<span class="number">{{ item.like }}</span>
			</div>
			<div class="collect side-item">
				<a-tooltip placement="left">
					<template #title>
						<span>收藏</span>
					</template>
					<svg class="icon" viewBox="64 64 896 896" width="28" height="28">
						<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8
						316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4
						33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9
						8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" fill="currentColor">
						</path>
					</svg>
				</a-tooltip>
				<span class="number">{{ item.collect }}</span>
			</div>
			<div class="copy side-item">
				<a-tooltip placement="left">
					<template #title>
						<span>复制链接</span>
					</template>
					<svg class="icon" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.6058 10.3326V5.44359C12.6058 4.64632 13.2718 4 14.0934 4C14.4423 4 14.78 4.11895 15.0476
						 4.33606L25.3847 12.7221C26.112 13.3121 26.2087 14.3626 25.6007 15.0684C25.5352 15.1443 25.463 15.2144
						 25.3847 15.2779L15.0476 23.6639C14.4173 24.1753 13.4791 24.094 12.9521 23.4823C12.7283 23.2226 12.6058
						 22.8949 12.6058 22.5564V18.053C7.59502 18.053 5.37116 19.9116 2.57197 23.5251C2.47607 23.6489 2.00031
						 23.7769 2.00031 23.2122C2.00031 16.2165 3.90102 10.3326 12.6058 10.3326Z" fill="currentColor">
						</path>
					</svg>
				</a-tooltip>
				<span class="number">{{ item.share }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.player-container {
	width: 100%;
	height: 100%;
	border-radius: 15px;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	background-position: center center;
	background-color: rgba(48, 48, 62, .5);
	position: relative;
	overflow: hidden;
}

.background-box {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	backdrop-filter: blur(55px);
}

.player {
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 15px;
	z-index: 999;
}

.side-box {
	position: absolute;
	right: 50px;
	bottom: 80px;
	height: 400px;
	width: 50px;
	text-align: center;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
	filter: drop-shadow(0 0 5px rgba(0, 0, 0, .5));
	z-index: 999;
}

.author {
	position: relative;
	margin-bottom: 20px;
}

.avatar {
	width: 45px;
	height: 45px;
	border-radius: 50%;
	position: relative;
	object-fit: cover;
	transition: transform .35s cubic-bezier(.34, .69, .1, 1);
	cursor: pointer;
}

.avatar:hover {
	transform: scale(1.1);
}

.follow {
	position: absolute;
	width: 22px;
	height: 22px;
	left: 50%;
	bottom: -10px;
	transform: translateX(-50%);
	border-radius: 50%;
	cursor: pointer;
}

.side-item {
	margin: 8px auto;
	width: 50px;
	height: 58px;
	cursor: pointer;
}

.icon {
	color: #fff;
	font-size: 28px;
	width: 100%;
	margin-bottom: 5px;
	transition: transform 0.1s ease-in-out;
}

.icon:hover {
	transform: scale(1.2);
	animation: shake 1s infinite;
}

@keyframes shake {
	10% {
		transform: rotate(18deg);
	}
	20% {
		transform: rotate(-10deg);
	}
	30% {
		transform: rotate(8deg);
	}
	40% {
		transform: rotate(-8deg);
	}
	50%,
	100% {
		transform: rotate(0deg);
	}
}

.number {
	color: #fff;
	font-size: 14px;
	font-weight: normal;
	letter-spacing: 1px;
}

</style>