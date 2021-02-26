<template>
  <popup-mask :direction="'Top'" :show-header="true" @hide="ifSearchpopup">
    <aside class="container">
      <span class="close" @click="ifSearchpopup"
        ><Icon icon="CloseBlack" font-size="20px"></Icon
      ></span>

      <h1>搜索</h1>
      <search-input class="search-input" @search="onSearch"></search-input>
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
          <a-col
            v-for="(item, index) in kolList"
            :key="index"
            :span="6"
            @click="navKolDetail(item.userId)"
          >
            <search-KOL class="kol" :item="item"></search-KOL>
          </a-col>
        </a-row>
      </div>
    </aside>
  </popup-mask>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IKolListType } from '@apiModules/search'
import {
  getSearchHistory,
  setSearchHistory,
  deleteHistory,
} from '@/utils/search'
import SearchInput from '@/components/search/SearchInput.vue'
import SearchKOL from '@/components/search/SearchKOL.vue'
import PopupMask from './PopupMask.vue'

interface IDataType {
  kolList: IKolListType[]
  history: Array<string>
}

export default defineComponent({
  name: 'SearchPopup',
  components: {
    SearchInput,
    SearchKOL,
    PopupMask,
  },
  emits: ['showSearch'],
  data(): IDataType {
    return {
      kolList: [] as IKolListType[],
      history: [],
    }
  },

  async fetch() {
    const { list } = await this.$http.search.getKolList()
    this.kolList = list
  },

  mounted() {
    this.history = getSearchHistory()
  },

  methods: {
    /**
     * @description: 隐藏弹窗
     */
    ifSearchpopup() {
      this.$accessor.global.showSearchPopup()
    },

    /**
     * @description: 清空搜索历史
     */
    removeHistory() {
      deleteHistory()
      this.history = []
    },

    /**
     * @description: 跳转至搜索页
     */
    navSearch(value: string) {
      this.$router.push({ path: '/Search?keyword=' + value })
      this.ifSearchpopup()
    },

    /**
     * @description: 点击搜索
     */
    onSearch(value: string) {
      setSearchHistory(value).then(() => this.navSearch(value))
    },

    /**
     * @description: 跳转至kol详情页
     */
    navKolDetail(id: number) {
      this.$router.push(`/kol/${id}`)
      this.ifSearchpopup()
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
    line-height: 32px;
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
