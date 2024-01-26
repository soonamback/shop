<template>
    <div>
        <div class="my-5 text-center offset-2 col-8">
            <img src="../../../assets/welcome.svg" class="img-fluid" />
        </div>
        <div class="text-center">
            <h2>Register Now</h2>
            <p>
                Or
                <a class="text-vue2" role="button" @click="changeComponent('login')">Login with your Account</a>
            </p>
        </div>
        <div class="alert alert-danger col-md-8 offset-2" v-if="error">
            {{ errorDisplayText }}
        </div>
        <Form @submit="submitData" :validation-schema="schema" v-slot="{ errors }">
            <div class="form-row">
                <div class="form-group col-md-8 offset-2">
                    <label for="email"><strong>E-Mail</strong></label>
                    <Field as="input" name="email" type="email" class="form-control" id="email" />
                    <small class="text-danger" v-if="errors.email">
                        {{ errors.email }}
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-8 offset-2">
                    <label for="password"><strong>Password</strong></label>
                    <Field as="input" name="password" type="password" class="form-control" id="password" />
                    <small class="text-danger" v-if="errors.password">
                        {{ errors.password }}
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-8 offset-2">
                    <label for="confirmPassword"><strong>Repeat Password</strong></label>
                    <Field as="input" name="confirmPassword" type="password" class="form-control" id="confirmPassword" />
                    <small class="text-danger" v-if="errors.confirmPassword">
                        {{ errors.confirmPassword }}
                    </small>
                </div>
            </div>
            <div class="form-row mt-3">
                <div class="form-group col-md-8 offset-2">
                    <div class="d-grid">
                        <button class="btn bg-vue">
                            <span v-if="!isLoading">Register</span>
                            <span v-else class="spinner-border spinner-border-sm"></span></button>
                    </div>
                </div>
            </div>
        </Form>
    </div>
</template>
  
<script>
import { Form, Field } from 'vee-validate';
import * as yup from "yup";


export default {
    name: "Register",
    components: {
        Form,
        Field
    },
    emits: {
        'change-component': (payload) => {
            if (payload.componentName !== "login") {
                return false;
            }
            return true;
        },
    },
    data() {
        const schema = yup.object().shape({
            email: yup.string().required().trim().email("Not a valid Email Adress"),
            password: yup.string().required("You need a Password").min(6, "at least 6 digits/signs/letters required"),
            confirmPassword: yup.string().oneOf([yup.ref("password")], "Password do not match")
        })
        return {
            schema,
            error: "",
            isLoading: false
        };
    },
    computed: {
        errorDisplayText() {
            if (this.error) {
                if (this.error.includes("EMAIL_EXISTS")) {
                    return "The Email already exists"
                }
                return "Unknown Error. Please try again"
            }
            return ""
        }
    },
    methods: {
        submitData(values) {
            this.isLoading = true
            this.error = ""
            this.$store.dispatch("signup", {
                email: values.email,
                password: values.password
            }).then(() => {
                this.isLoading = false
                this.changeComponent("login")
            })
                .catch((error) => {
                    this.error = error.message
                    this.isLoading = false
                })

        },
        changeComponent(componentName) {
            this.$emit("change-component", { componentName })
        }
    }
};
</script>
  
<style scoped></style>