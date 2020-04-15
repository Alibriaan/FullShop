<template>
    <v-container
    fluid
    >
    <v-row
        align="center"
        justify="center"
    >
        <v-col
        cols="12"
        sm="8"
        md="6"
        >
        <transition name="scale"  mode="out-in">
            <v-card class="elevation-12 max-w-600" v-if="this.page === 'registration'" key="registration">
                <v-toolbar
                color="primary"
                dark
                flat
                >
                <v-toolbar-title>Registration form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-form>
                    <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                    />

                    <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="[passwordRules]"
                    />
                    <v-text-field
                    id="repeat-password"
                    label="Password confirm"
                    name="repeat-password"
                    v-model="passwordRepeat"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="[passwordRules]"
                    />
                </v-form>
                </v-card-text>
                <v-card-actions class="d-flex flex-wrap">
                <v-btn class="mx-2 my-1" text small color="primary" @click="registrationFormActivate" disabled>Registration</v-btn>
                <v-btn class="mx-2 my-1" text small color="primary" @click="authorizationFormActivate">Authorization</v-btn>
                <v-spacer />
                <v-btn class="mx-2 my-1" color="primary" @click="submitRegistration" :disabled="formStatus" :loading="loading">
                    Registration
                </v-btn>
                </v-card-actions>
            </v-card>   
            <v-card class="elevation-12 max-w-600" v-if="this.page === 'authorization'" key="authorization">
                <v-toolbar
                color="primary"
                dark
                flat
                >
                <v-toolbar-title>Authorization form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-form>
                    <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                    />

                    <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    />
                </v-form>
                </v-card-text>
                <v-card-actions class="d-flex flex-wrap">
                <v-btn class="mx-2 my-1" text small color="primary" @click="registrationFormActivate">Registration</v-btn>
                <v-btn class="mx-2 my-1" text small color="primary" @click="authorizationFormActivate" disabled>Authorization</v-btn>
                <v-spacer />
                <v-btn class="mx-2 my-1" color="primary" @click="submitAuthorization" :disabled="formStatus">Login</v-btn>
                </v-card-actions>
            </v-card>
        </transition>
        </v-col>
    </v-row>
    <v-snackbar
        class="white-btn"
        v-model="snackbar"
        :timeout="1000"
        :color="shackbarColor"
    >
        {{ serverStatus }}
        <v-btn
        text
        @click="snackbar = false"
        >
        Close
        </v-btn>
    </v-snackbar>
    </v-container>
</template>
<script>
import postRegistration from '../services/AuthorizationRegistrationPage/regisration/postRegistration.js';
import postAuthorization from '../services/AuthorizationRegistrationPage/authorization/postAuthorization.js';

export default {
    name: "Registration-Authorization",
    data: () => {
        return {
            page: "registration",
            email: "",
            password: "",
            passwordRepeat: "",
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            serverStatus: "",
            snackbar: false,
            shackbarColor: "",
            loading: false
        }
    },
    computed: {
            passwordRules() {
                return this.password === this.passwordRepeat  || "Пароли не совпадают"
            },
            formStatus() {
                switch(this.page) {
                    case "registration": {
                        if(( this.email && /.+@.+\..+/.test(this.email)) && this.password === this.passwordRepeat && this.password && this.passwordRepeat) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    case "authorization": {
                        if(this.email && /.+@.+\..+/.test(this.email) && this.password) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
                return null;
            }
    },
    methods: {
        registrationFormActivate(){
            this.page = "registration";
            this.clearForm();
        },
        authorizationFormActivate(){
            this.page = "authorization";
            this.clearForm();
        },
        clearForm() {
            this.email = "";
            this.password = "";
        },
        submitRegistration() {
            this.loading = true;
            postRegistration({
                email: this.email,
                password: this.password
            })
            .then( (res) => {
                console.log(res.data);
                if(res.data.status === "Email confirmation") {
                    this.loading = false;
                    this.serverStatus = "Вам на почту отправлено письмо для активации учетной записи"
                    this.snackbar = true;
                    this.shackbarColor = "success"
                    this.page = "authorization";
                }
            })
            .catch( (err) => {
                console.log("Error");
                console.log(err.response);
                if(err.response.data.status === "Duplicate") {
                    this.serverStatus = "Учетная запись на данный адрес уже зарегистрирована";
                    this.snackbar = true;
                    this.shackbarColor = "error"
                    setTimeout( () => this.loading = false , 1000);
                } else if(err.response.data.status === "Fail") {
                    this.serverStatus = "Ошибка";
                    this.snackbar = true;
                    this.shackbarColor = "error"
                    setTimeout( () => this.loading = false , 1000);
                } else {
                    this.serverStatus = "Ошибка сервера";
                    this.snackbar = true;
                    this.shackbarColor = "error"
                    setTimeout( () => this.loading = false , 1000);
                }
            });
           
        },
        submitAuthorization() {
            postAuthorization({
                email: this.email,
                password: this.password
            })
            .then( (res) => {
                console.log("then");
                console.log(res);
                console.log(res.data);
                if(res.data.status === "Deactive account") {
                    this.serverStatus = "Вам нужно подтвердить вашу учетную запись";
                    this.snackbar = true;
                    this.shackbarColor = "error"
                } else if(res.data.status === "Success") {
                    console.log(res.data.id);
                    // this.$router.push("/");
                    document.cookie = "Session=" + res.data.id + ";";
                } else if(res.data.status === "Fail authorization") {
                    this.serverStatus = "Вам нужно подтвердить вашу учетную запись";
                    this.snackbar = true;
                    this.shackbarColor = "error"
                }
            })
            .catch( (err) => {
                console.log("Error");
                if(err.response.data.status === "Fail") {
                    this.serverStatus = "Ошибка авторизации"
                    this.snackbar = true;
                    this.shackbarColor = "error";

                } else {
                    this.serverStatus = "Ошибка сервера"
                    this.snackbar = true;
                    this.shackbarColor = "error"

                }
            });
           
        }
    }
}
</script>

<style scoped>

.max-w-600 {
    max-width: 600px;
    margin: 0 auto;
}


.scale-enter-active {
  animation: scale 0.5s;
} 
.scale-leave-active {
    animation: scale 0.5s reverse;
}

@keyframes scale {
    from{ 
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}

</style>
