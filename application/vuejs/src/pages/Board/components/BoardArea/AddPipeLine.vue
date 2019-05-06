<template>
  <div class="add-pipe-line">
    <nav class="navbar navbar-dark add-pipe-line-button" @click="addPipeLineAction">
      <span class="navbar-brand mb-0 h1">
        Add List(+)
      </span>
    </nav>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('board');


export default {
  name: 'AddPipeLine',
  computed: {
    ...mapState([
      'boardData',
    ]),
  },
  methods: {
    addPipeLineAction() {

      this.$prompt('请输入 PipeLineName', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.addPipeLine({
          boardId: this.boardData.boardId,
          pipeLineName: value,
        });
        this.$message({
          type: 'success',
          message: '你的 PipeLineName 是: ' + value
        });
      }).catch((e) => {
        console.log(e)
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });


    },
    ...mapActions([
      'addPipeLine',
    ]),
  },
};
</script>

<style lang='scss' scoped>
  .add-pipe-line {
    margin-right: 1rem;
    width: 15rem;
  }
  .add-pipe-line-button {
    cursor: pointer;
  }
  .navbar {
    background-color: #8c939d;
  }
</style>
