<template>
  <div class="container">
    <a :href="adData.url">
      <img :src="adData.smallImageUrl || adData.smallImage2Url" alt="ad" />
    </a>
    <span @click="hidePopUp">×</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AD_NUMBER_TYPE, IAdListType } from '@apiPublic/modules/adList'

export default defineComponent({
  name: 'AdPopUp',
  data() {
    return {
      adData: {} as IAdListType,
    }
  },
  async fetch() {
    const ad = await this.$http.adList.getAdList({
      pageName: 'index',
      number: AD_NUMBER_TYPE[0],
    })
    this.adData = ad[0]
  },
  methods: {
    hidePopUp() {
      this.$accessor.global.showAdPopup()
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  width: 1000px;
  height: 600px;
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -500px;
  background-color: $primary-color;
  animation: aniTranslate 1s 2s;
  transform: translateY(-600px);
  animation-fill-mode: forwards;

  & > a {
    display: block;
    width: 100%;
    height: 100%;

    & > img {
      width: 100%;
      height: 100%;
    }
  }

  span {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    line-height: 30px;
    text-align: center;
    @include text(30px, #fff);

    cursor: pointer;
  }
}

@keyframes aniTranslate {
  100% {
    transform: translateY(0);
  }
}
</style>
