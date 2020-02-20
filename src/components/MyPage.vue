<template>
    <div>
        <h2>마이페이지 성공~!</h2>
        <router-link to="/main" tag="button">home</router-link>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    data () {
        return {
            usable: false,
            accessToken: ''
        }
    },
    methods: {
        isUsable() {
            var accessToken = $cookies.get('accessToken')
            this.$http.get('http://localhost/member/tkcheck', {
                params: {
                    jwt: accessToken
                    }
                })
                .then((res) => {
                    console.log(res.data)
                    this.usable = res.data
                    })
        }
        
    },
    mounted() {
        this.isUsable()
    },
}
</script>