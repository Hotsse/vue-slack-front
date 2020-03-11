<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <Logo />
      <b-navbar-brand href="javascript:;" to="/">Test Slack</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/kanban">Kanban</b-nav-item>
          <b-nav-item to="/issue/list">Issue</b-nav-item>
        </b-navbar-nav>

        <create-issue />
        
        <b-navbar-nav class="ml-auto">
          <!--
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          -->

          <b-nav-item-dropdown right v-if="$store.state.empInfo == null">
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="javascript:;" to="/employee/login">Sign Up</b-dropdown-item>
            <b-dropdown-item href="#">Sign In</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right v-else>
            <template v-slot:button-content>
              <em>{{ $store.state.empInfo.empNm }}</em>
            </template>
            <b-dropdown-item href="javascript:;">Profile</b-dropdown-item>
            <b-dropdown-item href="javascript:;" @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import CreateIssue from '~/components/CreateIssue.vue'

export default {
  components: {
    Logo,
    CreateIssue
  },
  methods: {
    logout() {
      this.$cookies.set("accessToken", null, {
        path: '/',
        domain: '.hotsse.me',
        maxAge: 0
      });
      this.$store.commit('setEmpInfo', null)
      this.$router.push('/employee/login')
    }
  }
}
</script>

<style>

</style>
