<template>
  <div class="pubmxxtx_SH">
    <div class="page-loadmore-wrapper"
    ref="wrapper"
    :style="{height: wrapperHeight + 'px'}">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        @bottom-status-change="handleBottomChange"
        ref="loadmore"
        :autoFill="false"
        
      >
        <div class="item_wrap">
          <div v-show="this.list.length==0" class="empty-page">
                        <span>暂无需要审核数据哦</span>
                    </div>
          <div class="list" v-for="(item,index) in list" :key="index" @click="goDetail(item.WID,item.TASKID,item.SHZT)">
            <p>
              {{ item.XM }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.SQSJ}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="zt" v-if="item.SHZT=='termination'" style="color:red" >{{ item.SHZT_DISPLAY }}</span>
              <span class="zt" v-else-if="item.SHZT=='end'" style="color:#52C7CA" >{{ item.SHZT_DISPLAY }}</span>
              <span class="zt" v-else-if="item.SHZT=='draft'">{{ item.SHZT_DISPLAY }}</span>
              <span class="zt" v-else style="color:#ffc107">{{ item.SHZT_DISPLAY }}</span>
            </p>
            <p>休学学年：{{item.XXXN_DISPLAY}}</p>
            <p>休学学期：{{item.XXXQ_DISPLAY}}</p>
            <p>休学原因：{{item.XXYY_DISPLAY}}</p>
            <p>邮寄地址：{{item.YJDZ}}</p>
          </div>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
                    <span
                        v-show="bottomStatus !== 'loading'"
                        :class="{ 'is-rotate': bottomStatus === 'drop' }"
                    >↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { Get, Post } from "../../utils";
import api from "../../api";
export default {
  data() {
    return {
      pageNum: 1,
      list: [],
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 0,
      dispatchid: ""
    };
  },
  methods: {
    getData() {
      Get(api.queryUserTasks, {
        taskType: "NOTEND",
        nodeId: "usertask2,usertask3,usertask4,usertask6,usertask7,usertask8,usertask9,usertask10,usertask11,usertask12",
        appName: "pubdzxxsqapp",
        module: "modules",
        page: "sh",
        action: "queryAuditListModel",
        pageSize: 10,
        pageNumber: this.pageNum
      }).then(res => {
        // console.log(res.datas.queryUserTasks.rows);
        let data = res.datas.queryUserTasks.rows;
        if(!data.length|| data.length < 10){
          this.allLoaded=true;
        }
        if(data.length){
          data.forEach(element => {
            this.list.push(element);
          });
        }
      });
    },
    loadTop() {
      this.pageNum=1;
      this.list=[];
      this.getData();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      setTimeout(()=>{
        this.pageNum++;
      this.getData();
      this.$refs.loadmore.onBottomLoaded();
      },1000);
    },
    handleBottomChange(status){
      this.bottomStatus=status;
    },
    goDetail(WID,TASKID,SHZT){
        this.$router.push({
          name:"SHDetail",
          query:{
            WID:WID,
            TASKID:TASKID
          }
        });
    }

  },
  created() {
    this.getData();
  },
  mounted(){
    if (
            /iphone/gi.test(navigator.userAgent) &&
            screen.height == 812 &&
            screen.width == 375
        ) {
            this.wrapperHeight = "690";
            var arr = document.getElementsByClassName("page-loadmore-wrapper");
            arr[0].classList.add("active");
        } else {
            this.wrapperHeight =
                document.documentElement.clientHeight -
                this.$refs.wrapper.getBoundingClientRect().top;
        }
        global.SDK.setTitleText("休学申请");
    }
  
};
</script>

<style>
.list{
   font-size: 14px;
    border-bottom: 1px dashed #bfbfbf;
    margin: 5px 0px 10px 0px;
    padding-bottom: 10px;
    background: #fff;
    position: relative;
}
.list > p {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
.zt {
    position: absolute;
    right: 10px;
    top: 5px;
    display: inline-block;
    width: 90px;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap;
    text-overflow: ellipsis;/*超出部分以...显示*/
    text-align: right;
}
.empty-page {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>