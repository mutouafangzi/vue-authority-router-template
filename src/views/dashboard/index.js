//引入拖拽
//import VueGridLayout from 'vue-grid-layout'
//let GridLayout = VueGridLayout.GridLayout
//let GridItem = VueGridLayout.GridItem
import { mapGetters } from 'vuex'
//import oPanel from '@/components/panel/panel.vue'
import html2Canvas from "html2canvas" 
import JsPDF from "jspdf" 

/* require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js'); */
require('@/vendor/toPDF/pdfmake.min.js')
require("@/vendor/toPDF/vfs_fonts.js")
/* import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; */
//pdfMake.vfs = pdfFonts.pdfMake.vfs;


export default {
  name: 'dashboard',
  data () {
    return {
      completenum : 0,
      totalnum : 0,
      imgdata : [],
      emptyobj : {},
      oncomplete : function(){},
      getDataURL : function(){},

      // 下拉列表
      // 新增表单数据
      addReportForm: {
        // 报表名称
        reportName: '', // 报表名称
        execTime: '', // 首次执行时间代表1，按时间点代表2
        timePoint: '', // 时间点
        reportDownType: ['pdf', 'html'], // 报表格式
        dataRegion: '', // 报表数据范围
        customDataRegion: '',
        reportTemplete: ''// 报表模板
      },
      // 下拉选择标志
      addChangeFlag: false,
      // 报表数据范围下来列表
      addDataRegionList: [
        {
          'value': '1',
          'label': '最近1天'
        },
        {
          'value': '7',
          'label': '最近7天'
        },
        {
          'value': '14',
          'label': '最近14天'
        },
        {
          'value': '30',
          'label': '最近30天'
        },
        {
          'value': '0',
          'label': '自定义'
        }
      ],
      // 数据范围的下拉列表显示与否
      addSelectWrapVisible: false,
      // 点击的选项
      addClickSelectText: '',
      // 点击的value
      addClickSelectValue: '',
    }
  },
  methods:{
    /* 使用JsPDF+HTML2CANVAS点击下载事件 */
    userJspdfDownLoad(){
      var title = 'this.htmlTitle'  
      let PDF = new JsPDF('', 'pt', 'a4') 
      for(let i=0;i<=2;i++){
        html2Canvas(document.getElementsByClassName('imgArea')[0], { 
        //允许跨域 
          allowTaint: true  
        }).then(function (canvas) {
          //转换成canvas后图片的宽度  
          let contentWidth = canvas.width  
          //转换成canvas后图片的高度
          let contentHeight = canvas.height  
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 592.28 * 841.89  
          //未生成pdf的html页面高度
          let leftHeight = contentHeight  
          //页面偏移
          let position = 0  
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28  
          let imgHeight = 592.28 / contentWidth * contentHeight  
          let pageData = canvas.toDataURL('image/jpeg', 1.0)  
          
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {  
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)  
          } else {  
            while (leftHeight > 0) {  
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)  
              leftHeight -= pageHeight  
              position -= 841.89  
              if (leftHeight > 0) {  
                PDF.addPage()  
              }  
            }  
          }
          PDF.save(title + '.pdf')
        })
        
      }
      
      
    },
    /* 使用PDFmake点击下载事件 */
    userPdfmakeDownLoad(){
      console.log(pdfMake,pdfMake.vfs)
      //中英文字体转换
        pdfMake.fonts = {
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-Italic.ttf'
            },
            微软雅黑: {
                normal: 'msyh.ttf',
                bold: 'msyh.ttf',
                italics: 'msyh.ttf',
                bolditalics: 'msyh.ttf',
            }
        };
      var imgs = new Array();
      var canvas = $("#barChart").find("canvas").first()[0];;
      console.log(canvas)
      imgs.push(canvas.toDataURL('image/jpeg', 1.0))
      
      var dd = {
        // 页眉
        header: function (currentPage, pageCount, pageSize) {
          // you can apply any logic and return any valid pdfmake element
          console.log('Lifang', currentPage, pageCount, pageSize)
          return [
            /* { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' }, */
            { text: '页眉', alignment: 'center', margin: [10, 20]},
            { canvas: [
              {
                type: 'rect',
                x: pageSize.width / 2 - 120,
                y: 0,
                w: 240,
                h: 4,
                r: 5,
                lineWidth: 2,
                lineColor: 'blue'
              }
            ],
            margin: [0, 0]
            }

          ]
        },
        // 页脚
        footer: function (currentPage, pageCount) {
          return [{
            columns: [
              { text: '', alignment: 'left'},
              { text: '360企业安全', alignment: 'center'},
              { text: `共${pageCount}页 第${currentPage}页`, alignment: 'right', margin: [0, 5]}
            ]
          }]
        },
        // 页面尺寸方向和边缘
        // a string or { width: number, height: number }
        pageSize: 'A4',

        // by default we use portrait, you can change it to landscape if you wish
        // pageOrientation: 'landscape',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 40, 60, 40, 60 ],
        /* background: function(currentPage, pageSize) {
         return `page ${currentPage} with size 100 x 100`
         }, */
        // 页面内容
        content: [
          /* {
            // if you specify both width and height - image will be stretched
            image: imgs,
            //style: 'canvasImg'
            width: canvas.width/2,
            height: canvas.height/2,
            margin: [15, 15]
          }, */
          '中英文测试',
          'Another paragraph, least two lines',
          // 第一张大图片
          {
            image: 'sampleImage.jpg'
          },
          // 第二张小图片
          'If you specify width, image will scale proportionally',
          {
            image: 'sampleImage.jpg',
            width: 150
          },
          'If you specify both width and height - image will be stretched',
          'Hello word',
          // 样式one的文本
          {
            text: 'Hello word',
            style: 'one'
          },
          // 换行文本
          {
            text: 'Hello \nword'
          },
          // 分隔符
          {
            columns: [
              {
                width: 90,
                text: '你好世界-分割1'
              },
              {
                width: '*',
                text: '你好世界-分割2'
              },
              {
                columns: [
                  {text: 'Hello word'},
                  {text: '你好世界-分割3', fontSize: 20}
                ]
              }
            ]
          },
          // 表格
          {
            table: {
              body: [
                ['word1', 'word2', 'word3', 'word4'],
                [{text: 'word', colSpan: 2}, '', '', {text: 'word', rowSpan: 3}],
                [{text: 'word', colSpan: 2, rowSpan: 2}, '', 'word', ''],
                ['', '', 'word', '']
              ]
            }
          },
          // 有序列表
          {
            ol: [
              'Hello word ol1',
              '你好世界 ol1',
              // 无序列表
              {
                ul: [
                  'Hello word',
                  '你好世界'
                ]
              },
              'Hello word'
            ]
          },
          // 居中文本
          {
            // margin:[left,up,right,down]
            text: 'Hello-word-你好世界',
            margin: [100, 100, 100, 100]
          }
        ],
        // 样式one
        styles: {
          one: {
            fontSize: 24,
            alignment: 'center'
          },
          canvasImg: {

          }
        },
        defaultStyle: {
          font: '微软雅黑'
        }
      }
      pdfMake.createPdf(dd).open();
      //图片格式转换
        /* var x = this.ImageDataURL(["./人生3.jpg","./人生3.jpg","./人生3.jpg"]);
        x.oncomplete = function () {
            var imgs = new Array();
            for (let key in this.imgdata) {
                if (this.imgdata[key] == this.emptyobj) {
                    imgs.push({text: '请上传头像', fontSize: 10, rowSpan: 3});
                    continue;
                }//不存在的圖片直接忽略
                imgs.push({image: this.imgdata[key], fit: [100, 150], rowSpan: 3});//在的圖片直接忽略
            }
            var content = {
                content: [
                    {text: '学生档案', fontSize: 22, style: 'subheader', color: '#36B7AB', alignment: 'center'},
                    {text: '基本信息', fontSize: 15, style: 'subheader', color: '#36B7AB'},
                    {
                        style: 'tableExample',
                        table: {
                            widths: [100, 60, 55, '*', '*', '*', 100],
                            body: [
                                [{text: '学号：123456789123', fontSize: 8, margin: [0, 11, 0, 11]},
                                    {text: '姓名：张三', fontSize: 8, margin: [0, 11, 0, 11]},
                                    {text: '性别：男', fontSize: 8, margin: [0, 11, 0, 11]},
                                    {text: '民族：回族', fontSize: 8, colSpan: 2, margin: [0, 11, 0, 11]}, {},
                                    {text: '婚否：是', fontSize: 8, margin: [0, 11, 0, 11]},
                                    imgs[0]],
                                [{text: '身份证号：654125321453625478', fontSize: 8, colSpan: 2, margin: [0, 11, 0, 11]}, {},
                                    {text: '出生日期：1881-12-31', fontSize: 8, colSpan: 2, margin: [0, 11, 0, 11]}, {},
                                    {text: '入学前文化程度：高中', fontSize: 8, colSpan: 2, margin: [0, 11, 0, 11]}, {}],
                                [{text: '邮箱：23412341234@qq.com', fontSize: 8, colSpan: 2, margin: [0, 11, 0, 11]}, {},
                                    {text: '联系方式：123-4124-1243', fontSize: 8, colSpan: 2, margin: [0, 11, 0, 11]}, {},
                                    {text: 'QQ：23412341234', fontSize: 8, colSpan: 2, margin: [0, 11, 0, 11]}, {}],
                             //省略内容
                            ]
                        }
                    },],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                    }
                },
                defaultStyle: {
                    font: '微软雅黑'
                }
            }
            pdfmake.createPdf(content).download;
        } */
    },
    /* ImageDataURL:function (urls) {//urls必須是字符串或字符串數組
        
        this.oncomplete = function(){};
        this.getDataURL = function(url, index) {
            var c = document.createElement("canvas");
            var cxt = c.getContext("2d");
            var img = new Image();
            var dataurl;
            var p;
            p = this;
            img.src = url;
            img.onload = function() {
                var i;
                var maxwidth = 500;
                var scale = 1.0;
                if (img.width > maxwidth) {
                    scale = maxwidth / img.width;
                    c.width = maxwidth;
                    c.height = Math.floor(img.height * scale);
                } else {
                    c.width= img.width;
                    c.height= img.height;
                }
                cxt.drawImage(img, 0, 0, c.width, c.height);

                p.imgdata[index] = c.toDataURL('image/jpeg');
                for (let i = 0; i < p.totalnum; ++i) {
                    if (p.imgdata[i] == null)break;
                }
                if (i == p.totalnum) {
                    p.oncomplete();
                }
            };
            img.onerror = function() {
                p.imgdata[index] = p.emptyobj;
                for (let i = 0; i < p.totalnum; ++i) {
                    if (p.imgdata[i] == null)break;
                }
                if (i == p.totalnum) {
                    p.oncomplete();
                }
            };
        }
        if (urls instanceof Array) {
            this.totalnum = urls.length;
            this.imgdata = new Array(this.totalnum);
            for (let key in urls) {
                this.getDataURL(urls[key], key);
            }
        } else {
            this.imgdata = new Array(1);
            this.totalnum = 1;
            this.getDataURL(urls, 0);
        }
    }, */
      
    /* 绘制图表 */
    drawBar(){
        // 基于准备好的dom，初始化echarts实例
        let barChart = this.$echarts.init(document.getElementById('barChart'))
        // 绘制图表
        barChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
    drawPie(){
      // 基于准备好的dom，初始化echarts实例
        let pieChart = this.$echarts.init(document.getElementById('pieChart'))
        // 绘制图表
        pieChart.setOption(
          {
            title : {
              text: '某站点用户访问来源',
              subtext: '纯属虚构',
              x:'center',
              padding: 0,
            },
            backgroundColor: 'rgb(255,242,204)', //rgba设置透明度0.1
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
              ]
          });
    },
    drawLine(){
      let lineChart = this.$echarts.init(document.getElementById('lineChart'))
      //绘制折线图
      lineChart.setOption({
        title: {
            text: '堆叠区域图',
            textStyle:{
              verticalAlign: 'top'
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
      })
    },

    // 下拉列表
    // 新增弹窗的方法
    // 新增弹窗的，数据范围的input框被点击时
    addInputClick () {
      console.log('点击')
      this.addSelectWrapVisible = !this.addSelectWrapVisible
    },
    // 新增弹窗的，数据范围的下拉列表被点击时
    addClickList (item, index) {
      if (item.value !== '0') {
        console.log(item.label)
        this.addSelectWrapVisible = false
        this.addClickSelectText = item.label
        this.addReportForm.dataRegion = item.value
      } else {
        this.addReportForm.dataRegion = item.value
      }
    },
    // 新增弹窗的，时间选择器
    addChangeDataTime (time) {
      if (!this.addReportForm.customDataRegion) {
        // console.log('没有时间')
        this.$message({
          showClose: true,
          message: '自定义下，请选择时间段哦~~',
          type: 'warning'
        })
      } else {
        console.log(time, this.addReportForm.customDataRegion)
        let startTime = new Date(parseInt(this.addReportForm.customDataRegion[0])).toLocaleString().substr(0, 17)
        let endTime = new Date(parseInt(this.addReportForm.customDataRegion[1])).toLocaleString().replace(/:\d{1,2}$/, ' ')
        this.addClickSelectText = `从 ${startTime} 到 ${endTime}`
        this.addSelectWrapVisible = false
      }
      /* this.addReportForm.customDataRegion = time.pickerVal
      if (time.picker.length === 2) {
        this.addClickSelectText = `从 ${time.picker[0]} 到 ${time.picker[1]}`
      } else {
        this.addClickSelectText = `${time.picker[0]}`
      }
      this.addSelectWrapVisible = false */
    }
  },
  mounted () {
    this.drawBar();
    this.drawPie();
    this.drawLine()
  },

  components: {
    //oPanel,
    //GridLayout,
    //GridItem,
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
