<template>
  <div id="imageContainer" class="image-container" ref="img" :style="`height: ${heightContainer}px`">
    <div class="buttons">
      <transition
        name="fade-btn"
        mode="out-in"
        appear
        appear-active-class="btn-appear"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
      >
        <button
          v-if="isFront"
          key="off"
          class="btn"
          id="off"
          :disabled="animated"
          @click="off"
        >
          <iconify-icon :icon="icons.off" height="2em" color="#ffffff"/>
        </button>
        <button
          v-else
          key="on"
          class="btn"
          id="on"
          :disabled="animated"
          @click="on"
        >
          <iconify-icon :icon="icons.on" height="2em" color="#ffffff"/>
        </button>
      </transition>
    </div>
    <transition-group
      name="cell-front"
      tag="div"
      class="front-image"
      @before-enter="beforeEnterFrontGroup"
      @after-enter="afterEnterFrontGroup"
      @before-leave="beforeLeaveFrontGroup"
      @after-leave="afterLeaveFrontGroup"
    >
      <div v-if="cell.show" v-for="cell in cellsFrontImage" :key="cell.id" class="cell" :style="cell.pieceOfFrontImage"></div>
    </transition-group>
    <transition-group
      name="cell-back"
      tag="div"
      class="back-image"
      @before-enter="beforeEnterBackGroup"
      @after-enter="afterEnterBackGroup"
      @before-leave="beforeLeaveBackGroup"
      @after-leave="afterLeaveBackGroup"
    >
      <div v-if="cell.show" v-for="cell in cellsBackImage" :key="cell.id" class="cell" :style="cell.pieceOfBackImage"></div>
    </transition-group>
  </div>
</template>

<script>
import IconifyIcon from '@iconify/vue';
import off from '@iconify-icons/mdi/eye-off-outline';
import on from '@iconify-icons/mdi/eye-outline';
// import imgFront from '@/assets/photo-exp.webp'
// import imgBack from '@/assets/photo.webp'

export default {
  name: "ImageSwitcher",
  components: {
    IconifyIcon
  },
  data() {
    return {
      isFront: true,
      rows: 8,
      cols: 8,
      srcFront: 'https://www.kadrovik01.com.ua/images/News/2020/12/16.12/16122020_001.jpg',
      srcBack: 'https://ua.news/wp-content/uploads/2018/12/new-year2018.jpg',
      // srcFront: imgFront,
      // srcBack: imgBack,
      imageFront: new Image(),
      imageBack: new Image(),
      widthContainer: null,
      heightContainer: null,

      cellsFrontImage: [],
      cellsBackImage: [],
      countCellsFront: null,
      countCellsBack: null,
      animatedBtn: false,

      countFrontGroup: null,
      countBackGroup: null,
      animatedFront: false,
      animatedBack: false,

      icons: {
        off,
        on
      }
    }
  },
  methods: {
    init() {
      const { rows, cols, srcFront, srcBack, widthContainer } = this

      this.cellsFrontImage = Array.from(new Array(rows * cols).keys()).map(i => ({
        'id': i,
        'pieceOfFrontImage': this.getPieceOfImageStyle(i, rows, cols, srcFront, widthContainer, this.heightContainer),
        'show': true
      }))
      this.cellsFrontImage = _.shuffle(this.cellsFrontImage)

      this.cellsBackImage = Array.from(new Array(rows * cols).keys()).map(i => ({
        'id': i,
        'pieceOfBackImage': this.getPieceOfImageStyle(i, rows, cols, srcBack, widthContainer, this.heightContainer),
        'show': false
      }))
      this.cellsBackImage = _.shuffle(this.cellsBackImage)

      this.countCellsFront = this.countCellsBack = this.countFrontGroup = this.countBackGroup = rows * cols
    },
    getPieceOfImageStyle(id, rows, cols, srcImage, width, height) {
      return {
        'background-image': `url(${srcImage})`,
        'background-size': `${width}px ${height}px`,
        'background-position': `-${(id % cols) * width / cols}px -${(id / cols | 0) * height / rows}px`,
        'left': `${(id % cols) * width / cols}px`,
        'top': `${(id / cols | 0) * height / rows}px`,
        'width': `${width / cols}px`,
        'height': `${height / rows}px`
      }
    },
    off() {
      this.switchShowCells(this.countCellsFront, this.cellsFrontImage, false)
      this.switchShowCells(this.countCellsBack, this.cellsBackImage, true)
      this.isFront = false
      this.isBack = true
    },
    on() {
      this.switchShowCells(this.countCellsFront, this.cellsFrontImage, true)
      this.switchShowCells(this.countCellsBack, this.cellsBackImage, false)
      this.isFront = true
      this.isBack = false
    },
    switchShowCells(count, cells, flag) {
      setTimeout(() => {
        if (count > 0) {
          count --
          cells[count].show = flag
          this.switchShowCells(count, cells, flag)
        }
      },8)
    },
    setDimensionsContainer() {
      this.widthContainer = this.heightContainer = this.$refs.img.clientWidth
    },
    resizeHandler() {
      this.setDimensionsContainer()
      this.init()
    },

    /*  Button  */
    beforeEnter() {
      this.animatedBtn = true
    },
    afterEnter() {
      this.animatedBtn = false
    },
    beforeLeave() {
      this.animatedBtn = true
    },
    afterLeave() {
      this.animatedBtn = false
    },

    /*  Group front image  */
    beforeEnterFrontGroup() {
      this.countFrontGroup --
      this.animatedFront = true
    },
    afterEnterFrontGroup() {
      this.countFrontGroup ++
      if (this.countFrontGroup === this.cellsFrontImage.length) {
        this.animatedFront = false
      }
    },
    beforeLeaveFrontGroup() {
      this.countFrontGroup --
      this.animatedFront = true
    },
    afterLeaveFrontGroup() {
      this.countFrontGroup ++
      if (this.countFrontGroup === this.cellsFrontImage.length) {
        this.animatedFront = false
      }
    },

    /*  Group back image  */
    beforeEnterBackGroup() {
      this.countBackGroup --
      this.animatedBack = true
    },
    afterEnterBackGroup() {
      this.countBackGroup ++
      if (this.countBackGroup === this.cellsBackImage.length) {
        this.animatedBack = false
      }
    },
    beforeLeaveBackGroup() {
      this.countBackGroup --
      this.animatedBack = true
    },
    afterLeaveBackGroup() {
      this.countBackGroup ++
      if (this.countBackGroup === this.cellsBackImage.length) {
        this.animatedBack = false
      }
    }
  },
  mounted() {
    this.setDimensionsContainer()
    this.init()
  },
  created() {
    this.imageFront.src = this.srcFront
    this.imageBack.src = this.srcBack

    window.addEventListener("resize", this.resizeHandler);

  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  computed: {
    /*  Если хоть какая-то анимация активна, то вернётся true  */
    animated() {
      return this.animatedBtn || this.animatedFront || this.animatedBack
    }
  }
};
</script>

<style scoped>
  .image-container {
    position: relative;
    width: 100%;
  }
  .front-image, .back-image {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .cell {
    position: absolute;
  }
  .buttons {
    position: absolute;
    bottom: 7px;
    right: 7px;
    z-index: 999;
  }

  /*  Сброс стилей кнопки  */

  button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
  }
  .btn {
    display: inline-block;
    text-align: center;
    text-decoration: none;
    color: #ffffff;
  }
  .btn:active {
    transform: none;
  }
  .btn:hover,
  .btn:focus {
    border: none;
  }
  .btn {
    outline: none;
  }
  .btn::-moz-focus-inner {
    border: none;
  }

  /*   ===================================================   */

  .cell-front-enter-active {
    animation: bounce-in .5s;
  }
  .cell-front-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
      opacity: 1;
      /*filter: blur(0)*/
    }
    50% {
      transform: scale(1.5);
      /*filter: blur(2px);*/
    }
    100% {
      transform: scale(1);
      opacity: 0;
      /*filter: blur(0);*/
    }
  }
  .cell-back-enter-active {
    animation: bounce-in-back .5s;
  }
  .cell-back-leave-active {
    animation: bounce-in-back .5s reverse;
  }
  @keyframes bounce-in-back {
    0% {
      transform: scale(0);
      opacity: 0;
      /*filter: blur(0);*/
    }
    50% {
      transform: scale(1.5);
      /*filter: blur(2px);*/
    }
    100% {
      transform: scale(1);
      opacity: 1;
      /*filter: blur(0)*/
    }
  }
  .fade-btn-enter-active, .fade-btn-leave-active {
    transition: opacity 2s ease;
  }
  .fade-btn-enter, .fade-btn-leave-to {
    opacity: 0;
  }

  .btn-appear {
    animation: init-btn .5s;
  }

  @keyframes init-btn {
    0% {
      transform: scale(0);
      opacity: 0
    }
    100% {
      transform: scale(1);
      opacity: 1
    }
  }

</style>
