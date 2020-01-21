<template>
  <div class="book-container" v-loading="listLoading">
    <el-table
      height="550"
      border
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="id"
        label="用户id">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="is_vip"
        label="vip">
        <template slot-scope="scope">
          <span v-if="scope.row.is_vip === 'N'">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="qq"
        label="QQ">
      </el-table-column>
      <el-table-column
        prop="logintime"
        label="最后登陆时间">
      </el-table-column>
      <el-table-column
        prop="head_portrait"
        label="头像"
        width="120">
        <template slot-scope="scope">
          <img class="showlogo" :src="'http://localhost:3000/upload'+scope.row.head_portrait" alt="" srcset="">
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
import { userInfoList } from '@/api/user'
import moment from 'moment'
export default {
  data() {
    return {
      name: '列表',
      tableData: [],
      pageSize: 3,
      pageNum: 1,
      listLoading: true,
      totalPage: 100
    }
  },
  created() {
    this.getUsersData()
  },
  methods: {
    handleClick(row) {
      let id = row.id
      this.$router.push(`/book/detail?id=${id}`)
    },
    getUsersData() {
      this.listLoading = true
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      userInfoList(data).then(res => {
        this.listLoading = false
        if (res.code === 0) {
          res.data.list.forEach(item => {
            item.logintime = moment(item.logintime).format('YYYY-MM-DD hh:mm:ss ')
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
    //分页
    handleCurrentChange: function(val) {
      this.pageNum = val
      this.getBookData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getBookData()
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
