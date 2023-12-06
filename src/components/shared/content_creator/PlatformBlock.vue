<template>
    <div class="border-column col-md-4">
        <div class="row" v-if="prompts.length <= 0">
            <div class="col-md-3 mt-1 platform-square" v-for="p in platforms" :key="p.id" @click="getPrompts(p.id)">
                <div class="platform-container">
                    <div class="platform-icon">
                        <i :class="p.icon"></i>
                    </div>
                    <div class="platform-name">
                        {{ p.name }}
                    </div>
                </div>

            </div>

        </div>
        <div class="row" v-if="prompts.length > 0">
            <div class="col-md-12">
                <button type="btn btn-danger" @click="doBack()">BACK</button>
            </div>
            <div class="col-md-12 mt-2 prompt-container" v-for="pr in prompts" :key="pr" @click="senderPrompt(pr)">
                <p>{{ pr.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "PlatformBlock",
    prop: [],
    data() {
        return {
            prompts: [],
            platforms: []
        }
    },
    mounted() {
        this.getAllPlatform();
    },
    methods: {
        doBack() {
            this.prompts = [];
        },
        async getAllPlatform() {
            await axios.get('https://localhost:7135/api/Platforms/GetAll')
                .then(response => {
                    this.platforms = response.data;
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu từ API:', error);
                })
        },

        async getPrompts(id) {
            await axios.get(`https://localhost:7135/api/Prompts/GetByPlatformId/${id}`)
                .then(response => {
                    this.prompts = response.data;
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu từ API:', error);
                })
        },
        //Ham truyen prompt tu platform sang Main
        senderPrompt(pr) {
            this.$emit('handlerPrompt', pr);
        }
    }
}
</script>

<style>
.platform-square {
    text-align: center;
    height: 100px;
    border: 1px solid #323131;
    border-radius: 10% 10%;
    display: inline-grid;
}

.platform-container {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}

.prompt-container {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    background-color: #bcb5b5;
    border-radius: 10%;
}
</style>