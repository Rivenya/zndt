<template>
  <div class="xztgl">
    <!-- 添加按钮 -->
    <div>
      <div v-if="id === 1"
           class='bt'>选择题</div>
      <div v-if="id === 2"
           class='bt'>填空题</div>
      <div v-if="id === 3"
           class='bt'>解答题</div>

      <button class="tj"
              @click="tianjia = true">添加</button>
      <div class="clear-float"></div>
    </div>
    <!-- 渲染出选择题 -->
    <ul>
      <li v-for="(val,key) in arr"
          :key='key'>
        <div class="list">
          <span class="spanxz">
            {{key + 1}}、 {{val.content.split(';')[0]}}
          </span>
          <!-- 按钮进行判断 -->
          <div v-if="id === 1">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       class="btn"
                       @click="xiugai(val.xzid)"></el-button>
            <el-button type="primary"
                       icon="el-icon-delete"
                       size="mini"
                       class="btn"
                       @click="shanchu(val.xzid)"></el-button>
          </div>
          <div v-if="id === 2">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       class="btn"
                       @click="xiugai(val.tkid)"></el-button>
            <el-button type="primary"
                       icon="el-icon-delete"
                       size="mini"
                       class="btn"
                       @click="shanchu(val.tkid)"></el-button>
          </div>
          <div v-if="id === 3">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       class="btn"
                       @click="xiugai(val.dtid)"></el-button>
            <el-button type="primary"
                       icon="el-icon-delete"
                       size="mini"
                       class="btn"
                       @click="shanchu(val.dtid)"></el-button>
          </div>
        </div>
        <div class="content">{{parseInt(val.qsId) === 1?val.content.split(';')[1] : "" }}</div>
        <div class="content"
             style="margin-top:1%;color:#e74c3c;">
          <span>答案:{{val.result}}</span>
          <span>难度:{{parseInt(val.difficult)=== 1 ? '简单' : parseInt(val.difficult)=== 2?'普通':parseInt(val.difficult)=== 3?"困难":""}}</span>
          <span>知识点:{{zsdZH(val.kledgeId)}}</span>
          <span>章节:{{zjZH(val.zhangjieId)}}</span>
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
    <el-dialog title="添加题目"
               :visible.sync="tianjia">
      <el-form :model="tjForm"
               ref="tjForm"
               :rules="rules">
        <el-form-item label="题目名称"
                      :label-width="formLabelWidth"
                      prop="content">
          <el-input v-model="tjForm.content"
                    autocomplete="off"
                    placeholder="问题;A:x B:x C:x D:x (如果不是选择题，直接输入就行)"></el-input>
        </el-form-item>
        <el-form-item label="答案"
                      :label-width="formLabelWidth"
                      prop="result">
          <el-input v-model="tjForm.result"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节名称"
                      :label-width="formLabelWidth"
                      prop="zj">
          <el-select v-model="tjForm.zj"
                     placeholder="请选择章节">
            <!------------ 章节通过for遍历出来 --------------->
            <el-option v-for="(val,key) in zhangjie"
                       :key="key"
                       :label="val.zhangjieName"
                       :value="parseInt(val.zhangjieId)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="知识点名称"
                      :label-width="formLabelWidth"
                      prop="zsd">
          <el-select v-model="tjForm.zsd"
                     placeholder="请选择知识点">
            <!------------ 知识点通过for遍历出来 --------------->
            <el-option v-for="(val,key) in zhishidian"
                       :key="key"
                       :label="val.kLedgeName"
                       :value="parseInt(val.kLedgeId)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度"
                      :label-width="formLabelWidth"
                      prop="difficult">
          <el-select v-model="tjForm.difficult"
                     placeholder="请选择难度">
            <el-option label="简单"
                       value="1"></el-option>
            <el-option label="一般"
                       value="2"></el-option>
            <el-option label="困难"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型"
                      :label-width="formLabelWidth"
                      prop="qsid">
          <el-select v-model="tjForm.qsid"
                     placeholder="请选择题型">
            <el-option label="选择题"
                       value="1"></el-option>
            <el-option label="填空题"
                       value="2"></el-option>
            <el-option label="解答题"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="resetForm('tjForm')">取 消</el-button>
        <el-button type="primary"
                   @click="insert('tjForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!------------------------ 修改的弹出框 ------------------------------>
    <el-dialog title="添加题目"
               :visible.sync="xiuG">
      <el-form :model="xiugaiForm"
               ref="xiugaiForm"
               :rules="rules">
        <el-form-item label="题目名称"
                      :label-width="formLabelWidth"
                      prop="content">
          <el-input v-model="xiugaiForm.content"
                    autocomplete="off"
                    placeholder="问题;A:x B:x C:x D:x (如果不是选择题，直接输入就行)"></el-input>
        </el-form-item>
        <el-form-item label="答案"
                      :label-width="formLabelWidth"
                      prop="result">
          <el-input v-model="xiugaiForm.result"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节名称"
                      :label-width="formLabelWidth"
                      prop="zj">
          <el-select v-model="xiugaiForm.zj"
                     placeholder="请选择章节">
            <!------------ 章节通过for遍历出来 --------------->
            <el-option v-for="(val,key) in zhangjie"
                       :key="key"
                       :label="val.zhangjieName"
                       :value="parseInt(val.zhangjieId)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="知识点名称"
                      :label-width="formLabelWidth"
                      prop="zsd">
          <el-select v-model="xiugaiForm.zsd"
                     placeholder="请选择知识点">
            <!------------ 知识点通过for遍历出来 --------------->
            <el-option v-for="(val,key) in zhishidian"
                       :key="key"
                       :label="val.kLedgeName"
                       :value="parseInt(val.kLedgeId)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度"
                      :label-width="formLabelWidth"
                      prop="difficult">
          <el-select v-model="xiugaiForm.difficult"
                     placeholder="请选择难度">
            <el-option label="简单"
                       value="1"></el-option>
            <el-option label="一般"
                       value="2"></el-option>
            <el-option label="困难"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型"
                      :label-width="formLabelWidth"
                      prop="qsid">
          <el-select v-model="xiugaiForm.qsid"
                     placeholder="请选择题型"
                     :disabled='true'>
            <el-option label="选择题"
                       value="1"></el-option>
            <el-option label="填空题"
                       value="2"></el-option>
            <el-option label="解答题"
                       value="3"></el-option>
          </el-select>
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
//1、组件先传值，2、接受传值，发送请求渲染数据 3、删除和修改也发生数据过去
export default {
  //组件传递过来的id，通过id查询出不同的题目
  props: ['id'],
  data () {
    return {
      //接受后台传递过来的所有数据
      arr: [],
      // 接受后台传过来的章节和知识点
      zhangjie: [],
      zhishidian: [],
      //每页显示多少数据
      page: 10,
      //每页的索引
      pageIndex: 1,
      //一共多少条数据,默认10条
      total: 10,
      //弹出的添加修改页面
      tianjia: false,
      //弹出的修改页面
      xiuG: false,
      //添加的数据表单
      tjForm: {
        //内容
        content: '',
        //章节id
        zj: '',
        //知识点id
        zsd: '',
        result: '',
        difficult: "",
        qsid: ''
      },
      //修改的数据表单
      xiugaiForm: {
        //内容
        content: '',
        //章节id
        zj: '',
        //知识点id
        zsd: '',
        result: '',
        difficult: "",
        qsid: '',
        zzz: ''
      },
      //弹出框的大小
      formLabelWidth: '140px',
      //表单验证的规则
      rules: {
        content: [{ required: true, message: '不能为空', trigger: 'blur' }],
        result: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zj: [{ required: true, message: '不能为空', trigger: 'change' }],
        zsd: [{ required: true, message: '不能为空', trigger: 'change' }],
        difficult: [{ required: true, message: '不能为空', trigger: 'change' }],
        qsid: [{ required: true, message: '不能为空', trigger: 'change' }],
      }
    }
  },
  methods: {
    // 页数改变触发事件
    pageChange (key) {
      //向后台请求数据
      this.$post("glyXR.php", { id: this.id, page: this.page, index: key }).then(
        res => {
          this.arr = []
          this.arr = res.data
        }
      )
      this.pageIndex = key
    },
    //添加题目
    insert (tjForm) {
      this.$refs[tjForm].validate(
        valid => {
          if (valid) {
            this.$post("glyInsert.php", {
              qsid: this.tjForm.qsid,
              kledgeId: this.tjForm.zsd,
              difficult: this.tjForm.difficult,
              content: this.tjForm.content,
              result: this.tjForm.result,
              zhangjieId: this.tjForm.zj            }).then(
              res => {
                if (res.data.errCode === 200) {
                  //向后台请求数据
                  this.$post("glyXR.php", { id: this.id, page: this.page, index: this.pageIndex }).then(
                    res => {
                      this.arr = res.data
                      this.total = parseInt(res.data[0].num)
                    }
                  )
                  this.$message(
                    {
                      message: "添加题目成功",
                      type: "success"
                    }
                  )
                  this.tianjia = false
                } else {
                  this.$message(
                    {
                      message: "添加题目失败",
                      type: "error"
                    }
                  )
                  this.tianjia = false
                }
              }
            )
          } else {
            return false
          }
        }
      )
    },
    //修改题目
    update (tjForm) {
      this.$refs[tjForm].validate(
        valid => {
          if (valid) {
            this.$get("glyInsert.php", {
              biaoji: "update",
              id: this.xiugaiForm.zzz,
              qsid: this.xiugaiForm.qsid,
              kledgeId: this.xiugaiForm.zsd,
              difficult: this.xiugaiForm.difficult,
              content: this.xiugaiForm.content,
              result: this.xiugaiForm.result,
              zhangjieId: this.xiugaiForm.zj            }).then(
              res => {
                if (res.data.errCode === 200) {
                  //向后台请求数据
                  this.$post("glyXR.php", { id: this.id, page: this.page, index: this.pageIndex }).then(
                    res => {
                      this.arr = res.data
                      this.total = parseInt(res.data[0].num)
                    }
                  )
                  this.$message(
                    {
                      message: "修改题目成功",
                      type: "success"
                    }
                  )
                  this.xiuG = false
                } else {
                  this.$message(
                    {
                      message: "修改题目失败",
                      type: "error"
                    }
                  )
                  this.xiuG = false
                }
              }
            )
          } else {
            return false
          }
        }
      )
    },
    //重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.tianjia = false
      this.xiuG = false
    },
    //修改题目 zzz是传递过来的Id
    xiugai (zzz) {
      this.arr.find((arr) => {
        if (arr.xzid) {
          if (arr.xzid === zzz) {
            this.xiugaiForm.content = arr.content
            this.xiugaiForm.result = arr.result
            this.xiugaiForm.zj = arr.zhangjieId
            this.xiugaiForm.zsd = arr.kledgeId
            this.xiugaiForm.qsid = arr.qsId
            this.xiugaiForm.difficult = arr.difficult
            this.xiugaiForm.zzz = zzz
          }
        } else if (arr.tkid) {
          if (arr.tkid === zzz) {
            this.xiugaiForm.content = arr.content
            this.xiugaiForm.result = arr.result
            this.xiugaiForm.zj = arr.zhangjieId
            this.xiugaiForm.zsd = arr.kledgeId
            this.xiugaiForm.qsid = arr.qsId
            this.xiugaiForm.difficult = arr.difficult
            this.xiugaiForm.zzz = zzz
          }
        } else if (arr.dtid) {
          if (arr.dtid === zzz) {
            this.xiugaiForm.content = arr.content
            this.xiugaiForm.result = arr.result
            this.xiugaiForm.zj = arr.zhangjieId
            this.xiugaiForm.zsd = arr.kledgeId
            this.xiugaiForm.qsid = arr.qsId
            this.xiugaiForm.difficult = arr.difficult
            this.xiugaiForm.zzz = zzz
          }
        }

      })
      this.xiuG = true
    },
    //删除题目
    shanchu (zzz) {
      this.$confirm('永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(
          () => {
            this.$get('glyInsert.php', { biaoji: "delete", txid: this.id, id: zzz }).then(
              res => {
                if (res.data.errCode === 200) {
                  //向后台请求数据
                  this.$post("glyXR.php", { id: this.id, page: this.page, index: this.pageIndex }).then(
                    res => {
                      this.arr = res.data
                      this.total = parseInt(res.data[0].num)
                    }
                  )
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  })
                }
              }
            )
          }
        )
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

    },
    //转换知识点
    zsdZH (num) {
      let zsd = ""
      this.zhishidian.find(
        function (zhishidian) {
          parseInt(zhishidian.kLedgeId) === parseInt(num) ? zsd = zhishidian.kLedgeName : ''
        }
      )
      return zsd
    },
    //转换章节
    zjZH (num) {
      let zsd = ""
      this.zhangjie.find(
        function (zhangjie) {
          parseInt(zhangjie.zhangjieId) === parseInt(num) ? zsd = zhangjie.zhangjieName : ''
        }
      )
      return zsd
    }
  },
  mounted () {
    //向后台请求数据
    this.$post("glyXR.php", { id: this.id, page: this.page, index: this.pageIndex }).then(
      res => {
        this.arr = res.data
        this.total = parseInt(res.data[0].num)
      }
    )
    this.$get('glyFilter.php').then(
      res => {
        this.zhangjie = res.data.zj
        this.zhishidian = res.data.zsd
      }
    )
  }
}
</script>
<style lang="scss">
.xztgl {
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
  //清除浮动
  .clear-float {
    clear: both;
  }
  //标题的样式
  .bt {
    float: left;
    font-size: 20px;
    color: #333;
  }
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
  //渲染列表的样式
  .list {
    display: flex;
    justify-content: space-between;
    .spanxz {
      display: block;
      margin-bottom: 2%;
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
  //渲染内容的样式
  .content {
    letter-spacing: 4px;
    color: #2c3e50;
    font-size: 14px;
    span {
      margin-right: 4%;
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
  //弹出框的按钮颜色
  .el-button--primary {
    background-color: #48c9b0;
    border-color: #48c9b0;
    &:hover {
      background-color: #2fe2bf;
      border-color: #2fe2bf;
    }
  }
}
</style>
