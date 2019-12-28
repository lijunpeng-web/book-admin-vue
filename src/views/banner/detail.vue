<template>
  <div class="book-container" v-loading="listLoading">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="上架">
        <el-switch
          v-model="form.is_display"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="Y"
          inactive-value="N">
        </el-switch>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="封面">
        <my-upload @setImageUrl="setImageUrl" :imgUrl="imageUrl"></my-upload>
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
import { updateBanner, getBannerDetails } from '@/api/banner'
import myUpload from '@/components/upload'
export default {
  components: {
    myUpload
  },
  data() {
    return {
      form: {
        name: '',
        is_display: 'Y',
        date: []
      },
      imageName: '',
      imageUrl: '',
      bannerid: '',
      listLoading: false
    }
  },
  created() {
    console.log(this.$route.query.id)
    this.bannerid = this.$route.query.id
    this.getBanner()
  },
  methods: {
    getBanner() {
      let data = {
        id: this.bannerid
      }
      this.listLoading = true
      getBannerDetails(data).then(res => {
        console.log(res)
        this.listLoading = false
        if (res.code === 0) {
          this.form = res.data
          this.form.date = [res.data.start_time, res.data.end_time]
          this.imageUrl = `http://localhost:3000/upload` + res.data.banner_img
        }
      })
    },
    setImageUrl(name) {
      console.log(name)
      this.imageName = name
    },
    onSubmit() {
      let data = this.form
      data.banner_img = this.imageName
      data.start_time = data.date[0]
      data.end_time = data.date[1]
      console.log(data)
      this.listLoading = true
      updateBanner(data).then(res => {
        console.log(res)
        this.listLoading = false
        if (res.code === 0) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.$router.push('/banner/list')
        }
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
</style>
