<template>
  <div class="zjgly">
    <!-- 添加按钮 -->
    <div>
      <button class="tj"
              @click="tianjia = true">添加</button>
      <div class="clear-float"></div>
    </div>
    <!-- 渲染列表 -->
    <ul>
      <li v-for="(val,key) in arr"
          :key="key">
        <div class="list">
          <span class="spanxz">
            {{key+1}}、{{val.kLedgeName}}
          </span>
          <!-- 按钮进行判断 -->
          <div>
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       class="btn"
                       @click="xiugai(val.kLedgeId)"></el-button>
            <el-button type="primary"
                       icon="el-icon-delete"
                       size="mini"
                       class="btn"
                       @click="shanchu(val.kLedgeId)"></el-button>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页 -->
    <div class="page">
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="page"
                     @current-change="pageChange">
      </el-pagination>
    </div>

    <!-- 添加的弹出框 -->
    <el-dialog title="添加知识点"
               :visible.sync="tianjia">
      <el-form :model="tjForm"
               ref="tjForm"
               :rules="rules">
        <el-form-item label="知识点名称"
                      :label-width="formLabelWidth"
                      prop="content">
          <el-input v-model="tjForm.content"
                    autocomplete="off"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="resetForm('tjForm')">取 消</el-button>
        <el-button type="primary"
                   @click="insert('tjForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改的弹出框 -->
    <el-dialog title="添加章节"
               :visible.sync="xiuG">
      <el-form :model="xiugaiForm"
               ref="xiugaiForm"
               :rules="rules">
        <el-form-item label="章节名称"
                      :label-width="formLabelWidth"
                      prop="content">
          <el-input v-model="xiugaiForm.content"
                    autocomplete="off"
                    placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="resetForm('xiugaiForm')">取 消</el-button>
        <el-button type="primary"
                   @click="update('xiugaiForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 装知识点的数组
      arr: '',
      // 添加和修改弹出的变量
      tianjia: false,
      xiuG: false,
      //分页的总数和分的页面的数据,和当前页面的索引
      total: 10,
      page: 3,
      pageIndex: 1,
      //修改的表单
      xiugaiForm: {
        content: "",
        id: ""
      },
      //添加的表单
      tjForm: {
        content: ""
      },
      //表单验证的规则
      rules: {
        content: [{ required: true, message: '不能为空', trigger: 'blur' }],
      },
      //弹出框的大小
      formLabelWidth: '140px',
    }
  },
  methods: {
    //改变页面触发的事件
    pageChange (key) {
      //发送请求获取数据
      this.$get('glyZSD.php', { page: this.page, index: key }).then(
        res => {
          // 查询的数据一共多少条，添加进total,分页的总数据
          this.total = parseInt(res.data[0].num)
          // 查询出来的所有数据添加进数组arr
          this.arr = res.data
        }
      )
      this.pageIndex = key
    },
    //删除按钮触发的事件
    shanchu (id) {
      this.$confirm('此操作将永久删除该知识点和与此有关的试题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('glyZSD.php', { token: 'delete', id: id }).then(
          res => {
            if (res.data.errCode === 200) {
              //发送请求获取数据
              this.$get('glyZSD.php', { page: this.page, index: this.pageIndex }).then(
                res => {
                  // 查询的数据一共多少条，添加进total,分页的总数据
                  this.total = parseInt(res.data[0].num)
                  // 查询出来的所有数据添加进数组arr
                  this.arr = res.data
                }
              )
              this.$message({
                message: "删除成功",
                type: "success"
              })
            } else (
              this.$message({
                message: "删除失败",
                type: "error"
              })
            )
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //取消按钮触发的事件
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.tianjia = false
      this.xiuG = false
    },
    //添加按钮触发的事件
    insert (tjBtn) {
      this.$refs[tjBtn].validate(
        valid => {
          if (valid) {
            this.$post('glyZSD.php', { token: 'insert', content: this.tjForm.content }).then(
              res => {
                if (res.data.errCode === 200) {
                  //发送请求获取数据
                  this.$get('glyZSD.php', { page: this.page, index: this.pageIndex }).then(
                    res => {
                      // 查询的数据一共多少条，添加进total,分页的总数据
                      this.total = parseInt(res.data[0].num)
                      // 查询出来的所有数据添加进数组arr
                      this.arr = res.data
                    }
                  )
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  })
                  this.tianjia = false
                } else (
                  this.$message({
                    message: "添加成功",
                    type: "error"
                  })
                )
              }
            )
          } else {
            return false
          }
        }
      )
    },
    //修改按钮触发的事件
    xiugai (id) {
      this.xiuG = true
      this.arr.find((arr) => {
        if (parseInt(arr.kLedgeId) === parseInt(id)) {
          this.xiugaiForm.content = arr.kLedgeName
          this.xiugaiForm.id = arr.kLedgeId
        }
      })
    },
    //修改按钮确定触发的事件
    update (xgBtn) {
      this.$refs[xgBtn].validate(
        valid => {
          if (valid) {
            this.$post('glyZSD.php', { token: 'update', content: this.xiugaiForm.content, id: this.xiugaiForm.id }).then(
              res => {
                if (res.data.errCode === 200) {
                  //发送请求获取数据
                  this.$get('glyZSD.php', { page: this.page, index: this.pageIndex }).then(
                    res => {
                      // 查询的数据一共多少条，添加进total,分页的总数据
                      this.total = parseInt(res.data[0].num)
                      // 查询出来的所有数据添加进数组arr
                      this.arr = res.data
                    }
                  )
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  })
                  this.xiuG = false
                } else (
                  this.$message({
                    message: "修改失败",
                    type: "error"
                  })
                )
              }
            )
          } else {
            return false
          }
        }
      )
    }
  },
  mounted () {
    //发送请求获取数据
    this.$get('glyZSD.php', { page: this.page, index: this.pageIndex }).then(
      res => {
        // 查询的数据一共多少条，添加进total,分页的总数据
        this.total = parseInt(res.data[0].num)
        // 查询出来的所有数据添加进数组arr
        this.arr = res.data
      }
    )
  },
}
</script>
<style lang="scss">
.zjgly {
  //添加按钮的样式
  .tj {
    width: 120px;
    height: 30px;
    background-color: white;
    border: 1px solid #95a5a6;
    border-radius: 4px;
    color: #48c9b0;
    outline: none;
    cursor: pointer;
    float: right;
    &:hover {
      background-color: #48c9b0;
      color: white;
      border: 1px solid white;
    }
  }
  //清除添加按钮的浮动
  .clear-float {
    clear: both;
  }
  //渲染列表的样式
  ul {
    padding: 0px;
    color: #333;
    margin-top: 1%;
  }
  //渲染列表的样式
  li {
    list-style: none;
    padding: 20px 0 20px 20px;
    border: 1px solid #f6f6f6;
    border-radius: 6px;
    &:hover {
      border-color: #48c9b0;
    }
  }
  //渲染列表的样式
  .list {
    display: flex;
    justify-content: space-between;
    .spanxz {
      display: block;
      letter-spacing: 1px;
      color: #2c3e50;
      font-size: 14px;
    }
    .btn {
      background-color: #48c9b0;
      border-color: #48c9b0;
      &:hover {
        background-color: #2fe2bf;
        border-color: #2fe2bf;
      }
      &:focus {
        background-color: #2fe2bf;
        border-color: #2fe2bf;
      }
    }
  }
  //分页的样式
  .page {
    ul {
      margin: 0;
    }
    .el-pagination {
      margin: 0 auto;
      width: 40%;
    }
  }
}
</style>
