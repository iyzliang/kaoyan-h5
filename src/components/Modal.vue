<template>
  <div class='modal' v-if="showModal" @click="closeModal">
    <div class="modal-container">
      <img class="modal-img" src="@/assets/images/success.svg"/>
      <div class="modal-title">您已提交成功</div>
      <div class="modal-msg">感谢您的支持，客服将与您联系为您答疑解惑~</div>
    </div>
    <img src="@/assets/images/close.svg" class="modal-close"/>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'modal',

  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },

  emits: ['close-modal'],

  setup (props, ctx) {
    const closeModal = () => {
      ctx.emit('close-modal')
    }
    return {
      closeModal
    }
  }
})
</script>
<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .modal-container {
    margin: 0 auto;
    margin-top: 25vh;
    width: rem(554);
    height: rem(400);
    background-image: url(../assets/images/modal.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    padding: rem(50);
    box-sizing: border-box;
    .modal-img {
      width: rem(80);
      height: rem(80);
      display: block;
      margin: 0 auto;
    }
    .modal-title {
      width: 100%;
      height: rem(40);
      height: rem(50);
      line-height: rem(50);
      font-size: rem(34);
      color: #f00;
      text-align: center;
      margin-top: rem(37);
    }
    .modal-msg {
      width: 80%;
      margin: 0 auto;
      margin-top: rem(16);
      font-size: rem(26);
      line-height: rem(37);
      color: #3A3A3A;
      text-align: center;
    }
  }
  .modal-close {
    margin: 0 auto;
    margin-top: rem(80);
    width: rem(60);
    height: rem(60);
    display: block;
  }
}
</style>
