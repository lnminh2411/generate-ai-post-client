<template>
    <div class="col-md-4">
        <div class="row">
            <div class="col-md-12">
                <textarea class="form-control" id="txt" placeholder="Insert Your Prompt Here!"
                    v-model="orders.orderDescription">
                </textarea>
            </div>
            <div class="col-md-12">
                <p>Tone of voice</p>
                <button :class="{ 'btn btn-outline-dark': orders.toneOfVoice === t.name }" class="btn" v-for="t in tones"
                    :key="t.id" @click="chooseTone(t.name)">
                    {{ t.name }}
                </button>
            </div>
            <div class="col-md-12">
                <label for="numberOfWords">Number of words: </label>
                <input type="number" class="form-control" placeholder="Number of words" min="30"
                    v-model="orders.numberOfWord">
            </div>
            <div class="col-md-12">
                <label for="emote">Using emote: </label>
                <input type="checkbox" name="emote" v-model="orders.isUsingEmote">
            </div>
            <div class="col-md-12">
                <label for="hastag">Using hastag: </label>
                <input type="checkbox" name="hastag" v-model="orders.isUsingHastag">
            </div>
            <div class="col-md-12">
                <label for="numberOfResult">Number of result:</label>
                <input type="number" class="form-control" placeholder="Number of result" min="1"
                    v-model="orders.numberOfResult">
            </div>
            <div class="col-md-12">
                <button v-if="orders.orderDescription" class="btn btn-success" @click="postData()">GENERATE!</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'DetailBlock',
    props: {
        template: String
    },
    data() {
        //orderDescription la cau lenh prompt
        return {
            tones: [],
            orders: {
                orderDescription: "",
                promptId: 0,
                toneOfVoice: "",
                numberOfResult: 1,
                numberOfWord: 30,
                isUsingEmote: false,
                isUsingHastag: false
            },
            orderDetail: "",
        }
    },
    created() {

    },
    mounted() {
        this.getTones();
        this.orders.orderDescription = this.template;
    },
    methods: {
        //Cac ham khai bao o day
        async getTones() {
            await axios.get(`https://localhost:7135/api/Tones/GetAll`)
                .then(response => {
                    this.tones = response.data;
                    this.chooseTone(this.tones[0].name);
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu từ API:', error);
                })
        },

        chooseTone(name) {
            this.orders.toneOfVoice = name;
        },

        buildPrompt() {
            if (this.prompt != 0) {
                if (this.orders.numberOfResult > 0) {
                    this.orderDetail += `Write ${this.orders.numberOfResult} post about ${this.orders.orderDescription}. `
                }
                if (this.orders.numberOfWord >= 30) {
                    this.orderDetail += `Write in ${this.orders.numberOfWord} words. `
                }
                if (this.orders.isUsingEmote) {
                    this.orderDetail += 'Please use emoji in answer. '
                }
                else {
                    this.orderDetail += 'DO NOT USE ANY EMOJI OR EMOTE IN ANSWER. '
                }
                if (this.orders.isUsingHastag) {
                    this.orderDetail += 'Please use hashtag in answer. '
                }
                else {
                    this.orderDetail += 'DO NOT USE ANY HASHTAG IN ANSWER. '
                }
                if (this.selectedTone) {
                    this.orderDetail += `Write in ${this.orders.toneOfVoice} tone of voice.`
                }

            }

        },

        async postData() {
            //Hien thi loading

            this.buildPrompt();
            this.$emit('doLoading', true);
            await axios.post(`https://localhost:7135/api/Orders/GenerateContentFromChatGPT?command=${this.orderDetail}`)
                .then(response => {
                    this.$emit('doLoading', false);
                    this.postArray = response.data;
                    this.$emit('order', this.orders)
                    this.$emit('generatedContent', this.postArray);
                    this.orderDetail = ""
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu từ API:', error);
                })
        }

    },
    //Lay gia tri cua prompt tu Main
    watch: {
        template(_new) {
            this.orders.orderDescription = _new;
        }
    }
}
</script>