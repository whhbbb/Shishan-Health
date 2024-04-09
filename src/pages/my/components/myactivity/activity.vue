<template>
  <view class="container" v-if="isPastTargetDate">
    <scroll-view 
      scroll-x
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
    <swiper
      :current="currentTab"
      duration="300"
      @change="switchTab"
    >
      <swiper-item v-for="(tabItem,id) in navData" :key="id" class="content">
        <Details :state="id"></Details>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts">
import Details from './components/Details.vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { onMounted, ref } from 'vue'
import { getAudit } from '@/services/Audit'

export default {
  components: {
    Details
  },
  setup() {
    const isPastTargetDate = ref(false)
    const navScrollLeft = ref(0)
    const screenW = ref()
    const currentTab = ref(0)
    const navData = ref([{ tab: 0, text: '我参加的' }, { tab: 1, text: '我发布的' }])
    const singleNavWidth = ref()
    const refreshTag=ref(false)


    const switchNav = (id: any) => {
      singleNavWidth.value = screenW.value / 2
      navScrollLeft.value = (id - 2) * singleNavWidth.value
      currentTab.value = id
    }

    const switchTab = (e: any) => {
      currentTab.value = e.detail.current
      switchNav(e.detail.current)
    }

    const getA = async () => {
      const res = await getAudit()
      isPastTargetDate.value = res.data
    }

    onMounted(() => {
      wx.getSystemInfo({
        success: (res) => {
          screenW.value = res.windowWidth
          singleNavWidth.value = screenW.value / 2
          navScrollLeft.value = (currentTab.value - 2) * singleNavWidth.value
          // switchNav(state)
          uni.$on('backPageData',function(data){
            switchNav(data.state);
            refreshTag.value=true;
          })
        }
      })
    })

    onShow(() => {
      getA()
    })

    onMounted(() => {
      getA()
    })

    return {
      isPastTargetDate,
      navScrollLeft,
      screenW,
      currentTab,
      navData,
      singleNavWidth,
      switchNav,
      switchTab,
      getA
    }
  }
}
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