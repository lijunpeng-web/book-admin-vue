<template>
  <div class="book-container" v-loading="listLoading">
    <el-table
      height="550"
      border
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="banner_img"
        label="封面"
        width="120">
        <template slot-scope="scope">
          <img class="showlogo" :src="'http://localhost:3000/upload'+scope.row.banner_img" alt="" srcset="">
        </template>
      </el-table-column>
      <el-table-column
        prop="is_display"
        label="上架">
        <template slot-scope="scope">
          <el-switch
            @change="change(scope.$index,scope.row)"
            v-model="scope.row.is_display"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="Y"
            inactive-value="N">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="success" plain @click="handleClick(scope.row)" size="small">编辑</el-button>
          <!-- <el-button type="danger" plain size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="pageNum"
      :total="totalPage">
    </el-pagination>
  </div>
</template>
<script>
import { getBannerList, updateIsDisplay } from '@/api/banner'
export default {
  data() {
    return {
      name: '列表',
      tableData: [],
      pageSize: 2,
      pageNum: 1,
      listLoading: true,
      totalPage: 100
    }
  },
  created() {
    this.getBannerData()
  },
  methods: {
    handleClick(row) {
      let id = row.id
      this.$router.push(`/banner/detail?id=${id}`)
    },
    getBannerData() {
      this.listLoading = true
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      getBannerList(data).then(res => {
        this.listLoading = false
        if (res.code === 0) {
          res.data.list.forEach(item => {
            item.start_time = this.$moment(item.start_time).format('YYYY-MM-DD hh:mm:ss ')
            item.end_time = this.$moment(item.end_time).format('YYYY-MM-DD  hh:mm:ss ')
          })
          this.tableData = res.data.list
          this.totalPage = res.data.total
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    change(index, row) {
      let data = {
        id: row.id,
        is_display: row.is_display
      }
      console.log(data)
      updateIsDisplay(data).then(res => {
        console.log(res)
        this.getBannerData()
      })
    },
    //分页
    handleCurrentChange: function(val) {
      this.pageNum = val
      this.getBannerData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getBannerData()
      // console.log(`每页 ${val} 条`);
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

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.showlogo {
  width: 100px;
}
</style>
