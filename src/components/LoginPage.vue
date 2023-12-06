<template>
    <div>
        <h2>Registration Form</h2>
        <div id="app">
            <form @submit.prevent="login">
                <div class="username">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="loginUser.username" required>
                    <span v-if="errors.username" class="error">{{ errors.username }}</span>
                </div>
                <div class="password">
                    <label for="password">Password:</label>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="loginUser.password" required>
                    <i :class="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" @click="displayPassword()"></i>
                    <span v-if="errors.password" class="error">{{ errors.password }}</span>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>
<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'LoginPage',
    data() {
        return {
            loginUser: {
                username: '',
                password: '',
            },
            errors: {},
            showPassword: false
        };
    },
    methods: {
        displayPassword() {
            this.showPassword = !this.showPassword;
        },
        async login() {
            this.errors = {};
            if (!this.loginUser.username) this.errors.username = 'Username is required.';
            if (!this.loginUser.password) this.errors.password = 'Password is required.';

            if (Object.keys(this.errors).length === 0) {

                await axios.post('https://localhost:7135/api/Authentication/Login', this.loginUser)
                    .then(response => {
                        console.log('Login successful');
                        localStorage.setItem("token", response.data.token)
                        router.push('/')
                    })
                    .catch(error => {
                        console.error('Login failed', error);
                        alert("Username or password wrong")
                    });
            }

        }
    }
}
</script>
<style scoped></style>