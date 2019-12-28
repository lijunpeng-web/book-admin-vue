<template>
  <div class="book-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.bookname"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.sortid" placeholder="请选择类型">
          <el-option label="玄幻" value="1"></el-option>
          <el-option label="言情" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上架">
        <el-switch v-model="form.type"></el-switch>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/book/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="form.descs"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <img src="http://localhost:3000/public/upload/1577168729064.png" alt="" srcset=""> -->
  </div>
</template>


<script>
import { addBook, getBookDetails, updataBookDetails } from '@/api/book'
export default {
  data() {
    return {
      form: {
        bookname: '',
        sortid: '',
        type: true,
        descs: '',
        author: ''
      },
      imageUrl: '',
      imageName: '',
      bookid: ''
    }
  },
  created() {
    console.log(this.$route.query.id)
    this.bookid = this.$route.query.id
    this.getBook()
  },
  methods: {
    getBook() {
      let data = {
        id: this.bookid
      }
      getBookDetails(data).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.form = res.data
          this.form.sortid = res.data.sortid.toString()
          if (res.data.type) {
            this.form.type = true
          } else {
            this.form.type = false
          }
          this.imageUrl = `http://localhost:3000//upload` + res.data.images
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.url
      this.imageName = res.data.name
      console.log(res)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit() {
      let data = this.form
      data.imageName = this.imageName
      updataBookDetails(data).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.book {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
