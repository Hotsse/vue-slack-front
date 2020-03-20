<template>
  <div>
    SSO Redirect
  </div>
</template>

<script>
export default {
  layout: 'empty',
  created() {
    window.location.href = "https://dev-nosts.nexon.com/oauth/authorize?client_id=6167bfaa-932e-4c97-a077-fd059a00dc2d"
        + "&response_type=code&scope=bds_oauth_resource_service"
        + "&redirect_uri=http://local.msign.weboffice.co.kr:8080/login"
        + "&state =5ff9dcb3-85e4-49ba-b480-27a5aec20a2e"
  }
}
</script>

<style>
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
</style>
