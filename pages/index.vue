<template>
  <b-container fluid>
    <b-jumbotron>
      <template v-slot:header>DashBoard</template>
      <hr class="my-4">
      <p>
        관련 문서는 아래 링크를 이용해 주십시오
      </p>
      <b-button variant="primary" href="javascript:;">Git소스 이동</b-button>
      <b-button variant="success" href="javascript:;">기술문서 이동</b-button>
    </b-jumbotron>
  </b-container>
</template>

<script>
export default {
}
</script>

<style>
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
</style>
