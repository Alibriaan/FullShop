<template>
    <v-container
    fluid
    >
    BASKET
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