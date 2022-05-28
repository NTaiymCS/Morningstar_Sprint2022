<template>
    <div id="app">
        <mds-module-container>
            <div align="left">
                <!--back to selection button-->
                <mds-button @click="handleBackButton" variation="flat" size="small" icon="caret-left"> Back
                </mds-button>
            </div>
            <mds-section container title="Goal Planning" bold>
                <mds-layout-grid>
                    <mds-row>
                        <mds-col>
                            <mds-form size="small">
                                <mds-input id="ID" @focusout="handleString" size="small" label="ID Number" v-model="ID"
                                    placeholder="123456">
                                </mds-input>
                            </mds-form>
                        </mds-col>
                        <mds-col>
                            <mds-form size="small">
                                <mds-input id="firstName" @focusout="handleString" size="small" label="First Name"
                                    placeholder="Jane" v-model="firstName">
                                </mds-input>
                            </mds-form>
                        </mds-col>
                        <mds-col>
                            <mds-form size="small">
                                <mds-input id="lastName" @focusout="handleString" size="small" label="Last Name"
                                    v-model="lastName" placeholder="Doe">
                                </mds-input>
                            </mds-form>
                        </mds-col>
                    </mds-row>

                    <br>

                    <mds-row>
                        <mds-col>
                            <mds-form size="small">
                                <mds-input id="monthlyInvestment" @focusout="handleString" size="small"
                                    label="Monthly Retirement Investment Amount" v-model="monthlyInvestment"
                                    placeholder="10000">
                                </mds-input>
                            </mds-form>
                        </mds-col>
                        <mds-col>
                            <mds-form size="small">
                                <mds-input id="desiredAgeRetired" @focusout="handleString" size="small"
                                    label="Desired Retirement Year" placeholder="2050" v-model="desiredAgeRetired">
                                </mds-input>
                            </mds-form>
                        </mds-col>
                        <mds-col>
                            <mds-form size="small">
                                <mds-input id="estAgeToRetire" @focusout="handleString" size="small"
                                    label="Age of Retirement" placeholder="60" v-model="estAgeToRetire">
                                </mds-input>
                            </mds-form>
                        </mds-col>
                    </mds-row>
                </mds-layout-grid>
                <br>
                <mds-button @click="saveResults" variation="primary" icon-right="caret-right"> Save
                </mds-button>

            </mds-section>
        </mds-module-container>

        <div class="popup">
            <mds-alert @click.native="handleHomeButton" id="success" style="display:none" variation="success" persistent
                tinted>
                Your information has been successfully updated. Click to confirm.
            </mds-alert>
            <mds-alert @click.native="refreshPage" id="error" style="display:none" variation="error" title="Form Error"
                persistent tinted>
                Please fill in all form entries to save. Click to try again.
            </mds-alert>
        </div>
    </div>
</template>



<script>
import { MdsButton } from '@mds/button';
import MdsAlert from '@mds/alert';
import { MdsLayoutGrid, MdsRow, MdsCol } from '@mds/layout-grid';
import MdsInput from '@mds/input';
import MdsForm from '@mds/form';
import MdsSection from '@mds/section';
import MdsModuleContainer from '@mds/module-container';


export default {
    name: 'App',
    components: {
        MdsButton,
        MdsAlert,
        MdsLayoutGrid,
        MdsRow,
        MdsCol,
        MdsInput,
        MdsForm,
        MdsSection,
        MdsModuleContainer,
    },


    data: function () {
        return {
            ID: '',
            firstName: '',
            lastName: '',
            monthlyInvestment: '',
            desiredAgeRetired: '',
            estAgeToRetire: ''
        }
    },

    methods: {
        //this function brings you back to the selection
        handleBackButton: function (event) {
            console.log(event);
            window.location.href = '/selection'
        },
        handleHomeButton: function (event) {
            console.log(event);
            window.location.href = '/Confirmation'
        },
        //clears all input of the form
        clearForm() {
            this.ID = '';
            this.firstName = '';
            this.lastName = '';
            this.monthlyInvestment = '';
            this.desiredAgeRetired = '';
            this.estAgeToRetire = '';
        },
        saveResults() {
            const payload = {
                ID: this.ID,
                firstName: this.firstName,
                lastName: this.lastName,
                monthlyInvestment: this.monthlyInvestment,
                desiredAgeRetired: this.desiredAgeRetired,
                estAgeToRetire: this.estAgeToRetire
            };

            if (this.ID != '' &&
                this.firstName != '' &&
                this.lastName != '' &&
                this.monthlyInvestment != '' &&
                this.desiredAgeRetired != '' &&
                this.estAgeToRetire != '') {
                document.getElementById('success').style.display = '';

                const put = new XMLHttpRequest(); //transfers data between client and server
                //open method initializes a request, open(method,url)
                put.open("PUT", "https://wllfhe2z9k.execute-api.us-east-1.amazonaws.com/beta/data"); //this is the url to api gateway
                //sets the value of the content as json type

                put.setRequestHeader("Content-Type", "application/json"); //signals that we are appending json data in json format
                console.log(JSON.stringify(payload)); //testing to see if json format will be sent
                put.send(JSON.stringify(payload)); //converts JavaScript object to json string

                this.clearForm()
            }
            else {
                document.getElementById('error').style.display = '';
            }
        },
        refreshPage() {
            location.reload()
        },


        getInfo() {
            //XML 
            const get = new XMLHttpRequest();
            get.open("GET", "https://wllfhe2z9k.execute-api.us-east-1.amazonaws.com/beta/data/123456")

            get.onload = () => {
                const data = JSON.parse(get.response);
                console.log(data);
                console.log(JSON.stringify(data));

                console.log(data.Item.ID);
                console.log(data.Item.firstName);

                document.getElementById('IDRet').textContent = data.Item.firstName;
            }

            get.send();
        }
    }
}
</script>


<style lang="scss">
@import '~@mds/typography';
@import '~@mds/constants';
@import '~@mds/link';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

#success {
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