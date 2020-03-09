<template>
  <b-container fluid>
    <b-row class="summary">
      <h1>{{ issue.summary }}</h1>
    </b-row>
    <b-row>
      <b-col sm="9">

        <h6 class="subtitle">Details</h6><hr/>
        <b-row class="details">          
          <b-col sm="2">Status:</b-col>
          <b-col sm="4">{{ issue.workflowNm }}</b-col>
        </b-row>

        <h6 class="subtitle">Description</h6><hr/>        
        <b-row class="description">
          <b-textarea v-model="issue.description"></b-textarea>
        </b-row>

      </b-col>

      <b-col sm="3">

        <h6 class="subtitle">Peoples</h6><hr/>
        <b-row class="peoples">
            <b-col sm="5">Assignee:</b-col>
            <b-col sm="7"> {{ issue.assigneeNm }} </b-col>
            <b-col sm="5">Reporter:</b-col>
            <b-col sm="7"> {{ issue.reporterNm }} </b-col>
        </b-row>

        <h6 class="subtitle">Dates</h6><hr/>
        <b-row class="dates">
            <b-col sm="5">Created:</b-col>
            <b-col sm="7"> {{ issue.regDt }} </b-col>
            <b-col sm="5">Due:</b-col>
            <b-col sm="7"> {{ issue.dueDt }} </b-col>
        </b-row>

      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      issue: {
       id: this.$route.query.id
      }
    }
  },
  methods: {
    getIssue() {
      this.$axios.get(`http://vlack-api.hotsse.me:8080/issue/getIssue?id=${this.issue.id}`)
        .then((res) => {
          console.log(res.data)
          this.issue = res.data
        })
    }
  },
  mounted() {
    this.getIssue()
  }
}
</script>

<style scoped>
  h6.subtitle {
    margin-top:50px;
  }
</style>