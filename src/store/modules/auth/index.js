import { firebaseApiKey } from "../../../config/fireApiKey";
import axios from 'axios'

let timer;

const state =  {
        userId: null,
        token: null,
}
const mutations = {
        setUser(state, payload) { 
            state.userId = payload.userId;
            state.token = payload.token
        },
    }
const actions = {
        auth(context, payload) {
            let url = "";
            if(payload.mode === "signin"){
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`
            } else if (payload.mode === "signup") {
               url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`
            } else {
                return;
            }
            const authDO = {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            }
            return axios
            .post(url, authDO)
            .then((response) => {
                //save data in localstorage
                const expiresIn = Number(response.data.expiresIn ) * 1000 
                // const expiresIn = 3 * 1000 
                const expDate = new Date().getTime() + expiresIn;
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                localStorage.setItem("expiresIn", expDate);

                    timer = setTimeout(() => {
                    context.dispatch("autoSignout")
                    },expiresIn)    
                
                context.commit('setUser', {
                userId: response.data.localId,
                token: response.data.idToken
            } )
        }).catch((error) => {
            const errorMessage = new Error(error.response.data.error.message || "UNKOWN_ERROR")
            throw errorMessage

        })
        },
        signup(context, payload) {
            const signupDO = {
                ...payload,
                mode: "signup",
            };
            return context.dispatch("auth", signupDO)
     
        },
        signin(context, payload) {
            const signInDO = {
                ...payload,
                mode: "signin"
            }
            return context.dispatch("auth", signInDO)
        },
        autoSignin(context) {
            const token = localStorage.getItem("token")
            const userId = localStorage.getItem("userId")
            const expiresIn = localStorage.getItem("expiresIn")
            const timeLeft = Number(expiresIn) - new Date().getTime();

            if(timeLeft < 0) {
                return;
            }
            
            timer = setTimeout(() => {
                context.dispatch("autoSignout")
            }, expiresIn)
            if(token && userId) {
                context.commit("setUser", {
                    token: token,
                    userId: userId
                })
            }

        },
        signout(context) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("expiresIn");
            
            clearTimeout(timer)
            
            context.commit("setUser", {
                token: null,
                userId: null
            })
        },
        autoSignout(context) {
            context.dispatch("signout");
        }
     
    }


const getters = {
    isAuthenticated: (state) => !!state.token,
    token: (state) => state.token,
}

const authModule = {
    state,
    mutations,
    actions,
    getters
}

export default authModule;