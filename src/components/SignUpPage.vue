<template>
    <article class="container">
            <div class="page-header">
                <div class="col-md-6 col-md-offset-3">
                <h3>회원가입 Form</h3>
                </div>
            </div>
            <div class="col-sm-6 col-md-offset-3">
                <form role="form">
                    <div class="form-group">
                        <label for="inputName">성명</label>
                        <input type="text" v-model = "name" class="form-control" id="inputName" placeholder="이름을 입력해 주세요">
                    </div>
                    <div class="form-group">
                        <label for="InputEmail">이메일 주소</label>
                        <input type="email" v-model = "email" class="form-control" id="InputEmail" placeholder="이메일 주소를 입력해주세요">
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">비밀번호</label>
                        <input type="password" v-model = "pw" class="form-control" id="inputPassword" placeholder="비밀번호를 입력해주세요">
                    </div>
                    <div class="form-group">
                        <label for="inputPasswordCheck">비밀번호 확인</label>
                        <input type="password" v-model = "repw" class="form-control" id="inputPasswordCheck" placeholder="비밀번호 확인을 위해 다시한번 입력 해 주세요">
                    </div>
                    <br><br>
                    <div class="form-group text-center">
                        <button type="submit" v-on:click="submit" id="join-submit" class="btn btn-primary">
                            회원가입<i class="fa fa-check spaceLeft"></i>
                        </button>
                        <button type="submit" class="btn btn-warning">
                            가입취소<i class="fa fa-times spaceLeft"></i>
                        </button>
                    </div>
                </form>
            </div>
        </article>
</template>

<script>
export default {
    name: 'SignUpPage',
    data () {
        return {
            name: '',
            email: '',
            pw: '',
            repw: '',
        }
    },
    methods:{
        submit() {
            var vm = this;
            this.$http.get('http://localhost/member', {
                params: {
                    uname: vm.name,
                    upw: vm.pw,
                    uemail: vm.email
                    }
                })
                .then((result) => {
                    alert("가입이 완료되었습니다.")
                    this.$router.replace('/main')
                    })
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
.page-header {
    display: block;
}
</style>