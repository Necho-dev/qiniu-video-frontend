<script setup>
import Player from "@/components/Player.vue";
import {onMounted, ref} from "vue";

const token = ref("2919b4892d9dfe112fada690ba97221b");
const ItemList = [
	"2919b4892d9dfe112fada690ba97221b",
	"a2b9e04a9b0c42858ae159d243cd5d22",
	"e7df68fb60cf2efd8133b442d8701605"
]
onMounted(() => {
	console.log(ItemList)
	// // 初始化随机
	// const currentIndex = ref(Math.floor(Math.random() * ItemList.length))
	// token.value = ItemList[currentIndex.value]
	// console.log(currentIndex.value)
	// // 切换视频
	// const switchPrev = document.querySelector(".switch-prev")
	// const switchNext = document.querySelector(".switch-next")
	// switchPrev.addEventListener("click", () => {
	// 	currentIndex.value = (currentIndex.value - 1 + ItemList.length) % ItemList.length
	// 	token.value = ItemList[currentIndex.value]
	// 	console.log(token.value)
	// })
	// switchNext.addEventListener("click", () => {
	// 	currentIndex.value = (currentIndex.value + 1) % ItemList.length
	// 	token.value = ItemList[currentIndex.value]
	// 	console.log(token.value)
	// })
})

const GetImage = (token) => {
	return `https://cdnv.ai-shijia.cn/covers/${token}.png`
}
</script>

<template>
	<div class="container">
		<Player v-if="token" :token="token" class="player"/>
		<div class="flip">
			<div class="switch-prev">
				<svg width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 26 26">
					<path d="M7.269 16.316a1.393 1.393 0 010-1.97l5.056-5.055a1.393 1.393 0 011.97 0l.011.011 5.045
				5.045a1.393 1.393 0 11-1.97 1.97l-4.071-4.072-4.071 4.071a1.393 1.393 0 01-1.97 0z" fill="#fff">
					</path>
				</svg>
			</div>
			<div class="switch-next">
				<svg width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 26 26">
					<path d="M7.269 9.29a1.393 1.393 0 000 1.97l5.056 5.056a1.393 1.393 0 001.97 0l.011-.011 5.045
					-5.045a1.393 1.393 0 10-1.97-1.97l-4.071 4.072L9.239 9.29a1.393 1.393 0 00-1.97 0z" fill="#fff">
					</path>
				</svg>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	position: absolute;
	width: 100%;
	height: 100%;
}

.player {
	position: absolute;
	height: 95%;
	width: calc(100% - 80px);
	border-radius: 18px;
	filter: drop-shadow(0 0 8px rgba(0, 0, 0, .3));
}

.flip {
	top: 50%;
	right: 32px;
	width: 36px;
	height: 88px;
	position: absolute;
	border-radius: 22px;
	transform: translateY(-50%);
	background: rgba(51, 52, 63, 1);
	box-shadow: 0 2px 5px #00000014;
}

.switch-prev {
	height: 44px;
	width: 100%;
	opacity: 0.5;
}

.switch-prev svg {
	top: 8px;
	position: relative;
	display: block;
	margin: 0 auto;
}

.switch-next {
	height: 44px;
	width: 100%;
	opacity: 0.5;
}

.switch-prev:hover {
	cursor: pointer;
	opacity: 1;
}

.switch-next svg {
	top: calc(100% - 26px - 8px);
	position: relative;
	display: block;
	margin: 0 auto;
}

.switch-next:hover {
	cursor: pointer;
	opacity: 1;
}

</style>