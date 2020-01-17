<template>
  <div class="book-container" v-loading="btnLoading">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item class="form-item" label="名称">
        <el-input v-model="form.chaper_name"></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="排序(大-小)">
        <el-input type="number" v-model="form.order_num"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :rows="20" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button v-if="chapterid" type="primary" style="width:100%" @click="onSubmit" :loading="btnLoading">确认修改
        </el-button>
        <el-button v-else type="primary" style="width:100%" @click="onAddSubmit" :loading="btnLoading">确认新增
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getChapterDetails, upChapterDetails, addChapterDetails } from '@/api/book'
export default {
  data() {
    return {
      bookid: '',
      chapterid: '',
      form: {
        chaper_name: '',
        order_num: 9999,
        content: ''
      },
      btnLoading: false
    }
  },
  created() {
    this.bookid = this.$route.query.bookid
    this.chapterid = this.$route.query.chapterid
    console.log(this.bookid, this.chapterid)
    if (this.$route.query.chapterid) {
      this.getChapter()
    }
  },
  methods: {
    getChapter() {
      let params = {
        bookid: this.bookid,
        chapterid: this.chapterid
      }
      getChapterDetails(params).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.form = res.data
        }
      })
    },
    onAddSubmit() {
      this.form.book_id = this.bookid
      addChapterDetails(this.form).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '新增成功！',
            type: 'success'
          })
          this.$router.push(`/book/detail?id=${this.bookid}`)
        } else {
          this.$message.error('新增失败')
        }
      })
    },
    onSubmit() {
      upChapterDetails(this.form).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.$router.push(`/book/detail?id=${this.bookid}`)
        } else {
          this.$message.error('修改失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.book-container {
  margin: 30px;
}
.el-form {
  width: 80%;
  .form-item {
    width: 500px;
  }
}
</style>