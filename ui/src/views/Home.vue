<template>
    <div id="home">
        <!--text to distinguish the home page-->
        <img src="morningstar.png" width="300">
        <h1>Welcome to the KnowMe App!</h1>
        <br>
        <img src="personTwoHalf.svg" width="200" height="200">
        <br>
        <mds-form>
            <h3>Login ID</h3>
            <input id="login" size="20" label="Login ID" v-model="login">
        </mds-form>
        <h5>Please enter your 6 digit ID Number</h5>
        <br>
        <!--continue button directs to form page-->
        <mds-button @click="handleContinueClick" variation="primary"> Continue </mds-button>
        <router-view />

        <div class="popup">
            <mds-alert @click.native="refreshPage" id="error" style="display:none" variation="error" title="Form Error"
                persistent tinted>
                Please enter your six digit ID. Click to try again.
            </mds-alert>
        </div>


    </div>
</template>

<script>
import { MdsButton } from '@mds/button';
import MdsForm from '@mds/form';
import MdsAlert from '@mds/alert';


export default {
    name: 'App',
    components: {
        MdsButton,
        MdsForm,
        MdsAlert
    },
    data: function () {
        return {
            login: ''
        }
    },
    methods: {
        //when continue button is clicked, directs to form page
        handleContinueClick: function () {
            if (isNaN(this.login) || this.login === '' || this.login.length > 6 || this.login.length < 6) {
                document.getElementById('error').style.display = '';
            }
            else {
                window.location.href = '/Welcome'
            }

        },
        handleInputEvent: function (event) {
            console.log(event);
        },
        handleString: function (event) {
            console.log(event);
            console.log(this.name);
        },
        refreshPage() {
            location.reload()
        },
    }
}

</script>

<style lang="scss">
#home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

h1 {
    color:black
}

#error {
    -webkit-animation: fadein 2s linear forwards;
    animation: fadein 2s linear forwards;
}


@keyframes fadein {

    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>