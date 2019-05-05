<template>
  <a href="#" @click="addBoardAction">
    <div class="card bg-dark text-white">
      <div class="card-body">
        <h5 class="card-title">Add Board(+)</h5>
      </div>
    </div>
  </a>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('home');


export default {
  name: 'BoardCard',
  methods: {
    addBoardAction() { 
      this.$prompt('请输入 BoardName', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.addBoard({
          boardName: value,
        });
        this.$message({
          type: 'success',
          message: '你的boardName是: ' + boardName
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    },
    ...mapActions(['addBoard']),
  },
};
</script>

<style scoped>

</style>
