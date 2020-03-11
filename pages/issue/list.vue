<template>
  <b-container fluid>
    <b-jumbotron>
      <template v-slot:header>Issues</template>
    </b-jumbotron>
    <b-row>
      <b-table hover :items="issues" :fields="fields" @row-clicked="routeToDetail"></b-table>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'key',
          label: 'Key',
          sortable: true
        },
        {
          key: 'summary',
          label: 'Summary',
          sortable: false
        },
        {
          key: 'assigneeNm',
          label: 'Assignee'
        },
        {
          key: 'reporterNm',
          label: 'Reporter'
        },
        {
          key: 'workflowNm',
          label: 'Status'
        },
        {
          key: 'regDt',
          label: 'Created'
        },
        {
          key: 'dueDt',
          label: 'Due'
        }
      ],
      issues: []
    }
  },
  methods: {
    getIssues() {
      this.$axios.get(`/issue/getIssues?projectKey=TESTPJ`)
        .then((res) => {
          this.issues = res.data          
        })
    },
    routeToDetail(record, index) {
      this.$router.push(`/issue/detail?id=${record.id}`)
    }
  },
  mounted() {
    this.getIssues()
  }
}
</script>

<style scoped>

</style>