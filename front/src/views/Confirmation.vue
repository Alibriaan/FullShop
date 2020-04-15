<template>
    <v-container
    fluid
    >
    <v-row
        align="center"
        justify="center"
    >
    </v-row>
        <h1>{{ verificationStatus }}</h1>
        <v-btn color="primary" v-if="verificationStatus === 'Token timeout' " @click="sendNewEmail">Получить новое письмо</v-btn>
    </v-container>
</template>

<script>
import postConfirmation from '../services/AuthorizationRegistrationPage/confirmationRegistration/confirmationRegistration.js';
import repeatConfirmation from '../services/AuthorizationRegistrationPage/confirmationRegistration/repeatConfirmation.js';

export default {
    name: "Email-confirmation",
    data: () => {
        return {
            verificationStatus: "Status"
        }
    },
    methods: {
        sendNewEmail() {
            console.log("again");
            repeatConfirmation({token: this.$route.params.verificationToken})
            .then((res) => {
                console.log(res);
                console.log("Success repeat");
            })
            .catch((err) => {
                console.log(err);
                console.log("Repeat Error");
            });
        }
    },
    mounted() {
        console.log("Verification", this.$route.params.verificationToken);
        postConfirmation({token: this.$route.params.verificationToken})
        .then((res) => {
            this.verificationStatus = res.data.status;
            console.log("Success");
        })
        .catch((err) => {
            console.log(err);
            console.log("Error");
        });
    }
}
</script>

<style scoped>
</style>