<template>
  <div class="usercontent">
    <div class="ren">
      <img src="../assets/teacher.jpg"
           alt="">
      <button @click="tri()">我想说:</button>
    </div>
    <div class="help">
      <transition enter-active-class="animated rollIn"
                  leave-active-class="animated rollOut"
                  mode='out-in'>
        <div class="help-1"
             v-if="index1"
             :key="1">
          <h1>用我们组卷系统的三大理由：</h1>
          <hr />
          <br />
          <h1>一：系统更新很快，不会落后</h1>
          <br />
          <h1>二：组卷系统丰富，多种选择</h1>
          <br />
          <h1>三：服务态度友好，倍感舒适</h1>
        </div>
        <div class="help-1"
             v-if="index2"
             :key="2">
          <h1>我们组卷系统的三大功能：</h1>
          <hr />
          <br />
          <h1>一：章节组卷，自选章节</h1>
          <br />
          <h1>二：知识点组卷，自选知识点</h1>
          <br />
          <h1>三：综合组卷，全面高效</h1>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      index1: true,
      index2: false,
    }
  },
  methods: {
    tri () {
      this.index1 = !this.index1
      this.index2 = !this.index2
    }
  },
}
</script>
<style lang="scss">
@import '../assets/scss/index.scss';
.usercontent {
  margin: 0 auto;
  width: 65%;
  display: flex;
  overflow: hidden;
  .ren {
    position: relative;
    flex: 0.1;
    img {
      margin: 60% auto;
    }
    button {
      position: absolute;
      left: 60%;
      top: 9%;
      width: 70px;
      height: 35px;
      /* text */
      font-weight: bold;
      text-shadow: rgba(255, 255, 255, 0.5) 0 1px 0;
      /* layout */
      border-radius: 31px;
      /* effects */
      border-top: 1px solid rgba(255, 255, 255, 0.8);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      background-image: -webkit-gradient(
          radial,
          50% 0,
          100,
          50% 0,
          0,
          from(rgba(255, 255, 255, 0)),
          to(rgba(255, 255, 255, 0.7))
        ),
        url('../assets/noise.png');
      transition: background 0.2s ease-in-out;
      color: hsl(0, 0%, 40%) !important;
      background-color: rgb(72, 201, 176);
      box-shadow: inset rgba(255, 254, 255, 0.6) 0 0.3em 0.3em,
        inset rgba(0, 0, 0, 0.15) 0 -0.1em 0.3em, hsl(0, 0%, 60%) 0 0.1em 3px,
        hsl(0, 0%, 45%) 0 0.3em 1px, rgba(0, 0, 0, 0.2) 0 0.5em 5px;
      &:active {
        background-image: gradient(
            radial,
            50% 0,
            100,
            50% 0,
            0,
            from(rgba(255, 255, 255, 0)),
            to(rgba(255, 255, 255, 0))
          ),
          url(../assets/noise.png);
        box-shadow: inset rgba(255, 255, 255, 0.6) 0 0.3em 0.3em,
          inset rgba(0, 0, 0, 0.2) 0 -0.1em 0.3em,
          rgba(0, 0, 0, 0.4) 0 0.1em 1px, rgba(0, 0, 0, 0.2) 0 0.2em 6px;
        transform: translateY(0.2em);
      }
      &:focus {
        outline: none;
      }
    }
  }
  .help {
    position: relative;
    flex: 0.9;
    .help-1 {
      width: 80%;
      margin: 8% auto;
      position: absolute;
      h1 {
        text-align: center;
        font-weight: 400;
        color: $color;
        @include screen(30);
      }
    }
  }
}
</style>