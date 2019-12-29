<template>
  <div class="book-container" v-loading="listLoading">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.bookname"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.sortid" placeholder="请选择类型">
          <el-option v-for="(item,index) in sortData" :key="index" :label="item.sortname" :value="item.id"></el-option>
        </el-select>
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
      <el-form-item label="是否免费">
        <el-select v-model="form.is_free" placeholder="请选择类型">
          <el-option label="免费" value="Y"></el-option>
          <el-option label="付费" value="N"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" v-if="form.is_free === 'N'">
        <el-input type="number" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="vip价格" v-if="form.is_free === 'N'">
        <el-input type="number" v-model="form.vip_price"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <my-upload @setImageUrl="setImageUrl"></my-upload>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="btnLoading">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!-- <img src="http://localhost:3000/public/upload/1577168729064.png" alt="" srcset=""> -->
  </div>
</template>


<script>
import { addBook, getSortType } from '@/api/book'
import { getToken } from '@/utils/auth'
import myUpload from '@/components/upload'

export default {
  components: {
    myUpload
  },
  data() {
    return {
      form: {
        bookname: '',
        sortid: '',
        is_display: 'Y',
        description: '',
        author: '',
        price: '',
        is_free: 'N',
        vip_price: ''
      },
      sortData: [],
      imageName: '',
      listLoading: false,
      btnLoading: false
    }
  },
  created() {
    this.getSort()
  },
  methods: {
    getSort() {
      getSortType().then(res => {
        if (res.code === 0) {
          this.sortData = res.data
        }
      })
    },
    setImageUrl(name) {
      console.log(name)
      this.imageName = name
    },
    onSubmit() {
      this.listLoading = true
      this.btnLoading = true
      let data = this.form
      data.imageName = this.imageName
      addBook(data).then(res => {
        this.listLoading = false
        this.btnLoading = false
        console.log(res)
        if (res.code === 0) {
          this.$message({
            message: '新增成功！',
            type: 'success'
          })
          this.$router.push('/book/list')
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
