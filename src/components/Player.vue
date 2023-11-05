<script setup>
import {defineProps, onMounted, ref} from 'vue'
import {Hls} from 'xgplayer-hls'
import {ElMessage} from "element-plus";

const props = defineProps({
	token: {
		type: String,
		default: ''
	},
	isPageFull: {
		type: Boolean,
		default: false
	}
})

const item = ref({
	HlsURL: `https://cdnv.ai-shijia.cn/m3u8s/${props.token}.m3u8`,
	ImgURL: `https://cdnv.ai-shijia.cn/covers/${props.token}.png`,
	WorkURL: window.location.href + props.token,
	AvatarURL: 'https://cdnv.ai-shijia.cn/avatars/e7df68fb60cf2efd8133b442d8701605.png',
	IsLike: false,
	NumLikes: 3940,
	IsShare: false,
	NumShare: 85,
	IsCollect: false,
	NumCollect: 315,
	IsFollow: false
})
const rates = ref([0.5, 1.0, 1.5, 2.0, 2.5, 3.0])
const NowRate = ref(1.0)
const muted = ref(true)
const volume = ref(0)
const timeline = ref(0)

onMounted(() => {
	const video = document.getElementById("video-player");
	if (Hls.isSupported("video")) {
		const player = new Hls({
			media: video,
			retryCount: 3,
			retryDelay: 1000,
			loadTimeout: 15000,
		})
		player.load(item.value.HlsURL)
	}
	muted.value = video.muted
	// 实时更新进度条
	video.addEventListener('timeupdate', () => {
		timeline.value = (video.currentTime / video.duration) * 100;
	});
})

const onRate = () => {
	const video = document.getElementById("video-player");
	const currentIndex = rates.value.indexOf(NowRate.value)
	NowRate.value = rates.value[(currentIndex + 1) % rates.value.length]
	video.playbackRate = NowRate.value
}

const onMuted = () => {
	const video = document.getElementById("video-player");
	if (muted.value) {
		video.muted = false
		muted.value = false
		volume.value = 50
	} else {
		video.muted = true
		muted.value = true
		volume.value = 0
	}
	video.volume = volume.value / 100
}

const onVolume = () => {
	// 实时更新音量
	const video = document.getElementById("video-player");
	video.volume = volume.value / 100
	if (volume.value === 0) {
		video.muted = true
		muted.value = true
	} else {
		video.muted = false
		muted.value = false
	}
}

const onFollow = () => {
	if (item.value.IsFollow) {
		ElMessage({
			message: '已经关注该作者，无需重复关注',
			type: 'error',
		})
	} else {
		item.value.IsFollow = true
		ElMessage({
			message: '关注成功',
			type: 'success'
		})
	}
}

const onLike = () => {
	if (!item.value.IsLike) {
		item.value.IsLike = true
		item.value.NumLikes += 1
	} else {
		item.value.IsLike = false
		item.value.NumLikes -= 1
	}
}

const onCollect = () => {
	if (item.value.IsCollect) {
		item.value.IsCollect = false
		ElMessage({
			message: '取消收藏',
			type: 'warning',
		})
		item.value.NumCollect -= 1
	} else {
		item.value.IsCollect = true
		ElMessage({
			message: '收藏成功',
			type: 'success'
		})
		item.value.NumCollect += 1
	}
}

const onCopy = () => {
	const ClipBoardObj = navigator.clipboard;
	ClipBoardObj.writeText(item.value.WorkURL).then(() => {
		ElMessage({
			message: '视频链接已添加到剪贴板',
			type: 'success'
		})
	})
	// 若不支持则提示错误
	ClipBoardObj.writeText(item.value.WorkURL).catch(() => {
		ElMessage({
			message: '视频链接复制失败',
			type: 'error'
		})
	})
}

const onTime = () => {
	const video = document.getElementById("video-player");
	video.currentTime = timeline.value / 100 * video.duration
	// 如果视频播放完毕则重播
	if (video.currentTime === video.duration) {
		video.currentTime = 0
	}
	// 如果视频暂停则播放
	if (video.paused) {
		video.play()
	}
}

</script>

<template>
	<div class="player-container" :style="`background-image: url(${item.ImgURL})`">
		<div class="background-box"></div>
		<!-- 视频播放器 -->
		<video class="player" id="video-player" ref="video" :poster="item.ImgURL" controls muted autoplay loop
		       oncontextmenu="return false" controlslist="noplaybackrate nodownload"></video>
		<!-- 侧边栏 -->
		<div class="side-box">
			<!-- 视频倍速 -->
			<div class="muted" style="display: block" @click="onRate">
				<div class="rate">{{ NowRate.toFixed(1) }}x</div>
			</div>
			<!-- 音量控制 -->
			<el-slider class="el-slider" v-model="volume" vertical height="80px" placement="left" @input="onVolume"/>
			<!-- 是否静音 -->
			<div class="muted" @click="onMuted">
				<svg class="icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" v-if="muted">
					<path d="M7 14a2 2 0 012-2h1l4.36-3.633a1 1 0 011.64.768v13.73a1 1 0 01-1.64.768L10 20H9a2 2 0 01-2-2v-4z"
					      fill="currentColor"></path>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M21.002 17.55l2.499 2.954 1.502-1.316-2.693-3.185
					2.694-3.185-1.503-1.316-2.499 2.955-2.5-2.955L17 12.818l2.694 3.185-2.693 3.185 1.502 1.316 2.499-2.955z"
					      fill="currentColor"></path>
				</svg>
				<svg class="icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" v-else>
					<path d="M7 14a2 2 0 012-2h1l4.36-3.633a1 1 0 011.64.768v13.73a1 1 0 01-1.64.768L10 20H9a2 2 0 01-2-2v-4zM18
									19a3 3 0 100-6v6z" fill="currentColor"></path>
					<path d="M18 23.734a7.75 7.75 0 000-15.468v2.507a5.25 5.25 0 010 10.453v2.508z"
					      fill="currentColor"></path>
				</svg>
			</div>
			<!-- 作者头像 -->
			<div class="author">
				<img class="avatar" :src="item.AvatarURL" alt="作者"/>
				<!-- 关注作者 -->
				<div class="follow" v-if="!item.IsFollow" @click="onFollow">
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
			<!-- 点赞 -->
			<div class="likes side-item" @click="onLike">
				<el-tooltip class="box-item" effect="light" placement="left" content="点赞">
					<svg class="icon" viewBox="64 64 896 896" width="28" height="28"
					     :style="{color:(item.IsLike ? 'rgb(254, 44, 85)' : '#fff')}">
						<path d="M834.1 469.2A347.49 347.49 0 00751.2 354l-29.1-26.7a8.09 8.09 0 00-13 3.3l-13 37.3c-8.1
						23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3
						171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64
						295.64 0 01-47.5 46.1 352.6 352.6 0 00-100.3 121.5A347.75 347.75 0 00160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0075.5
						110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 00760.8 857c32.4-32 57.8-69.4
						75.5-110.9a344.2 344.2 0 0027.7-136c0-48.8-10-96.2-29.9-140.9z" fill="currentColor">
						</path>
					</svg>
				</el-tooltip>
				<span class="number">{{ item.NumLikes }}</span>
			</div>
			<!-- 收藏 -->
			<div class="collect side-item" @click="onCollect">
				<el-tooltip class="box-item" effect="light" placement="left" content="收藏">
					<svg class="icon" viewBox="64 64 896 896" width="28" height="28"
					     :style="{color:(item.IsCollect ? 'rgb(255, 184, 2)' : '#fff')}">
						<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8
						316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4
						33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9
						8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" fill="currentColor">
						</path>
					</svg>
				</el-tooltip>
				<span class="number">{{ item.NumCollect }}</span>
			</div>
			<!-- 复制链接 -->
			<div class="copy side-item" @click="onCopy">
				<el-tooltip class="box-item" effect="light" placement="left" content="复制链接">
					<svg class="icon" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.6058 10.3326V5.44359C12.6058 4.64632 13.2718 4 14.0934 4C14.4423 4 14.78 4.11895 15.0476
						 4.33606L25.3847 12.7221C26.112 13.3121 26.2087 14.3626 25.6007 15.0684C25.5352 15.1443 25.463 15.2144
						 25.3847 15.2779L15.0476 23.6639C14.4173 24.1753 13.4791 24.094 12.9521 23.4823C12.7283 23.2226 12.6058
						 22.8949 12.6058 22.5564V18.053C7.59502 18.053 5.37116 19.9116 2.57197 23.5251C2.47607 23.6489 2.00031
						 23.7769 2.00031 23.2122C2.00031 16.2165 3.90102 10.3326 12.6058 10.3326Z" fill="currentColor">
						</path>
					</svg>
				</el-tooltip>
				<span class="number">{{ item.NumShare }}</span>
			</div>
			<!-- 页面全屏播放 -->
			<router-link :to="{name:'Work',params:{id: token}}" v-if="!isPageFull">
				<div class="full side-item">
					<el-tooltip class="box-item" effect="light" placement="left-start" content="页面全屏">
						<svg class="icon" width="32" height="32" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 8.5a2 2 0 00-2 2v11a2 2 0 002 2h12.5a2 2 0 002-2v-11a2 2 0
						00-2-2H9.75zM15 11.25h-3.75a1 1 0 00-1 1V16h2v-2.75H15v-2zm5.75 9.5H17v-2h2.75V16h2v3.75a1 1 0 01-1 1z"
							      fill="currentColor"></path>
						</svg>
					</el-tooltip>
				</div>
			</router-link>
		</div>
		<!-- 作品信息区 -->
		<div class="bottom-box">

		</div>
		<!-- 视频进度条 -->
		<el-slider class="timeline" v-model="timeline" :show-tooltip="false" @input="onTime"/>
	</div>
</template>

<!--suppress CssInvalidPseudoSelector -->
<style scoped>
.player-container {
	width: 100%;
	height: 100%;
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
	backdrop-filter: blur(65px);
}

.player {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 999;
}

.side-box {
	position: absolute;
	right: 50px;
	bottom: 125px;
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

.timeline {
	position: absolute !important;
	bottom: 0 !important;
	left: 1% !important;
	--el-slider-main-bg-color: rgba(252, 32, 65, 0.85) !important;
	--el-slider-runway-bg-color: rgba(255, 255, 255, 0.65) !important;
	--el-slider-border-radius: 18px !important;
	--el-slider-height: 5px !important;
	transform: translateY(8px) !important;
	width: 98% !important;
	z-index: 999;
}

/* 隐藏进度条 */
video::-webkit-media-controls-timeline {
	display: none;
}

/* 隐藏音量按钮 */
video::-webkit-media-controls-mute-button {
	display: none;
}

video::-webkit-media-controls-toggle-closed-captions-button {
	display: none;
}

/* 隐藏音量控制条 */
video::-webkit-media-controls-volume-slider {
	display: none;
}

.muted {
	width: 38px;
	height: 38px;
	background-color: rgba(51, 52, 63, 1);
	border-radius: 50%;
	margin-bottom: 20px;

	:hover {
		cursor: pointer;
	}
}

.el-slider {
	--el-slider-main-bg-color: rgba(255, 252, 252, 0.6);
	--el-slider-runway-bg-color: rgba(51, 52, 63, 1);
	--el-slider-border-radius: 3px;
	--el-slider-height: 6px;
	--el-slider-button-size: 14px;
	transform: translateY(-15px);
	transition: transform .35s cubic-bezier(.34, .69, .1, 1);
}

.author {
	position: relative;
	margin-bottom: 20px;
}

.avatar {
	width: 48px;
	height: 48px;
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
	bottom: -8px;
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

.rate {
	color: #fff;
	font-size: 13px;
	font-weight: bold;
	line-height: 38px;
	letter-spacing: 0.05rem;
	text-align: center;
	vertical-align: middle;
	user-select: none;
	cursor: pointer;
}

.rate:hover {
	animation: shake 1.5s 2;
}

.icon {
	color: #fff;
	font-size: 28px;
	width: 100%;
	margin-bottom: 5px;
}

.icon:hover {
	animation: shake 1s 2;
}

@keyframes shake {
	10% {
		transform: rotate(20deg);
	}
	20% {
		transform: rotate(-12deg);
	}
	30% {
		transform: rotate(10deg);
	}
	40% {
		transform: rotate(-10deg);
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
	user-select: none;
	cursor: pointer;
}

</style>