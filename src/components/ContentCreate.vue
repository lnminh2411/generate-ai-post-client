<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/login" v-if="token === null">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register" v-if="token === null">Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/" @click="Logout()" v-if="token != null">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <!--Hien thi prompt duoc lay tu platform-->
            <platform-block @handlerPrompt="onSenderPrompt"></platform-block>
            <!--Gui prompt den trang detail qua bien template
                choosenTemplate: lay gia tri cua prompt tu platform
            -->
            <detail-block :template="choosenTemplate" @doLoading="onWatchLoading" @generatedContent="onHavingContent"
                @order="onHavingOrder"></detail-block>
            <result-block :resultLoading="loading" :resultContent="content" :orderDto="order"></result-block>

        </div>
    </div>
</template>

<script>

import PlatformBlock from '../components/shared/content_creator/PlatformBlock.vue';
import DetailBlock from '../components/shared/content_creator/DetailBlock.vue';
import ResultBlock from '../components/shared/content_creator/ResultBlock.vue';

export default {
    name: 'ContentCreator',
    components: {
        PlatformBlock,
        DetailBlock,
        ResultBlock
    },
    props: [],
    data() {
        return {
            choosenTemplate: "",
            loading: false,
            content: [],
            order: [],
            token: null,
        }
    },
    created() {
        this.getToken();
    },
    methods: {
        getToken() {
            this.token = localStorage.getItem("token");
            console.log(this.token)
        },
        Logout() {
            localStorage.setItem('token', null)
        },

        onSenderPrompt(pr) {
            this.choosenTemplate = pr.description
        },
        onWatchLoading(flag) {
            this.loading = flag;
        },
        onHavingContent(content) {
            this.content = content;
        },
        onHavingOrder(order) {
            this.order = order
        }
    },
}
</script>