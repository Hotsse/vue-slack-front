<template>
  <b-container fluid>
    <!-- logo -->
    <b-jumbotron>
      <template v-slot:header>
        Test Slack <login-logo />
      </template>
      
      <template v-slot:lead>
        Nuxt.js 기술 분석용 프로젝트
      </template>
      <hr class="my-4">
      <p>empId : AD계정 / empPw : 1234</p>
    </b-jumbotron>
    <!-- empId -->
    <b-row class="my-1">
      <b-col sm="2">
        <label for="empId">empId</label>
      </b-col>
      <b-col sm="10">
        <b-form-input id="empId" v-model="empId" type="text"></b-form-input>
      </b-col>
    </b-row>
    <!-- empPw -->
    <b-row class="my-1">
      <b-col sm="2">
        <label for="empPw">empPw</label>
      </b-col>
      <b-col sm="10">
        <b-form-input id="empPw" v-model="empPw" type="password"></b-form-input>
      </b-col>
    </b-row>
    <!-- Submit -->
    <b-row class="my-1">
      <b-button block variant="primary" @click="login">Login</b-button>
    </b-row>
  </b-container>
</template>

<script>
import loginLogo from '@/components/LoginLogo.vue'

export default {
  layout: 'empty',
  components: {
    loginLogo
  },
  data() {
    return {
      empId: null,
      empPw: null
    }
  },
  methods: {
    login() {

      var params = new FormData()
      params.append('empId', this.empId)
      params.append('empPw', this.empPw)

      this.$axios.post(`/employee/login`, params, {
        withCredentials: true
        })
        .then((res) => {
          if(res.data == "") {
            alert("일치하는 계정이 없습니다")
          }
          else{
            console.log(res.data)

            var empInfo = {
              empNo: res.data.empNo,
              empNm: res.data.empNm
            }
            this.$store.commit('setEmpInfo', empInfo)
            this.$router.push('/')
          }
          
        })
        .catch((error) => {
          console.log(error)
        })        
    }
  }
}
</script>

<style>
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
</style>
