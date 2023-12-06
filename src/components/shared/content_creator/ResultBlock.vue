<template>
    <div class="col-md-4">
        <div class="row">
            <h2>Results</h2>
            <div class="col-md-12" v-if="localResultLoading">LOADING</div>
            <div class="col-md-12" v-if="arrContents.length">
                <p>{{ arrContents.length }} results in this feed</p>
                <div class="content-detail" v-for="item, index in arrContents" :key="index">
                    <!-- <span>
                        <input type="checkbox" :id="`checkbox${index}`" :value="item" v-model="checkedCheckboxes">
                    </span> -->
                    <label>
                        <p>Post {{ index + 1 }}:{{ item }}</p>
                    </label>
                    <button @click="copyText(item)"><i class="fa-solid fa-copy"></i></button>
                </div>
                <button class="btn btn-success" @click="SavePost()">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'ResultBlock',
    props: {
        resultLoading: Boolean,
        msg: String,
        resultContent: Array,
        orderDto: {
            OrderDescription: String,
            PromptId: Number,
            ToneOfVoice: String,
            NumberOfResult: Number,
            NumberOfWord: Number,
            isUsingEmote: Boolean,
            isUsingHastag: Boolean,
            resultPost: Array
        },
    },
    data() {
        return {
            localResultLoading: this.resultLoading,
            arrContents: [],
            checkedCheckboxes: [],
            responseOrder: [],
            //Khaii bao cac bien data trong phan mem
        }
    },
    created() {

    },
    methods: {
        async SavePost() {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://localhost:7135/api/Orders/SavePost',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: this.responseOrder
            };
            await axios.request(config)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu từ API:', error);
                    if (error.response.status == 401)
                        router.push('/login')
                })
        },
        copyText(post) {
            navigator.clipboard.writeText(post)
                .then(() => {
                    alert("Copied post");
                }).catch((error) => {
                    alert("Error" + error)
                })
        }
    },
    watch: {
        resultLoading(_new) {
            this.localResultLoading = _new;
        },
        resultContent(_new) {
            this.arrContents = []
            _new.forEach((item) => {
                this.arrContents.push(item);
            });

        },
        orderDto(_new) {
            this.responseOrder = _new;
            this.responseOrder.resultPost = this.arrContents;
        }
    }
}
</script>
<style>
.content-detail {
    display: flex;
    align-items: center;
}
</style>