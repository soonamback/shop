<template>
    <TheTwoColumnsLayout 
    :leftColumnClass="'col-md-8 bg-vue'" 
    :rightColumnClass="'col-md-4'" 
    :fullsize="true"
    >
    <template #leftCol>
    <div class="mt-5 text-center">
        <div class="display-1 my-5">The Shop</div>
        <div class="display-1 my-5">Get your exclusive Deals!</div>
        <div class="my-5 offset-4 col-4">
            <img src="../../assets/shopping.svg" class="img-fluid" />
        </div>
    </div>
   </template>
   <template #rightCol>
    <transition enter-active-class="animate__animated animate__bounceInRight"
    leave-active-class="animate__animated animate__bounceOutRight"
    mode="out-in"
    >
    <component :is="componentName" @change-component="changeComponent">

    </component> 
</transition>    
</template>

    </TheTwoColumnsLayout>
</template>
  

<script>
import TheTwoColumnsLayout from "@/layouts/TheTwoColumnsLayout"
// import TheTwoColumnsLayout from "../layouts/TheTwoColumnsLayout"
import Register from '@/components/auth/Register'
import Login from '@/components/auth/Login'
export default {
    name: "HomePage",
    components: { 
         TheTwoColumnsLayout,
         Register,
         Login 
        },
        data() { 
            return { 
                componentName: "register",
            }
        },
        methods: { 
            changeComponent(payload) { 
                this.componentName = payload.componentName;
            },
        }
}
</script>

<style scoped>

</style>