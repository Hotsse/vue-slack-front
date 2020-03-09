<template>
  <div class="">
    <div class="row container">
      <h1>Kanban Board</h1>
    </div>
    <div class="row title">
      <div class="col">To do</div>
      <div class="col">In Progress</div>
      <div class="col">Test/QA</div>
      <div class="col">Done</div>
    </div>
    <div class="row ticket-list">
      <!-- todo -->
      <draggable class="col" data-list-name="todo" :list="todoList" group="ticket" @add="add">
        <div v-for="list in todoList" :key="list.idx" class="ticket">
          <p>{{ list.title }}</p>
          <p>{{ list.content }}</p>
          <p>{{ list.regDt }}</p>
        </div>
      </draggable>
      <!-- inprogress -->
      <draggable class="col" data-list-name="in-progress" :list="progressList" group="ticket" @add="add">
        <div v-for="list in progressList" :key="list.idx" class="ticket">
          <p>{{ list.title }}</p>
          <p>{{ list.content }}</p>
          <p>{{ list.regDt }}</p>
        </div>
      </draggable>
      <!-- test/qa -->
      <draggable class="col" data-list-name="qa" :list="qaList" group="ticket" @add="add">
        <div v-for="list in qaList" :key="list.idx" class="ticket">
          <p>{{ list.title }}</p>
          <p>{{ list.content }}</p>
          <p>{{ list.regDt }}</p>
        </div>
      </draggable>
      <!-- completed -->
      <draggable class="col" data-list-name="completed" :list="completeList" group="ticket" @add="add">
        <div v-for="list in completeList" :key="list.idx" class="ticket">
          <p>{{ list.title }}</p>
          <p>{{ list.content }}</p>
          <p>{{ list.regDt }}</p>
        </div>
      </draggable>
    </div>
    <div class="row">
      <button @click="test">asdf</button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data () {
    return {
      todoList: [
        { idx: 1, title: '제목1', content: '내용1', regDt: '2020-02-01' },
        { idx: 2, title: '제목2', content: '내용1', regDt: '2020-02-02' },
        { idx: 3, title: '제목3', content: '내용1', regDt: '2020-02-03' }
      ],
      progressList: [
        { idx: 4, title: '제목4', content: '내용1', regDt: '2020-02-04' },
        { idx: 5, title: '제목5', content: '내용1', regDt: '2020-02-05' },
        { idx: 6, title: '제목6', content: '내용1', regDt: '2020-02-06' }
      ],
      qaList: [],
      completeList: [
        { idx: 7, title: '제목7', content: '내용1', regDt: '2020-02-07' },
        { idx: 8, title: '제목8', content: '내용1', regDt: '2020-02-08' },
        { idx: 9, title: '제목9', content: '내용1', regDt: '2020-02-09' }
      ]
    }
  },
  methods: {
    add (e) {
      window.console.log(e)

      const dataset = e.target.dataset
      alert(dataset.listName)
    }
  },
  asyncData ({ params, error }) {
    /*
    return axios.get(`http://vlack-api.hotsse.me:8080/issue/getWorkflows?projectKey=TESTPJ`)
      .then((res) => {
        return { workflows: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    */
  }
}
</script>

<style>
  .ticket {
    background-color: #fff;
  }
</style>
