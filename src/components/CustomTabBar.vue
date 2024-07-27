<template>
    <view class="tabBar">
        <view class="cont">
            <view v-for="(item, index) in list" class="cont-item">
                <view v-if="item.search" @click="chooseWay"
                    :class="{ 'search': item.search , 'item': !item.search, 'on': selected === index ? true : false, 'off': selected != index ? true : false }">
                    <image v-if="item.search" :src="selected === index ? item.selectedIconPath : item.iconPath">
                    </image>
                    <view :class="{ 'txt': true, 'selectedColor': selected === index ? true : false }">{{ item.text }}
                    </view>
                </view>
                <view v-else @click="switchTab(item.pagePath)"
                    :class="{ 'search': item.search ? true : false, 'item': !item.search, 'on': selected === index ? true : false, 'off': selected != index ? true : false }">
                    <image v-if="item.search" :src="selected === index ? item.selectedIconPath : item.iconPath">
                    </image>
                    <view :class="{ 'txt': true, 'selectedColor': selected === index ? true : false }">{{ item.text }}
                    </view>
                </view>
            </view>
        </view>
        <uni-transition :mode-class="fade" :show="isShow">
            <view class="way-container">
                <view class="sport">
                    <image src="../static/image/bottomBar/sport.png" mode="scaleToFill" />
                </view>
                <view class="food">
                    <image src="../static/image/bottomBar/food.png" mode="scaleToFill" />
                </view>
            </view>
        </uni-transition>
    </view>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { onHide } from "@dcloudio/uni-app";

const emit = defineEmits(['chooseWay']);

const props = defineProps({
    selected: Number
});

// 选择方式是否弹出
const isShow = ref(false);

const color = ref('#fff');
const list = ref([
    {
        text: "首页",
        pagePath: "/pages/index/index",
        // iconPath: "/static/image/bottomBar/index.png",
        // selectedIconPath: "/static/image/bottomBar/index-active.png"
    },
    {
        text: "科普",
        pagePath: "/pages/science/science",
    },
    {
        pagePath: "/pages/ranking/ranking",
        iconPath: "/static/image/bottomBar/check-in.png",
        selectedIconPath: "/static/image/bottomBar/check-in.png",
        search: true
    },
    {
        text: "分享",
        pagePath: "/pages/share/share",
    },
    {
        text: "我的",
        pagePath: "/pages/my/my",
        // iconPath: "/static/image/bottomBar/my.png",
        // selectedIconPath: "/static/image/bottomBar/my-active.png"
    }
]);

const switchTab = (url) => {
    uni.switchTab({
        url
    });
    console.log(props.selected)
};

const chooseWay = () => {
    isShow.value = !isShow.value;
    emit('chooseWay');
};

onHide(() => {
    isShow.value = false;
});
</script>

<style lang="scss">
.tabBar {
    z-index: 100;
    width: 100%;
    position: fixed;
    bottom: 0;
    font-size: 28rpx;
    background-color: #fff;
    color: #636363;
    border-radius: 50rpx 50rpx 0px 0px;
    box-shadow: 0px -2rpx 10rpx 0px rgba(0, 0, 0, 0.05);
    text-align: center;
}

.cont {
    z-index: 0;
    height: calc(100rpx + env(safe-area-inset-bottom) / 2);
    padding-bottom: 70rpx;
    display: flex;
    justify-content: space-around;

    .item {
        font-size: 28rpx;
        text-align: center;
        line-height: 1;
        padding-top: 10rpx;
    }

    // .item:last-child {
    //     left: 45rpx;
    // }

    // .item image:first-child {
    //     width: 43rpx !important;
    //     height: 43rpx !important;
    //     margin: auto
    // }

    // .item image:last-child {
    //     width: 41rpx !important;
    //     height: 43rpx !important;
    //     margin: auto
    // }

    .txt {
        margin-top: 20rpx;
    }

    .on {
        position: relative;
    }

    // .on:not(:nth-child(2)):before {
    //     content: "";
    //     display: block;
    //     position: absolute;
    //     top: 0;
    //     width: 100%;
    //     height: 6rpx;
    //     background-color: #00BCD4;
    //     border-radius: 120rpx !important;
    // }

    .search {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        top: -80rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .search image {
        width: 150rpx !important;
        height: 150rpx !important;
        z-index: 2;
        border-radius: 100%;
    }

    .search .txt {
        margin-top: 26rpx;
    }

    .selectedColor {
        color: #55B89A;
    }
}

.way-container {
    image {
        width: 100rpx;
        height: 100rpx;
    }

    display: flex;
    width: 100%;
    justify-content: center;
    position: absolute;
    bottom: 160rpx;

    .sport {
        margin-right: 150rpx;
    }
}
</style>
