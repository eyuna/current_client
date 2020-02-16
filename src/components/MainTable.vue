<template>
  <div>
    <div id="nav">
      <b-nav align="right">
        <!-- <b-nav-item href="/#/login" active>Login</b-nav-item> -->
        <b-nav-item @click="showModal = true" active>Login</b-nav-item>
        <b-nav-item href="/#/mypage" >MyPage</b-nav-item>
        <b-nav-item disabled>Admin</b-nav-item>
      </b-nav>
    </div>
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
        <b-form-input v-model="text" v-on:keyup.enter="submit" placeholder="이름으로 검색" style="
      width: 20%;
      float: right;
      margin-bottom: 15px;
  "></b-form-input>
        <!-- <div class="mt-2">Value: {{ text }}</div> -->
        <b-table striped hover :items="tableItems" :fields="fields"></b-table>
      </div>
    </div>
    <modal v-show="showModal">
      
      <div class="modal">
        <button type="button" class="close" aria-label="Close" @click="showModal = !showModal">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-wrapper" >  
            <div class="container" id="container" v-on:clickout="showModal = !showModal">
              <div class="form-container log-in-container">
                <!-- <form action="/#/main"> -->
                <form>
                  <h1>Login</h1>
                  <div class="social-container">
                    <a href="#" class="social"><i class="fa fa-facebook fa-2x"></i></a>
                    <a href="#" class="social"><i class="fab fa fa-twitter fa-2x"></i></a>
                  </div>
                  <span>or use your account</span>
                  <input type="email" v-model="email" placeholder="Email" />
                  <input type="password" v-model="pw" placeholder="Password" />
                  <a href="/#/signup">회원이 아니신가요?</a>
                  <button v-on:click="login">Log In</button>
                </form>
              </div>
              <div class="overlay-container">
                <div class="overlay">
                  <div class="overlay-panel overlay-right">
                    <h1>광명 지역화폐 검색</h1>
                    <p>서비스 지역: 철산3동</p>
                  </div>
                </div>
              </div>
            </div>
          </div>  
      </div>
    </modal>

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
        text: '',
        showModal: false,
        email: '',
        pw:''
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
      },
      submit() { //TODO: NullException
        var vm = this;
        this.$http.get('http://localhost/keyword/word', {
          params: {
            word: vm.text
          }
        })
        .then((result) => {
          vm.tableItems = result.data;
        })
      },
      login() {
        var vm = this;
        this.$http.post('http://localhost/member/login', {
          "uemail": vm.email,
          "upw": vm.pw
          }) 
          .then ((result) => { 
            alert("로그인 완료")
            vm.showModal = false
            console.log(result) 
          }, (error) => {
            alert("로그인 실패")
          });
      }
    },
    mounted(){
      // this.getInitTable();
      this.getMajorInit();
    }
  }
</script>

<style scoped>
@import '/css/MainStyle.css';
</style>
<style module>
</style>