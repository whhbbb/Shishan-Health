<template>
    <view class="main">
        <view class="top">
            <image src="../../static/image/reward.jpg" mode="widthFix" />
            <view class="chosebox">

            </view>
        </view>
        <view class="middle">
            <view class="head">
                <view class="first item">
                    <image src="../../static/image/top.png" mode="widthFix" />
                    <view>
                        <image
                            class="avatar"
                            src="../../static/image/tabbar.jpg"
                            mode="scaleToFill"
                        />
                    </view>
                    <view class="content">
                        <view>打卡天数： 0</view>
                        <view>打卡天数： 0</view>
                    </view>
                </view>
            </view>
            <view class="sub-head">
                <view class="second item">
                    <image src="../../static/image/second.png" mode="widthFix" />
                    <view>
                        <image
                            class="avatar"
                            src="../../static/image/tabbar.jpg"
                            mode="scaleToFill"
                        />
                    </view>
                    <view class="content">
                        <view>打卡天数： 0</view>
                        <view>打卡天数： 0</view>
                    </view>
                </view>
                <view class="third item">
                    <image src="../../static/image/third.png" mode="widthFix" />
                    <view>
                        <image
                            class="avatar"
                            src="../../static/image/tabbar.jpg"
                            mode="scaleToFill"
                        />
                    </view>
                    <view class="content">
                        <view>打卡天数： 0</view>
                        <view>打卡天数： 0</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="bottom">
            <view class="items" v-for="item in users">
                <view class="index">{{ item.id }}</view>
                <view>
                    <image
                        class="item-avatar"
                        :src="item.avatar"
                        mode="scaleToFill"
                    />
                </view>
                <view class="item-username">{{ item.username }}</view>
                <view class="item-content">{{ item.content }}</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const users = ref([
    {
        id: 4,
        avatar: '../../static/image/tabbar.jpg',
        username: '赵六',
        content: '打卡天数： 0'
    },
    {
        id: 5,
        avatar: '../../static/image/tabbar.jpg',
        username: '孙七',
        content: '打卡天数： 0'
    },
    {
        id: 6,
        avatar: '../../static/image/tabbar.jpg',
        username: '周八',
        content: '打卡天数： 0'
    },
    {
        id: 7,
        avatar: '../../static/image/tabbar.jpg',
        username: '吴九',
        content: '打卡天数： 0'
    },
    {
        id: 8,
        avatar: '../../static/image/tabbar.jpg',
        username: '郑十',
        content: '打卡天数： 0'
    },

])
</script>

<style lang="scss">
.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .top {
        width: 90%;
        position: relative;
        display: flex;
        justify-content: center;

        .chosebox {
            position: absolute;
            width: 35%;
            height: 50rpx;
            background-color: #a42929;
            top: 10rpx;
            left: 0;
        }
    }

    .middle {
        width: 90%;

        .head{
            display: flex;
            justify-content: center;
        }
        .sub-head{
            display: flex;
            justify-content: space-between;
        }
        .item {
            position: relative;
            width: 300rpx;
            .avatar{
                position: absolute;
                top:25rpx;
                left: 95rpx;
                width: 110rpx;
                height: 110rpx;
                border-radius: 50%;
            }
            .content{
                position: absolute;
                top: 150rpx;
                left: 60rpx;
            }
        }
        .first{
            .avatar{
                left: 100rpx;
            }
        }
    }
    
    .bottom{
        width: 80%;
        margin-bottom: 30rpx;
        .items{
            padding: 20rpx;
            width: 100%;
            height: 100rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .index{
                width: 10%;
                font-weight: bold;
            }
            .item-avatar{
                width: 60rpx;
                height: 60rpx;
                border-radius: 50%;
                margin-right: 30rpx;
            }
            .item-username{
                flex: 1;
            }
        }
    }
}
</style>