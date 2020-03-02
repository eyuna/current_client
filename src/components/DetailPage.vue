<template>
    <div>
        <!-- Page Content -->
        <div class="container">

            <!-- Heading Row -->
            <div class="row align-items-center my-5">
                <div id="map" style="width:500px;height:400px;">
                </div>
                <!-- /.col-lg-8 -->
                <div class="col-lg-5">
                    <h1 class="font-weight-light">{{storeName}}</h1>
                    <p>{{adrFull}}</p>
                    <a class="btn btn-primary" href="#">Call to Action!</a>
                </div>
            <!-- /.col-md-4 -->
            </div>
            <!-- /.row -->

            <!-- Call to Action Well -->
            <div class="card text-white bg-secondary my-5 py-4 text-center">
                <div class="card-body">
                    <p class="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p>
                </div>
            </div>

            <!-- Content Row -->
            <div class="row">
                <div class="col-md-4 mb-5">
                    <div class="card h-100">
                    <div class="card-body">
                        <h2 class="card-title">Card One</h2>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-primary btn-sm">More Info</a>
                    </div>
                    </div>
                </div>
                <!-- /.col-md-4 -->
                <div class="col-md-4 mb-5">
                    <div class="card h-100">
                    <div class="card-body">
                        <h2 class="card-title">Card Two</h2>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-primary btn-sm">More Info</a>
                    </div>
                    </div>
                </div>
                <!-- /.col-md-4 -->
                <div class="col-md-4 mb-5">
                    <div class="card h-100">
                    <div class="card-body">
                        <h2 class="card-title">Card Three</h2>
                        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-primary btn-sm">More Info</a>
                    </div>
                    </div>
                </div>
            <!-- /.col-md-4 -->

            </div>
            <!-- /.row -->

        </div>
        <!-- /.container -->

        <!-- Footer -->
        <footer class="py-5 bg-dark">
            <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; Your Website 2019</p>
            </div>
            <!-- /.container -->
        </footer>

    </div>
</template>

<script>
export default {
    name: 'DetailPage',
    data () {
        return {
            storeName: '',
            adrDong:'',
            adrFull:'',
            msg:"다음맵 테스트",
            lat: 0,
            lng: 0,
            appKey: '81142bacdbe0221d377082a2157e025f',
            libraries: [], // 추가로 불러올 라이브러리
            map: null // 지도 객체
        }
    },
    created() {
        var record = this.$route.params.record;
        var vm = this;
        vm.storeName = record.storeName;
        vm.adrFull = record.adrFull;

        this.$http.get('https://dapi.kakao.com/v2/local/search/address.json', {
            headers: {
                Authorization: 'KakaoAK ' + vm.appKey
            },
            params: {
                query: vm.adrFull.split(',')[0]
            }
        })
        .then((result) => {
            vm.lng = result.data.documents[0].address.x;
            vm.lat = result.data.documents[0].address.y;

            if(vm.lng === 0 || vm.lat === 0) {
                alert("지도값이 없습니다")
            } else {
                this.initMap()
            }
        })
    },
    methods: {
        initMap() {
            var vm = this;
            var a = vm.lat;
            var b = vm.lng;
            console.log(typeof(a))
            console.log("xx" + this.lat)
            var container = document.getElementById('map'); 
            var options = { 
                // center: new kakao.maps.LatLng(37.47555060215158, 126.8675654933734), 
                center: new kakao.maps.LatLng(vm.lat, vm.lng),
                level: 3 
                }; 
                var map = new kakao.maps.Map(container, options); 
                //마커추가
                var marker = new kakao.maps.Marker({ 
                    position: map.getCenter() 
                }); 
                marker.setMap(map); 
        },
        // addScript() { 
        //     const script = document.createElement('script'); 
        //     /* global kakao */ 
        //     script.onload = () => kakao.maps.load(this.initMap); 
        //     script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=81142bacdbe0221d377082a2157e025f'; 
        //     document.head.appendChild(script); 
        // }

    },
    mounted() {
    },
}
</script>
<style scoped>

.row.align-items-center.my-5 {
    padding-left: 50px
}
</style>