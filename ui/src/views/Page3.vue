<template>
    <div id="app">
        <mds-module-container>
            <div style="text-align: left">
                <mds-button @click="handleBackButton" size="small" variation="flat" style="color:gray;"> &lt; Back
                </mds-button>
            </div>


            <mds-module-container>
                <mds-section border-position="bottom" :size="4" :bold="true" title="Visual Style">
                    <h2 style="color: #565656;" align="left">Welcome!</h2>
                    <p>Please complete your profile so we can help you and your family create a personalized financial
                        plan</p>
                    <br>
                    <p>
                        <font size="+1.5">Know Yourself</font>
                    </p>
                    <hr>
                    <mds-layout-grid>
                        <mds-row>
                            <mds-col>
                                <mds-module-container> <strong>My Profile</strong>
                                    <p>Already completed something? Click to load your saved data.</p>
                                    <div style="text-align: center">
                                        <mds-button @click="handleLoadButton" variation="secondary"> Load </mds-button>
                                    </div>
                                </mds-module-container>
                            </mds-col>
                        </mds-row>
                        <mds-row>
                            <mds-col>
                                <mds-module-container> <strong>Me and My Family</strong>
                                    <p>Tell us more about you and your family. By sharing this data, we will be able to
                                        create a suitable plan for your financial well being.</p>
                                    <div style="text-align: center">
                                        <mds-button variation="secondary"> Let's Begin </mds-button>
                                    </div>
                                </mds-module-container>
                            </mds-col>
                            <mds-col>
                                <mds-module-container> <strong>My Risk Appetite</strong>
                                    <p>The Morningstar Risk Tolerance Test will help us figure out the right amount to
                                        risk to take in your portfolio.</p>
                                    <div style="text-align: center">
                                        <mds-button variation="secondary"> Take the Test </mds-button>
                                    </div>
                                </mds-module-container>
                            </mds-col>
                        </mds-row>
                        <mds-row>
                            <mds-col>
                                <mds-module-container> <strong>My Financial Mindset</strong>
                                    <p>Take our short quiz to learn more about your financial personality and what you
                                        can do to give yourself an edge.</p>
                                    <div style="text-align: center">
                                        <mds-button variation="secondary"> Show me How </mds-button>
                                    </div>
                                </mds-module-container>
                            </mds-col>
                            <mds-col>
                                <mds-module-container> <strong>Goal Planning</strong>
                                    <p>See how soon you can retire and how much to save for your future. Once you add a
                                        goal, it will show up here for you to track.</p>
                                    <div style="text-align: center">
                                        <mds-button @click="handleAddYourGoalsButton" variation="secondary"> Add Your
                                            Goals </mds-button>
                                    </div>
                                </mds-module-container>
                            </mds-col>
                        </mds-row>
                    </mds-layout-grid>

                    <br>

                    <p>
                        <font size="+1.5">Know Your Finances</font>
                    </p>
                    <hr>
                    <p>Complete the Know Yourself section to unlock this section</p>
                    <div class="blur">



                        <mds-layout-grid>
                            <mds-row>
                                <mds-col>
                                    <mds-module-container> <strong>My Profile</strong>
                                        <p>Already completed something? Click to load your saved data.</p>
                                    </mds-module-container>
                                </mds-col>
                            </mds-row>
                            <mds-row>
                                <mds-col>
                                    <mds-module-container> <strong>Me and My Family</strong>
                                        <p>Tell us more about you and your family. By sharing this data, we will be able
                                            to create a suitable plan for your financial well being.</p>
                                    </mds-module-container>
                                </mds-col>
                                <mds-col>
                                    <mds-module-container> <strong>My Risk Appetite</strong>
                                        <p>The Morningstar Risk Tolerance Test will help us figure out the right amount
                                            to risk to take in your portfolio.</p>
                                    </mds-module-container>
                                </mds-col>
                            </mds-row>
                            <mds-row>
                                <mds-col>
                                    <mds-module-container> <strong>My Financial Mindset</strong>
                                        <p>Take our short quiz to learn more about your financial personality and what
                                            you can do to give yourself an edge.</p>
                                    </mds-module-container>
                                </mds-col>
                                <mds-col>
                                    <mds-module-container> <strong>Goal Planning</strong>
                                        <p>See how soon you can retire and how much to save for your future. Once you
                                            add a goal, it will show up here for you to track.</p>
                                    </mds-module-container>
                                </mds-col>
                            </mds-row>
                        </mds-layout-grid>


                        <img src="chart.jpg" alt="chart">
                    </div>



                    <br>
                    <br>
                    <br>
                    <br>

                    <p>
                        <font size="+1.5">Know Your Path Ahead</font>
                    </p>
                    <hr>
                    <p>Complete the Know Your Finances section to unlock this section</p>
                    <div class="blur">



                        <mds-layout-grid>
                            <mds-row>
                                <mds-col>
                                    <mds-module-container> <strong>My Profile</strong>
                                        <p>Already completed something? Click to load your saved data.</p>
                                    </mds-module-container>
                                </mds-col>
                            </mds-row>
                            <mds-row>
                                <mds-col>
                                    <mds-module-container> <strong>Me and My Family</strong>
                                        <p>Tell us more about you and your family. By sharing this data, we will be able
                                            to create a suitable plan for your financial well being.</p>
                                    </mds-module-container>
                                </mds-col>
                                <mds-col>
                                    <mds-module-container> <strong>My Risk Appetite</strong>
                                        <p>The Morningstar Risk Tolerance Test will help us figure out the right amount
                                            to risk to take in your portfolio.</p>
                                    </mds-module-container>
                                </mds-col>
                            </mds-row>
                            <mds-row>
                                <mds-col>
                                    <mds-module-container> <strong>My Financial Mindset</strong>
                                        <p>Take our short quiz to learn more about your financial personality and what
                                            you can do to give yourself an edge.</p>
                                    </mds-module-container>
                                </mds-col>
                                <mds-col>
                                    <mds-module-container> <strong>Goal Planning</strong>
                                        <p>See how soon you can retire and how much to save for your future. Once you
                                            add a goal, it will show up here for you to track.</p>
                                    </mds-module-container>
                                </mds-col>
                            </mds-row>
                        </mds-layout-grid>

                        <img src="lines.png" alt="lines">


                    </div>
                </mds-section>
            </mds-module-container>
        </mds-module-container>



    </div>
</template>

<script>
import { MdsButton } from '@mds/button';
import { MdsLayoutGrid, MdsRow, MdsCol } from '@mds/layout-grid';
import MdsModuleContainer from '@mds/module-container'


export default {
    name: 'App',
    components: {
        MdsButton,
        MdsLayoutGrid,
        MdsRow,
        MdsCol,
        MdsModuleContainer,
    },
    methods: {
        //this function brings you back to the homepage
        handleBackButton: function (event) {
            console.log(event);
            window.location.href = '/'
        },
        //this function brings you back to the homepage
        handleAddYourGoalsButton: function (event) {
            console.log(event);
            window.location.href = '/Introduction'
        },
        handleLoadButton: function (event) {
            console.log(event);
            window.location.href = '/Confirmation'
        }
    }
}


</script>

<style lang="scss">
@import "../style/main";

.blur {
    filter: blur(11px)
}
</style>