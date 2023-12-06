<template>
    <div class="h-screen w-screen">
        <div class="flex h-full">
            <!-- Sidebar -->
            <div v-show="showSideBar">
                <div>
                    <div><router-link to="/admin">
                            ADMIN
                        </router-link>
                    </div>
                </div>
            </div>

            <router-link to="/platform">
                Platform
            </router-link>
            <router-link to="/prompt">
                Prompt
            </router-link>
            <router-link to="/tone">
                Tone
            </router-link>
            <router-link to="/order">
                Order
            </router-link>
            <!-- Main -->

            <div class="bg-gray-50  h-[calc(100%-50px)] p-[20px]">
                <div class="border rounded-md h-full p-[20px]">
                    <router-view></router-view>
                </div>
            </div>
            <!-- Main body -->
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'AdminPage',
    data() {
        return {
            showSideBar: true,
            showDropDown: false
        }
    },
    created() {
    },
    methods: {
        closeIfClickedOutside() {
            this.showDropDown = false
        },
        toggleSideBar() {
            this.showSideBar = !this.showSideBar
        },
        toggleDrop() {
            this.showDropDown = !this.showDropDown
        }
    }

}
</script>
  
<style>
.router-link-exact-active {
    @apply bg-gray-200 text-gray-800
}
</style>