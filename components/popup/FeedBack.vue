<template>
  <popup-mask :direction="'Center'" :show-header="false" @hide="showFeedBack">
    <div class="box">
      <div class="header">
        <h1>意见反馈</h1>
        <p>为您提供优质的服务（产品微信：djchewen）</p>
      </div>
      <div class="main">
        <p>请选择您需要反馈的问题：</p>
        <!-- 单选START -->
        <div class="radio">
          <a-radio-group :default-value="defaultRadio" @Change="onChange">
            <a-space :size="10">
              <a-radio-button
                v-for="(item, index) in readioList"
                :key="index"
                class="radio-btn"
                :value="item.id"
              >
                {{ item.name }}
              </a-radio-button>
            </a-space>
          </a-radio-group>
        </div>
        <!-- 单选END -->

        <!-- APP问题START -->
        <div v-if="tabIndex === 1" class="issue-box">
          <div class="issue-phone">
            <div
              v-for="(dropDownItem, dropDownindex) in appIssue.list"
              :key="dropDownindex"
            >
              <a-dropdown :trigger="['click']" @visible-change="visibleChange">
                <a-button
                  class="dropdown-title"
                  @click="dropdownClick(dropDownindex)"
                >
                  {{ dropDownItem.title }}
                  <span :style="dropDownItem.iconAni" class="dropdown-icon">
                    <Icon icon="ArrowOrange" />
                  </span>
                </a-button>
                <template #overlay>
                  <a-menu
                    :style="{
                      height: dropDownItem.items.length >= 5 ? '160px' : '',
                      overflowY: 'scroll',
                    }"
                    mode="inline"
                  >
                    <a-menu-item
                      v-for="(item, index) in dropDownItem.items"
                      :key="index"
                      @click="menuClick"
                      >{{ item.versionName }}</a-menu-item
                    >
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <a-input
              v-model="appIssue.inputValue"
              :style="{ width: '200px' }"
              :max-length="15"
              placeholder="填写品牌型号"
            ></a-input>
          </div>
          <a-text-area
            v-model="appIssue.textArea"
            class="contact-textArea"
            :max-length="140"
            placeholder="第一步：打开APP
第二步：点击到底部菜单发帖功能
第三步：无法发出文章，或者其他？

请用140字描述操作中遇到的问题"
            show-count
            :auto-size="{ minRows: 6, maxRows: 6 }"
          ></a-text-area>
        </div>
        <!-- APP问题END -->

        <!-- 其余问题START -->
        <div v-else class="issue-box">
          <a-input
            v-model="issueValue.contact"
            class="contact-input"
            :max-length="30"
            placeholder="我们如何方便与您取得联系：QQ、邮件、微信、手机号？"
          ></a-input>
          <a-text-area
            v-model="issueValue.textArea"
            class="contact-textArea"
            :max-length="140"
            placeholder="请填写您需要反馈的问题，内容控制在140个字以内"
            show-count
            :auto-size="{ minRows: 6, maxRows: 6 }"
          ></a-text-area>
        </div>
        <!-- 其余问题END -->
      </div>
      <!-- 底部提交START -->
      <div class="footer">
        <div class="verify-box">
          <a-input
            v-model="verifyInput"
            class="verify-input"
            :style="{ width: '136px', marginRight: '11px' }"
            :max-length="4"
            placeholder="输入验证字符"
          ></a-input>
          <image
            class="verify-image"
            :src="verifyImg"
            alt="图片加载失败"
          ></image>
          <span class="verify-change" @click="toggleVerify">换一个</span>
        </div>

        <div>
          <a-button
            :disabled="disabled"
            class="submit"
            type="primary"
            @click="submit"
          >
            发送反馈
          </a-button>
        </div>
      </div>
      <!-- 底部提交END -->
    </div>
  </popup-mask>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  unref,
  watchEffect,
} from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
import {
  // Space,
  Radio,
  Input,
  Dropdown,
  Menu,
  // message,
  // RadioChangeEvent,
} from 'ant-design-vue'

// import { } from 'ant-design-vue'
// import { http } from '/@/api/http'
// import ApiLink from '/@/api/apiLink'

import PopupMask from './PopupMask.vue'
export default defineComponent({
  name: 'FeedBack',
  components: {
    // ASpace: Space,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    AInput: Input,
    ATextArea: Input.TextArea,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    PopupMask,
  },
  props: {
    // tab默认选择
    defaultRadio: {
      type: Number,
      default: 2,
    },
  },
  emits: ['showFeedBack'],
  setup(props) {
    const { defaultRadio } = toRefs(props)

    /** *********** tab问题选择 START ****************/
    const tabIndex = ref<Number>(unref(defaultRadio))

    // 问题单选标题列表
    const readioList: any = ref([])
    // http(ApiLink.getFeedbackCategory).then((res: any) => {
    //   readioList.value = res.result.list
    // })
    /**
     * @description: 监听radio改变
     */
    const onChange = (e: any): void => {
      const value = e.target.value
      tabIndex.value = value
    }
    /** *********** tab问题选择 END ****************/

    /** *********** APP问题 START ****************/
    const appIssue = reactive({
      inputValue: '', // 品牌型号
      textArea: '', // 问题描述
      list: [
        {
          title: '选择手机系统',
          iconAni: '',
          items: [
            { id: 1, versionName: 'Android系统' },
            { id: 2, versionName: 'iOS系统' },
          ],
          value: NaN,
        },
        {
          title: '选择APP版本',
          iconAni: '',
          items: [],
          value: NaN,
        },
      ],
    })
    // http(ApiLink.getAppVersionList).then((res: any) => {
    //   appIssue.list[1].items = res.result.list
    // })
    const dropdownIndex = ref<number>(0) // 下拉列表index
    /**
     * @description: 点击下拉列表
     */
    const dropdownClick = (index: number): void => {
      dropdownIndex.value = index
      appIssue.list[index].iconAni = 'transform: rotateX(180deg)'
    }

    /**
     * @description: 下拉列表显示与隐藏
     */
    const visibleChange = (visible: boolean): void => {
      appIssue.list[dropdownIndex.value].iconAni = visible
        ? 'transform: rotateX(180deg)'
        : ''
    }

    /**
     * @description: menu点击回调
     */
    const menuClick = (e: { key: number }): void => {
      const { key } = e
      const menuItem = appIssue.list[dropdownIndex.value].items
      appIssue.list[dropdownIndex.value] = {
        title: menuItem[key].versionName,
        iconAni: '',
        items: menuItem,
        value: menuItem[key].id,
      }
    }

    /** *********** APP问题 END ****************/

    /** *********** 其余问题 START ****************/
    const issueValue = reactive({
      contact: '', // 联系方式
      textArea: '', // 问题描述
    })
    /** *********** 其余问题 END ****************/

    /** *********** 提交反馈 START ****************/
    const disabled = ref<boolean>(true) // 按钮disabled
    const verifyInput = ref<string>('') // 验证码
    const verifyImg = ref('') // 验证码图片
    const toggleVerify = () => {
      // verifyImg.value = `/api${ApiLink.getVerifyImg.url}?time=${new Date()}`
    }
    toggleVerify()
    /**
     * @description: 监听数据改变
     */
    watchEffect(() => {
      if (tabIndex.value === 1) {
        const dropdownNull = appIssue.list.some((item) => !item.value)
        if (
          appIssue.inputValue &&
          appIssue.textArea &&
          verifyInput.value.length === 4 &&
          !dropdownNull
        ) {
          disabled.value = false
        } else {
          disabled.value = true
        }
      } else if (
        issueValue.contact &&
        issueValue.textArea &&
        verifyInput.value.length === 4
      ) {
        disabled.value = false
      } else {
        disabled.value = true
      }
    })
    /**
     * @description: 提交问题反馈
     */
    const submit = () => {
      // const captcha = verifyInput.value
      // const categoryId = tabIndex.value
      // let osTypeId, model, versionCode, content, contact
      // if (categoryId === 1) {
      //   osTypeId = appIssue.list[0].value
      //   model = appIssue.inputValue
      //   versionCode = appIssue.list[1].value
      //   content = appIssue.textArea
      //   contact = 'PC官网'
      // } else {
      //   osTypeId = ''
      //   model = ''
      //   versionCode = ''
      //   content = issueValue.textArea
      //   contact = issueValue.contact
      // }
      // http(ApiLink.createForSite, {
      //   captcha,
      //   categoryId,
      //   osTypeId,
      //   model,
      //   versionCode,
      //   content,
      //   contact,
      // }).then((res) => {
      //   if (res.error) {
      //     message.error(res.error)
      //     return
      //   }
      //   message.success('提交成功')
      //   isFeedBack()
      // })
    }
    /** *********** 提交反馈 END ****************/

    return {
      readioList,
      tabIndex,
      onChange,
      appIssue,
      visibleChange,
      menuClick,
      issueValue,
      dropdownClick,
      disabled,
      verifyImg,
      verifyInput,
      toggleVerify,
      submit,
    }
  },
  methods: {
    ...mapActions({
      showFeedBack: 'global/showFeedBack',
    }),
  },
})
</script>
<style lang="scss" scoped>
.box {
  width: 600px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;

  .header {
    width: 100%;
    height: 84px;
    padding-top: 20px;
    padding-left: 30px;
    background-color: #f5f5f5;

    h1 {
      margin-bottom: 10px;
      line-height: 20px;

      @include text($font-size-heading, #000000, bold);
    }

    p {
      margin: 0;
      line-height: 14px;

      @include text($font-size-base, #666666, bold);
    }
  }

  .main {
    margin: 30px 30px 50px;

    & > p {
      margin-bottom: 16px;
    }

    & > .radio {
      .radio-btn {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
      }
    }

    & > .issue-box {
      margin-top: 16px;

      .issue-phone {
        display: flex;
        justify-content: space-between;
      }

      input {
        border: solid 1px #e6e6e6;
        border-radius: 4px;
      }

      .contact-textArea {
        margin-top: 16px;
      }

      .dropdown-title {
        display: inline-flex;
        width: 160px;
        align-items: center;
        justify-content: center;

        .dropdown-icon {
          width: 20px;
          height: 20px;
          margin-left: 20px;
          transition: all 0.5s;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin: 0 30px 30px;

    .verify-box {
      display: flex;
      align-items: center;

      .verify-input {
        text-align: center;
      }

      .verify-image {
        width: 125px;
        height: 40px;
      }

      .verify-change {
        cursor: pointer;

        @include text($font-size-base, $primary-color);
      }
    }

    .submit {
      width: 120px;
      height: 40px;
      border-radius: 4px;
    }
  }
}
</style>
