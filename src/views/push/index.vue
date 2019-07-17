<template>
  <div class="push-container">
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
