<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过医院名称搜索,记得回车哦..."
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddEmpView">
            添加机构
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
          </transition>
          <el-table
            :data="orgs"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="selection"
              align="left">
            </el-table-column>
            <el-table-column
              prop="hospitalId"
              align="left"
              fixed
              label="医院ID">
            </el-table-column>
            <el-table-column
              prop="hospitalName"
              align="left"
              label="医院名称">
            </el-table-column>
            <el-table-column
              prop="contactName"
              align="left"
              label="联系人姓名">
            </el-table-column>
            <el-table-column
              prop="contactPhone"
              align="left"
              label="联系人电话">
            </el-table-column>
            <el-table-column
              align="left"
              label="创建日期">
              <template slot-scope="scope">{{ scope.row.createTime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteEmp(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="orgs.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyEmps">批量删除
            </el-button>
            <el-pagination
              background
              :page-size="10"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="org" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="医院名称:" prop="hospitalName">
                  <el-input prefix-icon="el-icon-edit" v-model="org.hospitalName" size="mini" style="width: 150px"
                            placeholder="请输入医院名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="联系人姓名:" prop="contactName">
                  <el-input prefix-icon="el-icon-edit" v-model="org.contactName" size="mini" style="width: 150px"
                            placeholder="请输入联系姓名"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="联系人电话:" prop="contactPhone">
                  <el-input prefix-icon="el-icon-edit" v-model="org.contactPhone" size="mini" style="width: 150px"
                            placeholder="请输入联系人电话"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt('addEmpForm')">取 消</el-button>
    <el-button size="mini" type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        orgs: [],
        keywords: '',
        beginDateScope: '',
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        dialogTitle: '',
        multipleSelection: [],
        depTextColor: '#c0c4cc',
        totalCount: -1,
        currentPage: 1,
        dialogVisible: false,
        tableLoading: false,
        showOrHidePop: false,
        showOrHidePop2: false,
        org: {
          hospitalId: '',
          hospitalName: '',
          contactName: '',
          contactPhone: '',
        },
        rules: {
          hospitalName: [{required: true, message: '必填:医院名称', trigger: 'blur'}],
          // contactName: [{required: true, message: '必填:联系人', trigger: 'blur'}],
          // contactPhone: [{required: true, message: '必填:联系人电话', trigger: 'change'}],
        }
      };
    },
    mounted: function () {
      this.initData();
      this.loadEmps();
    },
    methods: {
      cancelSearch() {
        this.advanceSearchViewVisible = false;
        this.emptyEmpData();
        this.beginDateScope = '';
        this.loadEmps();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteManyEmps() {
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = '';
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].id + ","
          }
          this.doDelete(ids)
        }).catch(() => {
        })
      },
      deleteEmp(row) {
        return this.$confirm('此操作将永久删除[' + row.hospitalId + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {
        })
      },
      doDelete(ids) {
        this.tableLoading = true
        var _this = this
        this.deleteRequest("/employee/basic/org/" + ids).then(resp=> {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.$message({type: data.status, message: data.msg});
            _this.loadEmps();
          }
        })
      },
      keywordsChange(val) {
        if (val == '') {
          this.loadEmps();
        }
      },
      searchEmp() {
        this.loadEmps();
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadEmps();
      },
      loadEmps() {
        const _this = this;
        this.tableLoading = true;
        // this.getRequest("/org/getOrg?page=" + this.currentPage + "&size=10&keywords=" + this.keywords + "&politicId=" + this.org.politicId + "&nationId=" + this.org.nationId + "&posId=" + this.org.posId + "&jobLevelId=" + this.org.jobLevelId + "&engageForm=" + this.org.engageForm + "&departmentId=" + this.org.departmentId + "&beginDateScope=" + this.beginDateScope).then(resp=> {
        this.getRequest("/org/getOrg?page=" + this.currentPage + "&size=10&keywords=" + this.keywords).then(resp=> {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            const data = resp.data;
            _this.orgs = data.hospitalList;
            _this.totalCount = data.count;
          }
        })
      },
      addEmp(formName) {
        const _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.org.hospitalId) {
              //更新
              this.tableLoading = true;
              this.putRequest("/org/saveOrg", this.org).then(resp=> {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  const data = resp.data;
                  _this.$message({type: data.status, message: data.msg});
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                }
              })
            } else {
              // 添加
              this.tableLoading = true;
              this.postRequest("/org/saveOrg", this.org).then(resp=> {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  const data = resp.data;
                  _this.$message({type: data.status, message: data.msg});
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                }
              })
            }

          } else {
            return false;
          }
        })
      },
      cancelEidt(addEmpForm) {
        this.dialogVisible = false
        // this.emptyEmpData();
        this.$refs[addEmpForm].resetFields()
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      showDepTree2() {
        this.showOrHidePop2 = !this.showOrHidePop2;
      },
      handleNodeClick(data) {
        this.org.departmentName = data.hospitalId;
        this.org.departmentId = data.id;
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      handleNodeClick2(data) {
        this.org.departmentName = data.hospitalId;
        this.org.departmentId = data.id;
        this.showOrHidePop2 = false;
        this.depTextColor = '#606266';
      },
      initData() {
        const _this = this
      },
      showEditEmpView(row) {
        console.log(row)
        this.dialogTitle = "编辑机构";
        this.org = row;
        this.org.hospitalName = row.hospitalName;
        // delete this.org.workAge;
        // delete this.org.notWorkDate;
        this.dialogVisible = true;
      },
      showAddEmpView() {
        this.dialogTitle = "添加机构";
        this.dialogVisible = true;
        const _this = this;
        // this.getRequest("/employee/basic/maxWorkID").then(resp=> {
        //   if (resp && resp.status == 200) {
        //     _this.org.workID = resp.data;
        //   }
        // })
      },
      emptyEmpData(){
        this.org = {
          hospitalId: '',
          hospitalName: '',
          contactName: '',
          contactPhone: '',
        }
      }
    }
  };
</script>
<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
