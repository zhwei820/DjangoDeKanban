<template>
  <div class="board-menu-bar navbar navbar-dark bg-dark">
    <span v-show="!isEditingBoardName" @dblclick="startBoardNameEdit" class="navbar-brand mb-0 h1 board-name">{{ boardName }}</span>
    <span v-show="isEditingBoardName" class="navbar-brand mb-0 h1">
      <input type="text" v-model="editBoardName" />
      <button type="button" class="btn btn-primary" @click="saveBoardName">save</button>
    </span>
    <nav class="my-2 my-md-0 mr-md-3">
      <form class="form-inline mt-2 mt-md-0" id="search-form">
        <input name="query" v-model="wrappedSearchWord" class="form-control mr-3"
               type="text" placeholder="Search" aria-label="Search">
        <button type="button" class="btn btn-outline-danger" @click.prevent="deleteBoardAction">delete</button>
      </form>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('board');


export default {
  name: 'MenuBar',
  data() {
    return {
      isEditingBoardName: false,
      editBoardName: '',
    };
  },
  computed: {
    wrappedSearchWord: {
      get() {
        return this.searchWord;
      },
      set(val) {
        this.setSearchWord(val);
      },
    },
    boardName() {
      return this.boardData.name;
    },
    ...mapState([
      'searchWord',
      'boardData',
    ]),
  },
  methods: {
    startBoardNameEdit() {
      this.isEditingBoardName = true;
      this.editBoardName = this.boardName;
      console.log('start', this.isEditingBoardName);
    },
    saveBoardName() {
      this.isEditingBoardName = false;
      if (this.editBoardName === this.boardName) return;
      this.renameBoard({
        boardId: this.boardData.boardId,
        boardName: this.editBoardName,
      });
    },
    deleteBoardAction() {

      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteBoard({
            boardId: this.boardData.boardId,
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      

    },
    ...mapActions([
      'setSearchWord',
      'renameBoard',
      'deleteBoard',
    ]),
  },
};
</script>

<style scoped>
  .board-menu-bar {
    margin: 1rem 0;
    width: 100%;
  }
  .board-name {
    cursor: pointer;
  }
</style>
