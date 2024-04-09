<template>
  <view class="container" v-if="isPastTargetDate">
    <scroll-view
      scroll-x="true"
      class="nav"
      :scroll-left="navScrollLeft"
      scroll-with-animation="true"
    >
      <view
        v-for="(navItem, id) in navData"
        :key="id"
        class="nav-item"
        :class="{ active: currentTab === id }"
        @click="switchNav(id)"
      >
        {{ navItem.text }}
      </view>
    </scroll-view>

    <swiper :current="currentTab" duration="300" @change="switchTab" class="main">
      <swiper-item v-for="(tabItem, id) in tabData" :key="id" class="content">
        <view v-if="id === 0" class="Moments">
          <news-item :kind="1"></news-item>
        </view>

        <view v-else-if="id === 1" class="Times">
          <news-item :kind="2"></news-item>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import newsItem from './components/newsItem.vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref, computed, onMounted } from 'vue'
import { getAudit } from '@/services/Audit'
export default {
  components: {
    newsItem,
  },
  setup() {
    const showMoments = ref(true)

    // const isShowMoments = () => {
    //   showMoments.value = true
    //   console.log(showMoments.value)
    // }

    // const isShowTimes = () => {
    //   showMoments.value = false
    //   console.log(showMoments.value)
    // }

    const isPastTargetDate = ref(false)
    const navScrollLeft = ref(0)
    const screenW = ref()
    const currentTab = ref(0)
    const navData = ref([{ text: '精彩瞬间' }, { text: '科普时间' }])
    const tabData = ref([0, 1])
    const singleNavWidth = ref()

    const switchNav = (idx) => {
      console.log(idx)
      singleNavWidth.value = screenW.value / 2
      navScrollLeft.value = (idx - 2) * singleNavWidth.value
      if (currentTab.value === idx) {
        return false
      } else {
        currentTab.value = idx
      }
    }

    const switchTab = (e) => {
      const cur = e.detail.current
      singleNavWidth.value = screenW.value / 2
      currentTab.value = cur
      console.log(currentTab.value)
      navScrollLeft.value = (cur - 2) * singleNavWidth.value
    }

    const getA = async () => {
      const res = await getAudit()
      console.log(res)
      isPastTargetDate.value = res.data
    }
    onShow(() => {
      console.log('column!!!')
      getA()
      uni.switchTab({
        url: '/pages/column/column',
      })
    })
    onMounted(() => {
      getA()
      wx.getSystemInfo({
        success(res) {
          screenW.value = res.windowWidth
          console.log(res.windowWidth) // 屏幕宽度
          singleNavWidth.value = res.windowWidth / 2
          navScrollLeft.value = (currentTab.value - 2) * singleNavWidth.value
        },
      })
    })

    return {
      showMoments,
      isPastTargetDate,
      navScrollLeft,
      screenW,
      navData,
      tabData,
      singleNavWidth,
      switchNav,
      switchTab,
      currentTab,
    }
  },
}
//
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100vh;
  padding-top: 7vh;
}
.nav {
  /* 设置tab-nav宽高度 */
  height: 7vh;
  width: 100%;

  /* 假如您需要并排放置两个带边框的框，
  可通过将 box-sizing 设置为 "border-box"。 */
  box-sizing: border-box;

  overflow: hidden;

  /* 居中 */
  line-height: 7vh;

  background: #f7f7f7;

  font-size: 32rpx;

  /* 规定段落中的文本不进行换行： */
  white-space: nowrap;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

.nav-item {
  width: 50%;
  display: inline-block;
  text-align: center;
}

.nav-item.active {
  color: #428ffb;
}
.content {
  overflow-y: scroll;
}
</style>
