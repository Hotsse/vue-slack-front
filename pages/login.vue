<template>
  <div>
    SSO Login
  </div>
</template>

<script>
export default {
  layout: 'empty',
  created() {

    var params = new FormData()
    params.append('code', this.$route.query.code)

    this.$axios.post(`/employee/oauth`, params, {
      withCredentials: true
      })
      .then((res) => {
        if(res.data == "") {
          alert("일치하는 계정이 없습니다")
        }
        else{
          console.log(res.data)

          var profile = {
            CMPName: res.data.cmpname,
            EMPNO: res.data.empno,
            EMPName: res.data.empname
          }
          this.$store.commit('setProfile', profile)
          this.$router.push('/')
        }
          
      })
      .catch((error) => {
        console.log(error)
      })

  }
}
</script>
