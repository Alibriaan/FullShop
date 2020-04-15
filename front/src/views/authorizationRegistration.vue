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
