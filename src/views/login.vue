<!--  -->
<template>
  <div class="login_box">
    <el-form label-position="right" label-width="60px" :model= "loginfrom">
      <el-form-item label="用户名">
        <el-input v-model="loginfrom.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginfrom.pew" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUserInfo(loginfrom)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginfrom: {
        username: 'admin',
        pwd: '1111111'
      }
    }
  },

  computed: {},

  methods: {
    submitUserInfo(data) {
      console.log(data)
      // 触发登录操作
      this.$store.dispatch('LoginIn', data)
        .then(res => {
          console.log('登陆成功', res)
          // 登录成功后重定向到首页
          this.$router.push({ path: '/' })
        })
        .catch((err) => {
          // 登录失败提示错误
          console.log('登陆失败', data)
          this.$message.error(err)
        })
    }
  },

  components: {}
}
</script>
<style scoped>
.login_box {
  width: 280px;
  position: fixed;
  left: 39%;
  top: 200px;
  border: 1px solid skyblue;
  border-radius: 15px;
  padding: 38px 60px 5px 25px;
  text-align: center;
}
</style>
