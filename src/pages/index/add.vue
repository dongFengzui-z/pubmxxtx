<template>
  <div class="pubmxxtx_add">
     <mt-cell-group>
            <mt-field label="姓名" placeholder v-model="student.XM" readonly></mt-field>
            <mt-field label="学号" placeholder v-model="student.XH" readonly></mt-field>
            <mt-field label="学院名称" placeholder v-model="student.DWMC" readonly></mt-field>
            <mt-field label="班级名称" placeholder v-model="student.BJMC" readonly></mt-field>
            <mt-cell class="o-cell" title="休学学年" :required="true" is-link v-model="XXXNType" @click.native="XXXN()"></mt-cell>
            <mt-cell class="o-cell" title="休学学期" :required="true" is-link v-model="XXXQType" @click.native="XXXQ()"></mt-cell>
            <mt-field label="本人电话" placeholder="请输入本人电话" v-model="BRDH" required></mt-field>
            <mt-field label="父母姓名" placeholder="请输入父母姓名" v-model="FMXM" required></mt-field>
            <mt-field label="父母电话" placeholder="请输入父母电话" v-model="FMDH" required></mt-field>
            <mt-cell class="o-cell" title="休学原因" :required="true" is-link v-model="XXYYType" @click.native="XXYY()"></mt-cell>
            <mt-field label="邮寄地址" placeholder v-model="YJDZ" type="textarea" rows="4" required></mt-field>
            <div class="bh-clearfix cell">
              <div class="fj">上传附件</div>
              <emapm-upload-imgs 
              :host='host'
    :host-pathname='hostPathname' 
    :read-only='false' 
    :token="token" 
    :size="1000000" 
    :max-number="5" 
    @on-token-change="onTokenChange"
></emapm-upload-imgs>
            </div>
            <div style="position: relative;margin-top:10px;">
              <mt-button  type="default" size="large" @click="Savedrafts(zt1)">保存草稿</mt-button>
            <mt-button class="btn" type="primary" size="large" @click="Savedrafts(zt2)">提交</mt-button>
            </div>
        </mt-cell-group>
        <mt-popup v-model="showpopupXXXN" position="bottom">
           <mt-picker :columns="XXXNList" showToolbar @confirm="QDXXXN" @cancel="QXXXXN" />
        </mt-popup>
        <mt-popup v-model="showpopupXXXQ" position="bottom">
           <mt-picker :columns="XXXQList" showToolbar @confirm="QDXXXQ" @cancel="QXXXXQ" />
        </mt-popup>
        <mt-popup v-model="showpopupXXYY" position="bottom">
           <mt-picker :columns="XXYYList" showToolbar @confirm="QDXXYY" @cancel="QXXXYY" />
        </mt-popup>
  </div>
</template>

<script>
import { Get, Post } from "../../utils";
import { MessageBox } from 'bh-mint-ui2';
import { Toast } from "bh-mint-ui2";
import api from "../../api";
import moment from "moment";
export default {
  data(){
   return{
     student:{},
//休学学年
     showpopupXXXN:false,
     XXXNType:"",
      XXXNId: "",
     XXXNList:[],
//休学学期
      showpopupXXXQ:false,
      XXXQType:"",
      XXXQId:"",
      XXXQList:[],
//
BRDH:"",
FMXM:"",
FMDH:"",
//休学原因
showpopupXXYY:false,
XXYYType:"",
XXYYId:"",
XXYYList:[],
YJDZ:"",
//上传附件
token:"",
host:location.origin,
hostPathname:
location.origin +
                location.pathname.substring(
                    0,
                    location.pathname.indexOf("/", 1)
                ),
      commandType:"",
      execute: "",
      id: "", 
      zt1: "保存草稿",
            zt2: "提交",
           
   }
  },
methods:{
  getdata(){
     Get(api.getCurrentStudentInfo, {}).then(res => {
            this.student = res.data;
            // console.log(res.data.XM)
        });
  },
  XXXN(){
    this.showpopupXXXN=true;
    Get(api.getDic, {type: "XN"}).then(res=>{
    // console.log(res)
    if( this.XXXNList!=""){
      return;
    }else{
    res.datas.code.rows.forEach((val,index) => {
      this.XXXNList.push({
        text:val.name,
        stepid:val.id
      });
    });
    }
  });
  },
  QDXXXN(value,index){
    this.XXXNType=value.text;
    this.XXXNId=value.stepid;
    this.showpopupXXXN=false;
  },
   QXXXXN(){
     this.showpopupXXXN=false
   },
   XXXQ(){
    this.showpopupXXXQ=true;
    Get(api.getDic, {type: "XQ"}).then(res=>{
    // console.log(res)
    if(this.XXXQList!=""){
      return;
    }else{
    res.datas.code.rows.forEach((val,index) => {
      this.XXXQList.push({
        text:val.name,
        stepid:val.id
      });
    });
    }
  });
  },
    QDXXXQ(value,index){
    this.XXXQType=value.text;
    this.XXXQId=value.stepid;
    this.showpopupXXXQ=false;
  },
   QXXXXQ(){
     this.showpopupXXXQ=false
   },
   XXYY(){
     this.showpopupXXYY=true;
    Get(api.getDic, {type: "XXYY"}).then(res=>{
    // console.log(res)
    if(this.XXYYList!=""){
      return;
    }else{
    res.datas.code.rows.forEach((val,index) => {
      this.XXYYList.push({
        text:val.name,
        stepid:val.id
      });
    });
    }
  });
   },
     QDXXYY(value,index){
    this.XXYYType=value.text;
    this.XXYYId=value.stepid;
    this.showpopupXXYY=false;
  },
   QXXXYY(){
     this.showpopupXXYY=false
   },
   //上传图片
   onTokenChange(val){
     this.token=val;
    //  console.log(this.token)
   },
//保存草稿
   Savedrafts(i){
      if (this.XXXNType == "") {
                Toast("休学学年不可为空！");
                return;
            }
            if (this.XXXQType == "") {
                Toast("休学学期不可为空！");
                return;
            }
            if (this.BRDH == "") {
                Toast("本人电话不可为空");
                return;
            }
            if (this.FMXM == "") {
                Toast("父母姓名");
                return;
            }
            if (this.FMDH == "") {
                Toast("父母电话");
                return;
            }
            if (this.XXYYType == "") {
                Toast("休学原因不可为空！");
                return;
            }
            if (this.YJDZ == "") {
                Toast("邮寄地址不可为空！");
                return;
            }
            let newstudent={
              WID: "",
                CZZ: "",
                CZZXM: "",
                CZRQ: "",
                XM: this.student.XM,
                XH: this.student.XH,
                XYDM: this.student.DWDM,
                XY: this.student.DWMC,
                BJDM: this.student.BH,
                BJ: this.student.BJMC,
                XXXN_DISPLAY: this.XXXNType,
                XXXN: this.XXXNId,
                XXXQ_DISPLAY: this.XXXQType,
                XXXQ: this.XXXQId,
                BRDH: this.BRDH,
                FMXM: this.FMXM,
                FMDH: this.FMDH,
                XXYY_DISPLAY: this.XXYYType,
                XXYY: this.XXYYId,
                SQSJ: moment().format("YYYY-MM-DD HH:mm:ss"),
                YJDZ: this.YJDZ,
                FJSC: this.token
            };
            if(i=="提交"){
              this.commandType="start" ;
              this.execute = "do_start";
              this.id = "start";
            }else{
               this.commandType = "draft";
                this.execute = "do_draft";
                this.id = "draft";
            }
            MessageBox.confirm('确定执行'+i+'吗？').then(action => {

            Get(api.startFlow, {
                formData: newstudent,
                id: this.id,
                commandType: this.commandType,
                execute: this.execute,
                name: i,
                action: "model:DZ_T_XFTXSQ_XXSQ.SAVE",
                commandEvent:
                    "com.wisedu.emap.pubdzxxsqapp.service.BtnClickEventListener",
                url: "/sys/emapflow/tasks/startFlow.do",
                disabled: true,
                taskId: "",
                defKey: "pubdzxxsqapp.xxFlow"
            }).then(res => {
                if (res.succeed == true) {
                    Toast(i + "成功!");
                    history.back(-1);
                } else {
                    Toast(i + "失败!");
                }
    });
               }).catch(() => {});
   }
  
},
created(){
  this.getdata();
}
}
</script>

<style scoped>

.mint-button--large {
    width: 45%;
}

.btn{
   position: absolute;
    right:1rem;
    top: 0;
    
}
.fj{
   padding: 12px 0;
}

</style>