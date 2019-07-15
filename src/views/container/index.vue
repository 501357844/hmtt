<template>
  <div class="Ccontainer">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选容器内容 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
import MyBread from '@/components/breadcrumb.vue'

export default {
  components: { MyBread },
  data () {
    return {
      // 提交给后台的筛选条件  传参
      // 数据默认是''还是null的区别,如果是null将不会发送字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 默认频道数据
      channelOptions: [],
      // 日期控件的数据
      dateValues: []
    }
  },
  // 获取频道数据
  created () {
    this.getchannelOptions()
  },
  methods: {
    async getchannelOptions () {
      // 依据接口文档
      // 此时没必要去处理错误
      // 频道数据如果没有取成功则不会显示数据
      const { data: { data } } = await this.axios.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
