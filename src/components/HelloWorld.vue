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
  import { Grid, GridItem } from 'vux'
  import $ from 'jquery'

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
        $('#grid-16 .weui-grid').css({'padding': 0, 'line-height': gwidth + 'px'})
        $('#grid-16 .weui-grid').height(gwidth)
      },
      getKeyup: function (e) {
        let code = e.keyCode
        // 左 37 上 38 又 39 下 40
        if (code === 37) {
          this.moveByRowL(code)
        } else if (code === 39) {
          this.moveByRowR(code)
        } else if (code === 38) {
          this.moveByColU()
        } else if (code === 40) {
          this.moveByColD()
        }
        this.createRandom()
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
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === 0 && arr[j] !== 0) {
              arr[i] = arr[j]
              arr[j] = 0
            } else if (arr[i] !== 0 && arr[i] === arr[j]) {
              arr[i] *= 2
              arr[j] = 0
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
        this.initCss()
        // 初始化生成两个随机数
        this.createRandom()
        this.createRandom()
        let _this = this
        document.onkeydown = function (e) {
          _this.getKeyup(e)
        }
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
