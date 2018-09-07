<template>
  <div class="dashboard-container">
    <el-form
      prop="addReportForm"
      label-width="100px"
      :model="addReportForm"
      ref="addReportForm"
      status-icon>
      <el-form-item label="报表数据范围" prop="dataRegion">
          <div @click="addInputClick">
            <el-input
              v-model="addClickSelectText"
              placeholder="请选择数据范围"
              readonly>
            </el-input>
          </div>
          <!--数据范围的下拉列表-->
          <div class="select-out-wrap" v-if="addSelectWrapVisible">
            <ul style="padding: 0px 15px;">
              <li
                style="height: 32px;line-height: 32px;cursor: pointer;"
                v-for="(item,index) in addDataRegionList"
                v-on:click="addClickList(item, index)"
                :key="index"
                :value="item.value">{{ item.label }}</li>
              <div v-if="addReportForm.dataRegion == '0'" class="dataRegion-wrap">
                <el-date-picker
                  v-model="addReportForm.customDataRegion"
                  @change="addChangeDataTime"
                  :clearable = true
                  type="datetimerange"
                  value-format="timestamp"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </ul>
          </div>
        </el-form-item>
    </el-form>
    <div id="download-container">
      
      <div style="width:300px;height:300px;background: yellow;padding:50px;margin-right:20px;display:inline-block;" class="imgArea">
        <div id="barChart" :style="{width: '300px', height: '300px'}"  class="imgArea"></div>
        <span class="fontArea">这是一个柱状图，关于一个服装的</span>
      </div>
      <div style="width:300px;height:300px;margin-right:20px;display:inline-block;">
        <div id="pieChart" style="width:300px; height:300px"></div>
        <span class="fontArea">这是一个饼图，关于数据来源的</span>
      </div>
      <div style="width:300px;height:300px;background: yellow;padding:50px;margin-right:20px;display:inline-block;">
        <div id="lineChart" :style="{width: '300px', height: '300px'}"  class="imgArea"></div>
        <span class="fontArea">这是一个折先图，退碟区域的</span>
      </div>
    </div>
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    
    <!-- 操作按钮 -->
    <div>
      <el-button type="primary" @click="userJspdfDownLoad">JsPDF+HTML2CANVAS</el-button>
      <el-button type="primary" @click="userPdfmakeDownLoad">PDFmake</el-button>
    </div>
  </div>
</template>