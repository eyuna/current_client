<template>
  <div>
    <div id="nav">
      <b-nav align="right">
        <!-- <b-nav-item href="/#/login" active>Login</b-nav-item> -->
        <b-nav-item v-if="tk" @click="logout">Logout</b-nav-item>
        <b-nav-item v-else @click="showModal = true" active>Login</b-nav-item>
        <b-nav-item href="/mypage" >MyPage</b-nav-item>
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
        <b-table striped hover :items="tableItems" @row-clicked="myRowClickHandler" :fields="fields"></b-table>
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
                  <a href="/signup">회원이 아니신가요?</a>
                  <button type="button" @click="login">Log In</button>
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
        pw:'',
        usable: false,
        // tk: localStorage.getItem('accessToken')
        tk: this.$store.state.accessToken
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
          vm.majorOpt = result.data.data;
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
          vm.text = ''
        })
      },
      submit() { // TODO 1: NullException
      // TODO 2: opt initialize
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
          uemail: vm.email,
          upw: vm.pw
          }) 
          .then ((result) => { 
            vm.showModal = false
            alert("로그인 완료")
            // console.log(result.data.data.accessToken) 
            this.$store.dispatch('MLOGIN', { accessToken: result.data.data.accessToken })
            // document.cookie = `accessToken=${result.data.data.accessToken}`;
            this.$http.defaults.headers.common['Authorization'] = result.data.data.accessToken
            location.reload()
          }, (error) => {
            alert("로그인 실패")
          });
      },
      logout() {
        var vm = this;
        this.$store.dispatch('LOGOUT')
        alert("로그아웃 되었습니다.")
        location.reload()
      },
      isUsable() {
            // var accessToken = $cookies.get('accessToken')
            this.$http.get('http://localhost/member/tkcheck', {
                params: {
                    jwt: accessToken
                    }
                })
                .then((res) => {
                    // console.log(res.data)
                    this.usable = res.data
                    })
      },
      myRowClickHandler(record, index) {
        // console.log(record)
        // alert(index)
        this.$router.push({
          name: 'DetailPage',
          params: { record }
        })
      }
    },
    mounted(){
      // this.getInitTable();
      this.getMajorInit();
      // this.isUsable();
    }
  }
</script>

<style scoped>
@import '/css/MainStyle.css';
</style>
<style module>
</style>