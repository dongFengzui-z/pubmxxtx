<template>
  <div class="pubmxxtx_sqdetail">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">申请信息</mt-tab-item>
      <mt-tab-item id="2">附件列表</mt-tab-item>
      <mt-tab-item id="3">流程信息</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell-group>
          <mt-field label="姓名:" v-model="detail.XM" readonly></mt-field>
          <mt-field label="学号:" v-model="detail.XH" readonly></mt-field>
          <mt-field label="学院名称:" v-model="detail.XY" readonly></mt-field>
          <mt-field label="班级名称:" v-model="detail.BJ" readonly></mt-field>
          <mt-field label="休学学年:" v-model="detail.XXXN_DISPLAY" readonly></mt-field>
          <mt-field label="休学学期:" v-model="detail.XXXQ_DISPLAY" readonly></mt-field>
          <mt-field label="本人电话:" v-model="detail.BRDH" readonly></mt-field>
          <mt-field label="父母姓名:" v-model="detail.FMXM" readonly></mt-field>
          <mt-field label="父母电话:" v-model="detail.FMDH" readonly></mt-field>
          <mt-field label="休学原因:" v-model="detail.XXYY_DISPLAY" readonly></mt-field>
          <mt-field label="申请时间:" v-model="detail.SQSJ" readonly></mt-field>
          <mt-field label="邮寄地址:" v-model="detail.YJDZ" readonly></mt-field>
          <mt-field label="院部确认学生成绩:" v-model="detail.XSCJ_DISPLAY" readonly></mt-field>
          <mt-field label="学籍卡是否打印留存:" v-model="detail.XJK_DISPLAY" readonly></mt-field>
          <mt-field label="备注:" v-model="detail.BZ" readonly type="textarea" rows="4"></mt-field>
        </mt-cell-group>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <p style="text-align:center;margin-top:50px;" v-if="this.fileToken=='null'">暂无附件</p>
        <div class="fjxz" v-else @click="downfujian(item)" v-for="(index,item) in fj" :key="index">
            <span class="fjmc">附件名称：{{ item.name }}</span>
            <span style="color:#52C7CA;font-size:12px;">点击下载查看</span>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
       <p style="text-align:center;margin-top:50px;" v-if="lclength=='0'">暂无流程</p>

       <mt-steps direction="vertical" v-else v-for="(item,index) in lc" :key="index">
    <mt-step :status= "item.type=='完成'||item.type=='终止'?'finish':(index==0?'finish':'')" >
        <h3>{{ item.name }}</h3>
        <p>{{ item.type}}</p>
        <p slot="left">{{ item.endTime }}</p>
    </mt-step>
</mt-steps>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Get, Post } from "../../utils";
import api from "../../api";
export default {
  data() {
    return {
      selected: "1",
      detail: {},
      host: "WEBPACK_CONFIG_HOST",
      fj:[],
       lclength:"",//流程长度
      lc:[],//流程
      fileToken:"",
    };
  },
  methods: {
    getDetail() {
      Get(api.queryDetailFormModel, {
        WID: this.$route.query.WID
      }).then(res => {
        // console.log(res)
        this.detail = res.datas.queryDetailFormModel.rows[0];
        // console.log(this.detail);
      });
    },
    getFJ(){
        Get(api.queryDetailFjModel,{
            WID:this.$route.query.WID
        }).then(res=>{
            // console.log(res.datas.queryDetailFjModel.rows[0])
            var url=
             WEBPACK_CONFIG_HOST +
                    "/sys/emapcomponent/file/getUploadedAttachment/" +
                    res.datas.queryDetailFjModel.rows[0].FJSC +
                    ".do";
            Get(url,{}).then(res=>{
                // console.log(res)
                 this.fjobj=res.items;
                this.fileToken=res.fileToken;
            });
        });
    },
    downfujian(item){
         if (
                BH_MIXIN_SDK.bh &&
                BH_MIXIN_SDK.bh.file &&
                BH_MIXIN_SDK.bh.file.filePreview
            ) {
                BH_MIXIN_SDK.bh.file.filePreview(
                    encodeURI(item.fileUrl),
                    item.name.split("."[1]),
                    item.name
                );
            } else {
                window.location.href =
                    "http://amptest.wisedu.com" + item.fileUrl;
            }
    },
     getLC() {
            Get(api.queryFlowState, {
                taskId: this.$route.query.TASKID,
                responseType: "JSON"
            }).then(res => {
             this.lclength=res.length
                this.lc=res
                console.log(this.lc)
            });
        }
  },
  created() {
    this.getDetail();
    this.getFJ();
    this.getLC();
  }
};
</script>

<style>
.fjmc{
    font-size:14px;
    display: inline-block;
    margin-top:2px;
    width:70%
}
.fjxz{
    margin: 12px;
}
</style>