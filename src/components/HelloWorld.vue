<template>
  <div id="grid-16">
    <grid v-for="list in gridList">
      <grid-item v-for="item in list">
        {{ item > 0 ? item : '' }}
      </grid-item>
    </grid>
  </div>
</template>

<script>
  import Vue from 'vue'
  import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
  import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
  import { Grid, GridItem } from 'vux'
  import $ from 'jquery'

  Vue.use(AlloyFingerVue, {
    AlloyFinger
  })

  export default {
    data: function () {
      return {
        gridList: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]
      }
    },
    components: {
      Grid,
      GridItem
    },
    methods: {
      initCss: function () {
        let gwidth = $('#grid-16 .weui-grid').width()
        $('#grid-16 .weui-grid').css({'line-height': gwidth + 'px'})
        $('#grid-16 .weui-grid').height(gwidth)
      },
      moveTo: function (code) {
        let oldV = this.gridList.toString()
        // 左 37 上 38 又 39 下 40
        if (code === 'Left') {
          this.moveByRowL()
        } else if (code === 'Right') {
          this.moveByRowR()
        } else if (code === 'Up') {
          this.moveByColU()
        } else if (code === 'Down') {
          this.moveByColD()
        }
        if (this.gridList.toString() !== oldV) {
          this.createRandom()
        }
      },
      createRandom: function () {
        let notZero = []
        let key = 0
        // 循环把所有为0的元素找出来 并把下标放在notZero中
        for (let i = 0; i < this.gridList.length; i++) {
          for (let j = 0; j < this.gridList[i].length; j++) {
            if (this.gridList[i][j] === 0) {
              notZero.push(key)
            }
            key++
          }
        }
        if (notZero.length === 0) {
          console.log('满了')
          return false
        }
        // 随机在数组中选一个下标 在grideList中把这个下标对应的值修改
        let r = (Math.round(Math.random() * 100 % (notZero.length - 1))) || 0
        let randomIndex = notZero[r]
        this.gridList[Math.floor(randomIndex / 4)].splice(randomIndex % 4, 1, 2)
      },
      moveByRowL: function () {
        for (let i = 0; i < 4; i++) {
          let newArr = this.calArrayToL(this.gridList[i])
          this.gridList[i] = newArr
        }
      },
      moveByRowR: function () {
        for (let i = 0; i < 4; i++) {
          let newArr = this.calArrayToL(this.gridList[i].reverse()).reverse()
          this.gridList[i] = newArr
        }
      },
      moveByColU: function () {
        for (let i = 0; i < 4; i++) {
          let arr = []
          for (let j = 0; j < 4; j++) {
            arr.push(this.gridList[j][i])
          }
          let newArr = this.calArrayToL(arr)
          for (let k = 0; k < 4; k++) {
            this.gridList[k][i] = newArr[k]
          }
        }
      },
      moveByColD: function () {
        for (let i = 0; i < 4; i++) {
          let arr = []
          for (let j = 0; j < 4; j++) {
            arr.push(this.gridList[j][i])
          }
          let newArr = this.calArrayToL(arr.reverse()).reverse()
          for (let k = 0; k < 4; k++) {
            this.gridList[k][i] = newArr[k]
          }
        }
      },
      calArrayToL: function (arr) {
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === 0 && arr[j] !== 0) {
              arr[i] = arr[j]
              arr[j] = 0
            } else if (arr[i] !== 0 && arr[i] === arr[j]) {
              arr[i] *= 2
              arr[j] = 0
              j = arr.length
            } else if (arr[i] !== 0 && arr[j] !== 0 && arr[i] !== arr[j]) {
              j = arr.length
            }
          }
        }
        return arr
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        document.body.addEventListener('touchmove', function (evt) {
          if (!evt._isScroller) {
            evt.preventDefault()
          }
        })
        this.initCss()
        // 初始化生成两个随机数
        this.createRandom()
        this.createRandom()
        let _this = this
        document.onkeydown = function (e) {
          // 左 37 上 38 又 39 下 40
          console.log(e.keyCode)
          switch (e.keyCode) {
            case 37:
              _this.moveTo('Left')
              break
            case 38:
              _this.moveTo('Up')
              break
            case 39:
              _this.moveTo('Right')
              break
            case 40:
              _this.moveTo('Down')
              break
          }
        }
        var af = new AlloyFinger(document.getElementById('grid-16'), {
          swipe: function (evt) {
            _this.moveTo(evt.direction)
          }
        })
        af.on('touchStart', function () {})
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .weui-grid{
    padding: 0;
  }
</style>
