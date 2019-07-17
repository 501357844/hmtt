<template>
  <div class="images-container" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom: 20px">
        <el-radio-group @change="search()" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="small"
          style="float:right"
          type="success"
          @click="handleAvatarSuccess=true"
        >添加素材</el-button>
      </div>
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span
              @click="toggleFav(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </li>
      </ul>

      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
        style="text-align:center"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加素材" :visible.sync="handleAvatarSuccess" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="headers"
        name="image"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAvatarSuccess = false">取 消</el-button>
        <el-button type="primary" @click="handleAvatarSuccess = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      imageUrl: null,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(window.sessionStorage.getItem("hmtt")).token
      },
      handleAvatarSuccess: false
    };
  },
  created() {
    this.getImages();
  },
  methods: {
     delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        await this.axios.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      })
      .catch(() => {

      })
      },
    async toggleFav(item) {
      const {
        data: { data }
      } = await this.axios.put("user/images/" + item.id, {
        collect: !item.is_collected
      });
      this.$message.success("操作成功");
      item.is_collected = data.collect;
    },
    handleSuccess(res) {
      // 预览 需要地址
      this.imageUrl = res.data.url;
      this.$message.success("上传成功");
      // 关闭对话框  更新列表
      window.setTimeout(() => {
        this.handleAvatarSuccess = false;
        this.getImages();
        this.imageUrl = null;
      }, 1500);
    },
    pager(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    async getImages() {
      this.loading = true;
      const {
        data: { data }
      } = await this.axios.get("user/images", { params: this.reqParams });
      this.images = data.results;
      this.total = data.total_count;
      this.loading = false;
    },
    search() {
      this.reqParams.page = 1;
      this.getImages();
    }
  }
};
</script>

<style lang="less" scoped>
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 180px;
    height: 180px;
    float: left;
    border: 1px solid #eee;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: orange;
        }
      }
    }
  }
}
</style>
