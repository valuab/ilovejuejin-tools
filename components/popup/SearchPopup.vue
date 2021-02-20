<template>
  <popup-mask :direction="'Top'" :show-header="true" @hide="ifSearchpopup">
    <aside class="container" @click.stop="stop">
      <span class="close" @click="ifSearchpopup"
        ><Icon icon="CloseBlack" font-size="20px"></Icon
      ></span>

      <h1>搜索</h1>
      <!-- <search-input class="search-input" @search="onSearch"></search-input> -->
      <div v-if="history.length !== 0" class="search-history">
        <div class="header">
          <h2>搜索历史</h2>
          <span @click="removeHistory">清空</span>
        </div>
        <div class="main">
          <p v-for="(item, index) in history" :key="index" @click="navSearch">
            {{ item }}
          </p>
        </div>
      </div>
      <div class="search-KOL">
        <h2>内容出品人</h2>
        <a-row :gutter="16">
          <a-col v-for="(item, index) in kolList" :key="index" :span="6">
            <search-KOL class="kol" @click="navKolDetail"></search-KOL>
          </a-col>
        </a-row>
      </div>
    </aside>
  </popup-mask>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
// import { useRouter } from 'vue-router'

import useSearchHistory from '@/hooks/useSearchHistory.ts'
import SearchKOL from '../search/SearchKOL.vue'
import PopupMask from './PopupMask.vue'
// import SearchInput from '/@components/search/SearchInput.vue'

export default defineComponent({
  name: 'SearchPopup',
  components: {
    // SearchInput,
    SearchKOL,
    PopupMask,
  },
  emits: ['showSearch'],
  setup() {
    const { history, useSearch, removeHistory } = useSearchHistory()

    /**
     * @description: 冒泡拦截
     */
    const stop = () => {
      return false
    }

    /**
     * @description: kol数组
     */
    const kolList = reactive<Array<number>>([])
    for (let i = 0; i < 12; i++) {
      kolList.push(i)
    }

    /**
     * @description: 点击搜索
     */
    const onSearch = (value: string) => {
      useSearch(value).then(() => navSearch(value))
    }

    /**
     * @description: 跳转至kol详情页
     */
    const navKolDetail = () => {
      // router
      //   .push({ name: 'KOLDetail', params: { id: '3' } })
      //   .then(() => ifSearchpopup())
    }

    /**
     * @description: 跳转至搜索页
     */
    const navSearch = (value: string) => {
      console.log(value)
      // router.push({ name: 'Search', params: { keyword: value } }).then(() => {
      //   ifSearchpopup()
      // })
    }

    return {
      stop,
      history,
      kolList,
      onSearch,
      navKolDetail,
      removeHistory,
      navSearch,
    }
  },
  methods: {
    ifSearchpopup() {
      this.$accessor.global.showSearchPopup()
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  line-height: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1000px;
  padding: 0 90px;
  background-color: #fff;
  z-index: 100;

  & > .close {
    position: absolute;
    top: 30px;
    right: 30px;
  }

  & > h1 {
    margin-top: 60px;

    @include text(32px, #000, bold);
  }

  h2 {
    @include text($font-size-lg, #000, bold);

    margin: 0;
  }

  & > .search-history {
    width: 100%;
    margin-top: 60px;

    .header {
      @include flex(row, flex-start, center);

      margin-bottom: 20px;

      & > span {
        @include text($font-size-sm, #666666);

        margin-left: 10px;
        cursor: pointer;

        &:hover {
          color: $heading-color;
        }
      }
    }

    .main {
      max-height: 70px;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;

      p {
        height: 30px;
        padding: 0 9px;
        margin-right: 10px;
        margin-bottom: 10px;
        line-height: 30px;
        cursor: pointer;
        background-color: #f5f5f5;

        &:hover {
          color: $heading-color;
        }
      }
    }
  }

  & > .search-KOL {
    margin-top: 60px;
    margin-bottom: 90px;

    h2 {
      margin-bottom: 20px;
    }

    .kol {
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
}
</style>
