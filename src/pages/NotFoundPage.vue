<template>
  <TheEmptyLayout>
    <template #default>
        <div class="container">
            <div class="row">
                <div class="offset-2 col-8">
                    <div class="card mt-5">
                        <div class="card-body text-center">
                            <img src="../../assets/notFound.svg" width="300"/>
                            <div class="display-3">Page not found</div>
                            <hr>
                            <router-link to="/" class="btn bg-vue">Go Back to Home</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
  </TheEmptyLayout>
</template>

<script>
import TheShopLayout from '@/layouts/TheEmptyLayout.vue';

export default {
    name: "TheEmptyLayout",
    components:  TheShopLayout 
}
</script>

<style>

</style>