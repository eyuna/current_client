<template>
  <div id="main">
    <h2>지역 화폐 사용처를 검색해보자</h2><br>
    <div id="opt">
      <div id="major-opt">
        <label>대분류</label>
        <b-form-select v-model="majorSelected" @change="onMajorChange($event)">
          <option :value="null" disabled>-</option>
          <option v-for="opt in majorOpt" v-bind:value="opt.keywordCode" :key="opt.keywordCode">
            {{opt.keywordName}}
          </option>
        </b-form-select>
        <!-- <span>Selected: {{ majorSelected }}</span><span> -->
      </div>
      <br><br>
      <div id="small-opt">
        <label>소분류</label>
        <b-form-select v-model="smallSelected" @change="onSmallChange($event)">
          <option :value="null" disabled>-</option>
          <option v-for="opt in smallOpt" v-bind:value="opt.keywordCode" :key="opt.keywordCode">
            {{opt.keywordName}}
          </option>
        </b-form-select>
        <!-- <span>Selected: {{ smallSelected }}</span><br> -->
      </div>
    </div>

    <div id="table">
      <b-form-input v-model="text" placeholder="검색어를 입력하세요."></b-form-input>
      <!-- <div class="mt-2">Value: {{ text }}</div> -->
      <b-table striped hover :items="tableItems" :fields="fields"></b-table>
    </div>
    
    
  </div>
</template>

<script>
  export default {
    name: 'MainTable',
    data() {
      return {
        fields: [
          {
          key: 'storeName',
          label: '가게명'
          },
          {
          key: 'adrDong',
          label: '동'
          },
          {
          key: 'adrFull',
          label: '전체 주소'
          }
        ],
        tableItems: [],
        majorSelected: null,
        majorOpt: [],
        smallSelected: null,
        smallOpt: [],
        text: ''
      }
    },
    methods:{
      getInitTable() {
        var vm = this;
        this.$http.get('http://localhost/keyword/')
        .then((result) => {
          vm.tableItems = result.data;
        })
      },
      getMajorInit() {
        var vm = this;
        this.$http.get('http://localhost/keyword/minit')
        .then((result) => {
          vm.majorOpt = result.data;
          // console.log(result);
        })
      },
      onMajorChange(event) {
        var vm = this;
        this.$http.get('http://localhost/keyword/sinit', {
          params: {
            major: event
          }
        })
        .then((result) => {
          vm.smallOpt = result.data;
          // console.log(result);
        })
      },
      onSmallChange(event) {
        var vm = this;
        this.$http.get('http://localhost/keyword/search', {
          params: {
            code: event
          }
        })
        .then((result) => {
          vm.tableItems = result.data;
        })
      }
    },
    mounted(){
      // this.getInitTable();
      this.getMajorInit();
    }
  }
</script>

<style scoped>
  #opt {
    display: inline-block;
    width: 15%;
  }
  #major-opt {
    display: inline;
    text-align-last:center;
  }

  #small-opt {
    display: inline;
    text-align-last:center;
  }
  #search-form {
    width: 10%;
    float: right;
    padding-right: 100px;
  }
  #table {
    width: 80%;
    float: right;
    padding-right: 100px;
  }
  #mt-2 {
    text-align: center;
  }
</style>
<style module>
</style>