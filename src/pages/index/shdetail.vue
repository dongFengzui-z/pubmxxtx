<template>
  <div class="pubmxxtx_shdetail">
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
        </mt-cell-group>
        <div class="title">
            <span style="color:red">*</span>&nbsp;院部确认学生成绩
        </div>
        <mt-box-group v-model="value">
                    <mt-cell-group>
                        <mt-radiobox :name="item.value" v-for="item in options" :key="item.value"
                            :disabled="item.disabled"
                            @radiobox-click="blank"
                            required
                        >{{item.label}}</mt-radiobox>
                    </mt-cell-group>
        </mt-box-group>
         <div class="title">
            <span style="color:red">*</span>&nbsp;学籍卡是否打印留存
        </div>
        <mt-box-group v-model="value1">
                    <mt-cell-group>
                        <mt-radiobox :name="item.value" v-for="item in options1" :key="item.value"
                            :disabled="item.disabled"
                            @radiobox-click="blank1"
                            required
                        >{{item.label}}</mt-radiobox>
                    </mt-cell-group>
        </mt-box-group>
         <mt-cell-group>
                    <mt-field label="备注" v-model="BZ" placeholder="请填写备注" type="textarea" rows="4"></mt-field>
                    <mt-field
                        label="审核意见"
                        v-model="SHYJ"
                        placeholder="请填写审核意见"
                        required
                        type="textarea"
                        rows="4"
                    ></mt-field>
                    <div class="bh-clearfix cell">
                        <div class="fj">审核附件：</div>
                        <emapm-upload-imgs
                            :host="host"
                            :host-pathname="hostPathname"
                            :read-only="false"
                            :token="token"
                            :size="1000000"
                            :max-number="5"
                            @on-token-change="onTokenChange"
                        ></emapm-upload-imgs>
                    </div>
                </mt-cell-group>
                <div style="heigth:50px"></div>
                <div class="btngroup">
                    <mt-button type="default" class="btn1"  size="large" @click="pass(zt1)">不通过</mt-button>
                    <mt-button class="btn" type="primary" size="large" @click="pass(zt2)">通过</mt-button>
                </div>
                
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <p style="text-align:center;margin-top:50px;" v-if="this.fileToken=='null'">暂无附件</p>
        <div class="fjxz" v-else @click="downfujian(item)" v-for="(index,item) in fjobj" :key="index">
            <span class="fjmc">附件名称：{{ item.name }}</span>
            <span style="color:#52C7CA;font-size:12px;">点击下载查看</span>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <p style="text-align:center;margin-top:50px;" v-if="lclength=='0'">暂无流程</p>

       <mt-steps direction="vertical" v-else v-for="(item,index) in lc" :key="index">
    <mt-step :status= "item.type=='完成'||item.type=='终止'?'finish':(index==0?'finish':'')"  >
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
import { Toast } from "bh-mint-ui2";
import { Get, Post } from "../../utils";
import api from "../../api";
import { MessageBox } from 'bh-mint-ui2';
export default {
  data() {
    return {
      selected: "1",
      detail: {},
      host: "WEBPACK_CONFIG_HOST",
      fjobj:[],
      value:"",
      value1:"",
      options:[],
      options1:[],
      BZ:"",
      SHYJ:"",
      token:"",
      fileToken:"",
      host: "WEBPACK_CONFIG_HOST",
      hostPathname:
                location.origin +
                location.pathname.substring(
                    0,
                    location.pathname.indexOf("/", 1)
                ),
      zt1:"NO",
      zt2:"YES",
      id:"",
      id1:"",
      status:"",
      lclength:"",//流程长度
      lc:[],//流程
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
    getDic(){
        Get(api.getDic,{
            type:"SFXSCJ"
        }).then(res=>{
            // console.log(res)
            res.datas.code.rows.forEach(item=>{
                this.options.push({
                    label:item.name,
                    value:item.id
                });
            });
        });
        Get(api.getDic,{
            type:"SFXJK"
        }).then(res=>{
            res.datas.code.rows.forEach(item=>{
                this.options1.push({
                    label:item.name,
                    value:item.id
                });
            });
        });
    },
    getFJ(){
        Get(api.queryDetailFjModel,{
            WID: this.$route.query.WID
        }).then(res=>{
            // console.log(res.datas.queryDetailFjModel.rows[0])
            var url=
             WEBPACK_CONFIG_HOST +
                    "/sys/emapcomponent/file/getUploadedAttachment/" +
                    res.datas.queryDetailFjModel.rows[0].FJSC +
                    ".do";
            Get(url,{}).then(res=>{
                this.fjobj=res.items;
                this.fileToken=res.fileToken;
                // console.log(res)
            });
        });
    },
    downloadfj(item){
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
                // console.log(this.lc)
                
            });
        },
    onTokenChange(val){
        this.token=val;
        },
     pass(i) {
            if (this.value == "") {
                Toast("请确认学生成绩");
                return;
            }
            if (this.value1 == "") {
                Toast("请选择学籍卡是否打印留存");
                return;
            }
            if (this.SHYJ == "") {
                Toast("请填写审核意见");
                return;
            }
            let newobj = {
                WID:this.detail.WID,
                CZZ: this.detail.CZZ,
                CZZXM: this.detail.CZZXM,
                CZRQ: this.detail.CZRQ,
                XM: this.detail.XM,
                XH: this.detail.XH,
                XYDM: this.detail.DWDM,
                XY: this.detail.DWMC,
                BJDM: this.detail.BH,
                BJ: this.detail.BJMC,
                XXXN_DISPLAY: this.detail.BJMC,
                XXXN: this.detail.BJMC,
                XXXQ_DISPLAY: this.detail.XXXN_DISPLAY,
                XXXQ: this.detail.XXXQ,
                BRDH: this.detail.BRDH,
                FMXM: this.detail.FMXM,
                FMDH: this.detail.FMDH,
                XXYY_DISPLAY: this.detail.XXYY_DISPLAY,
                XXYY: this.detail.XXYY,
                SQSJ: this.detail.SQSJ,
                YJDZ: this.detail.YJDZ,
                FJSC: this.fileToken ? this.fileToken : "",
                XSCJ_DISPLAY: this.value,
                XSCJ: this.id,
                XJK_DISPLAY: this.value1,
                XJK: this.id1,
                BZ: this.BZ,
                BH: this.detail.BH,
                FJ: this.token,
                SHYJ: this.SHYJ
            };
            MessageBox.confirm('确定执行此操作吗？').then(action => {
            if (i == "YES") {
                Get(api.execute, {
                    formData: newobj,
                    id: "submit",
                    commandType: "submit",
                    execute: "do_submit",
                    name: "通过",
                    action: "model:DZ_T_XFTXSQ_XXSQ.SAVE",
                    commandEvent:
                        "com.wisedu.emap.pubdzxxsqapp.service.BtnClickEventListener",
                    url: "/sys/emapflow/tasks/execute.do",
                    buttonType: "primary",
                    disabled: true,
                    taskId: this.$route.query.TASKID,
                    defKey: "pubdzxxsqapp.xxFlow",
                    flowComment: this.SHYJ
                }).then(res => {
                   console.log(res)
                    if (res.succeed == true) {
                        Toast("审核通过成功!");
                        history.back(-1);
                    } else {
                        Toast("审核通过失败!");
                    }
                });
            } else if (i == "NO") {
                Get(api.terminateInstance, {
                    formData: newobj,
                    id: "termination",
                    commandType: "termination",
                    execute: "do_termination",
                    name: "否决",
                    action: "model:DZ_T_XFTXSQ_XXSQ.SAVE",
                    commandEvent:
                        "com.wisedu.emap.pubdzxxsqapp.service.BtnClickEventListener",
                    url: "/sys/emapflow/tasks/terminateInstance.do",
                    taskId: this.$route.query.TASKID,
                    defKey: "pubdzxxsqapp.xxFlow",
                    flowComment: this.SHYJ
                }).then(res => {
                    // console.log(res)
                    if (res.succeed == true) {
                        Toast("审核不通过成功!");
                        history.back(-1);
                    } else {
                        Toast("审核不通过失败!");
                    }
                });
            } else {
            }  }).catch(() => {});
        },
     blank(e,val){
         this.id=val
     },
     blank1(e,val){
         this.id1=val
     }
  },
  created() {
    this.getDetail();
    this.getFJ();
    this.getLC();
    this.getDic();
  }
};
</script>

<style scoped>
.mint-button--large {
    width: 50%;
}
.btngroup{
    position: relative;
    margin-top: 10px;
}
.btn{
   position: absolute;
    right:0;
    top: 0;  
}
.title {
    background: #fff;
    padding: 10px 12px;
    }
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