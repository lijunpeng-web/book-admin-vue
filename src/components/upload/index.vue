<template>
  <el-upload
    class="avatar-uploader"
    action="http://localhost:3000/common/upload"
    :headers="headers"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headers: {
        Authorization: getToken()
      },
      imageUrl: '',
      imageName: ''
    }
  },
  watch: {
    imgUrl: function(newVal, oldVal) {
      this.imageUrl = newVal //newVal即是chartData
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.url
      this.imageName = res.data.name
      this.$emit('setImageUrl', res.data.name)
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
    }
  }
}
</script>

<style lang="scss" scoped>
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