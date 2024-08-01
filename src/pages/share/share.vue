<template>
    <view class="page">
        <CustomNavbar
            title="交流分享"
            :bgSrc="bgImg"
            />
        <scroll-view scroll-y>
            <view class="content">
                <view class="content-separation"/>
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <ShareItem />
                <view class="content-separation footer"/>
            </view>
        </scroll-view> 
    </view>
    <TabBar :selected="3" />
</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
import CustomNavbar from '../../components/CustomNavbar.vue'
import bgImg from '../../static/image/share-bg.png'
import ShareItem from './components/ShareItem.vue'
import { getCurrentInstance } from 'vue'

onShow(() => {
    const curPages = getCurrentPages()[0];  // 获取当前页面实例
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
        curPages.getTabBar().setData({
            selected: 3   // 表示当前菜单的索引，该值在不同的页面表示不同
        });
    }
})
</script>

<style lang="scss">
.content {
    overflow: hidden;
    margin-top: 400rpx;
    background-color: #F6F8FA;
    border-radius: 60rpx;
    .content-separation{
        height: 70rpx;
        background-color: #fff;
        margin-top: -20rpx;
    }
    .footer{
        height: 120rpx;
    }
}

</style>