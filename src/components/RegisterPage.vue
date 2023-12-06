<template>
    <div>
        <h2>Registration Form</h2>
        <div id="app">
            <form @submit.prevent="register">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="registerUser.name" required>
                    <span v-if="errors.name" class="error">{{ errors.name }}</span>
                </div>

                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="registerUser.email" required>
                    <span v-if="errors.email" class="error">{{ errors.email }}</span>
                </div>

                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="registerUser.username" required>
                    <span v-if="errors.username" class="error">{{ errors.username }}</span>
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="registerUser.password"
                        required>
                    <i :class="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" @click="displayPassword()"></i>
                    <span v-if="errors.password" class="error">{{ errors.password }}</span>
                </div>

                <div>
                    <label for="repeat-password">Repeat Password:</label>
                    <input type="password" id="repeat-password" v-model="repeatPassword" required>
                    <span v-if="errors.repeatPassword" class="error">{{ errors.repeatPassword }}</span>
                </div>

                <div>
                    <label for="phone">Phone:</label>
                    <input type="tel" id="phone" v-model="registerUser.phone" required>
                    <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
                </div>


                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>
<script>
import router from '@/router';
import axios from 'axios';
export default {
    name: 'RegisterPage',
    data() {
        return {
            registerUser: {
                name: '',
                email: '',
                username: '',
                password: '',
                phone: ''
            },
            repeatPassword: '',
            errors: {},
            showPassword: false
        };
    },
    methods: {
        displayPassword() {
            this.showPassword = !this.showPassword;
        },
        async register() {
            this.errors = {};
            if (!this.registerUser.name) this.errors.name = 'Name is required.';
            if (!this.registerUser.email) this.errors.email = 'Email is required.';
            if (!this.registerUser.username) this.errors.username = 'Username is required.';
            if (!this.registerUser.password) this.errors.password = 'Password is required.';
            if (this.registerUser.password !== this.repeatPassword) {
                this.errors.repeatPassword = 'Passwords do not match.';
            }
            if (!this.registerUser.phone) this.errors.phone = 'Phone is required.';
            if (Object.keys(this.errors).length === 0) {
                await axios.post('https://localhost:7135/api/Authentication/Register', this.registerUser)
                    .then(response => {
                        console.log('Registration successful', response);
                        router.push('/login')
                    })
                    .catch(error => {
                        console.error('Registration failed', error);
                    });
            }

        }
    }
}
</script>