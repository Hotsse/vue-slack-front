<template>
  <b-container fluid>
    <b-row style="margin-top:15px;">
      <h1>Kanban Board</h1>
    </b-row>
    <b-row class="title">
      <b-col v-for="workflow in workflows" :key="workflow.id">
        <h6>{{ workflow.title }}</h6>
      </b-col>
    </b-row>
    <b-row class="workflow">
      <draggable v-for="workflow in workflows" :key="workflow.id" class="col" :data-workflow-id="workflow.id" :list="workflows.issues" group="issue" @add="moveIssue">
        <b-list-group-item href="javascript:;" @click="routeToDetail(issue.id)" v-for="issue in workflow.issues" :key="issue.id" :data-issue-id="issue.id" class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ issue.projectKey }}-{{ issue.key }}</h5>
            <small>{{ issue.regDt }}</small>
          </div>

          <p class="mb-1">
            {{ issue.summary }}
          </p>

          <small>{{ `${issue.description.substring(0, 20)}...` }}</small>
        </b-list-group-item>
      </draggable>
    </b-row>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'

var WorkflowVO = () => {
  var id = null
  var title = null
  var sort = null
  var projectKey = null
  var issues = []
}

export default {
  components: {
    draggable
  },
  data () {
    return {
      workflows: []
    }
  },
  methods: {
    loadWorkflows () {
      this.$axios.get(`http://vlack-api.hotsse.me:8080/workflow/getWorkflows?projectKey=TESTPJ`)
        .then((res) => {
          res.data.forEach((element)=>{
            var workflow = new WorkflowVO()

            workflow.id = element.id
            workflow.title = element.title
            workflow.issues = []

            this.workflows.push(workflow)
          })

          this.loadIssues()          
        })
    },
    loadIssues () {

      for(let i=0; i<this.workflows.length; i++){
        this.$axios.get(`http://vlack-api.hotsse.me:8080/issue/getIssuesByWorkflowId?projectKey=TESTPJ&workflowId=${this.workflows[i].id}`)
          .then((res) => {
            this.workflows[i].issues = res.data
          })
      }
    },
    moveIssue (e) {
      window.console.log(e)

      var dsTarget = e.target.dataset
      var dsItem = e.item.dataset

      var params = new FormData()
      params.append('id', dsItem.issueId)
      params.append('workflowId', dsTarget.workflowId)

      this.$axios.post(`http://vlack-api.hotsse.me:8080/issue/updateIssue`, params)
        .then(function (res) {
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    routeToDetail(id) {
      this.$router.push(`/issue/detail?id=${id}`)
    }
  },  
  mounted() {
    this.loadWorkflows()
  }
}
</script>

<style>
  .issue {
    background-color: #fff;
    border-radius: 5px;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
</style>
