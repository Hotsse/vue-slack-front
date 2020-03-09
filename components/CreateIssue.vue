<template>
  <div>
    <b-button variant="primary" size="sm" v-b-modal.modal-1>만들기</b-button>

    <b-modal id="modal-1" size="xl" scrollable @ok="createIssue" @show="resetIssueModal">

      <b-row>
        <b-col sm="3" class="text-right">
          프로젝트*
        </b-col>
        <b-col sm="9">
          <b-form-select v-model="issue.projectKey">
            <b-form-select-option v-for="project in projects" :key="project.key" :value="project.key">{{project.title}}</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>

      <hr />

      <b-row>
        <b-col sm="3" class="text-right">
          제목*
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="issue.summary" placeholder="제목"></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3" class="text-right">
          내용
        </b-col>
        <b-col sm="9">
          <b-form-textarea v-model="issue.description" rows="10" max-rows="10"></b-form-textarea>
        </b-col>
      </b-row>

      <hr />

      <b-row>
        <b-col sm="3" class="text-right">
          담당자
        </b-col>
        <b-col sm="9">
          <b-form-input list="employees" v-model="empNm" @keyup="getEmployee"></b-form-input>
          <datalist id="employees">
            <option v-for="employee in employees" v-bind:key="employee.empNo">{{ employee.empNm }}</option>
          </datalist>

          <b-form-input id="assigneeNo" v-model="issue.assigneeNo" hidden />
          <!--
          <input type="text" class="form-control" name="assigneeNo" v-model="issue.assigneeNo" placeholder="담당자명" />
          -->
        </b-col>
      </b-row>

      <hr />

      <b-row>
        <b-col sm="3" class="text-right">
          마감일
        </b-col>
        <b-col sm="9">
          <b-form-datepicker v-model="issue.dueDt" class="mb-2"></b-form-datepicker>
        </b-col>
      </b-row>

    </b-modal>
  </div>
</template>

<script>

export default {
  data () {
    return {
      projects: [],
      issue: {
        projectKey: null,
        summary: null,
        description: null,
        assigneeNo: null,
        dueDt: null
      },
      empNm: null,
      employees: []
    }
  },
  methods: {    
    getAuthedProjects () {   

      this.$axios.get(`http://vlack-api.hotsse.me:8080/project/getAuthedProjects`)
        .then((res) => {
          this.projects = res.data
          this.issue.projectKey = this.projects[0].key       
        })
    },
    createIssue () {

      var params = new FormData()
      params.append('projectKey', this.issue.projectKey)
      params.append('summary', this.issue.summary)
      params.append('reporterNo', this.$store.state.empInfo.empNo)
      params.append('description', this.issue.description)
      params.append('dueDt', this.issue.dueDt)

      this.$axios.post(`http://vlack-api.hotsse.me:8080/issue/createIssue`, params)
        .then((res) => {
          window.location.reload()
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          this.resetIssueModal()
        })
    },
    resetIssueModal () {
      this.issue.projectKey = this.projects[0].key
      this.issue.summary = null
      this.issue.description = null
      this.issue.assigneeNo = null
      this.issue.dueDt = null
    },
    getEmployee () {
      this.$axios.get(`http://vlack-api.hotsse.me:8080/employee/getEmployeeByNm?keyword=${this.empNm}`)
        .then((res) => {
          this.employees = res.data          
        })
    },
    setAssigneeNo () {
      alert('asdf')
    }
  },
  mounted() {    
    this.getAuthedProjects()
  }
}
</script>

<style>
  .row {
    margin-top:10px;
  }
</style>
