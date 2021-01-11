<template>
  <div class="home">
    <img src="@/assets/images/img-top.png" class="img-top">
    <div class="home-container">
      <div class="home-input-form">
        <div class="input-view">
          <div class="input-container" @click="showPopup = true">
            {{ degree || '请选择您的最终学历'  }}
          </div>
        </div>
        <div class="input-view">
          <input class="input-container" type="text" v-model="name" placeholder="请输入您的姓名" />
        </div>
        <div class="input-view">
          <input class="input-container" type="text" v-model="contact" placeholder="请输入您的手机号（微信）" />
        </div>
        <van-button @click="onSubmitFn" round type="primary" class="input-btn" :loading="btnLoading">免费咨询</van-button>
      </div>
    </div>
    <img src="@/assets/images/info.png" class="info-container copy-dom" @click="copyUrl">
    <img src="@/assets/images/img1.jpeg" class="haibao-img">
    <van-popup v-model:show="showPopup" position="bottom" round>
      <van-picker
        title="学历"
        :columns="columns"
        :default-index="defaultIndex"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <Modal :showModal="showModal" @close-modal="showModal = false"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Notify } from 'vant'
import Api from '@/hooks/api'
import Modal from '@/components/Modal.vue'
import Clipboard from 'clipboard'
export default defineComponent({
  name: 'Home',

  components: {
    Modal
  },

  setup () {
    const degree = ref('')
    const name = ref('')
    const contact = ref('')
    const showPopup = ref(false)
    const columns = ref(['本科', '专科', '高中', '中学', '小学'])
    const defaultIndex = ref(null)
    const btnLoading = ref(false)
    const showModal = ref(false)
    const onSubmitFn = () => {
      if (contact.value) {
        btnLoading.value = true
        const queryBoday = {
          degree: degree.value,
          name: name.value,
          contact: contact.value
        }
        Api.postStudent(queryBoday).then(() => {
          showModal.value = true
        }).catch(error => {
          console.log(error)
          Notify({ type: 'warning', message: error.message })
        }).finally(() => {
          btnLoading.value = false
        })
      } else {
        Notify({ type: 'warning', message: '请您输入联系方式后提交！' })
      }
      console.log('提交')
    }
    const onConfirm = (value, index) => {
      defaultIndex.value = index
      degree.value = value
      showPopup.value = false
    }
    const onCancel = () => {
      showPopup.value = false
    }
    const copyUrl = () => {
      const clipboard = new Clipboard('.copy-dom', {
        text: () => {
          return '通微信:18804627165 抖音号:120567434'
        }
      })
      clipboard.on('success', () => {
        Notify({ type: 'success', message: '联系方式已复制！' })
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        clipboard.destroy()
      })
    }
    return {
      degree,
      name,
      contact,
      showPopup,
      columns,
      btnLoading,
      showModal,
      onSubmitFn,
      onCancel,
      onConfirm,
      copyUrl
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  background-color: #f45b1f;
  position: relative;
  .img-top {
    width: 100%;
    height: auto;
    display: block;
  }
  .home-container {
    width: 100%;
    padding: rem(30);
    .home-input-form {
      width: rem(680);
      margin: 0 auto;
      border-radius: rem(33);
      overflow: hidden;
      background-color: #FFF;
      padding: rem(30) rem(20);
      box-sizing: border-box;
      .input-view {
        width: rem(640);
        height: rem(90);
        border: rem(2) solid #DCDCDC;
        border-radius: rem(16);
        display: flex;
        justify-content: center;
        align-items: center;
        & + .input-view {
          margin-top: rem(20);
        }
        .input-container {
          width: rem(580);
          height: rem(70);
          line-height: rem(70);
          font-size: rem(30);
          color: #999999;
          &::placeholder {
            color: #999999;
          }
        }
      }
      .input-btn {
        width: rem(640);
        height: rem(90);
        line-height: rem(90);
        margin-top: rem(30);
        border-radius: rem(45);
        background-color: #FF5F00;
        color: #FFFFFF;
        text-align: center;
        font-size: rem(34);
        position: relative;
        overflow: hidden;
        border: 0;
        &::before {
          content: '';
          position: absolute;
          width: rem(50);
          height: rem(50);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0) scale(1);
          background-color: #000;
          opacity: 0;
          transition: all .2s;
        }
        &:active::before {
          transform: translate3d(-50%, -50%, 0) scale(10);
          opacity: 0.4;
        }
      }
    }
  }
  .info-container {
    width: 90%;
    height: auto;
    margin: 0 auto;
    margin-top: 30px;
    display: block;
  }
  .haibao-img {
    margin-top: 30px;
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
