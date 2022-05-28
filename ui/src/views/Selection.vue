<template>
    <div id="app">
        <mds-module-container>
            <div align="left">
                <!--back to homepage button-->
                <mds-button @click="handleBackButton" variation="flat" size="small" icon="caret-left"> Back
                </mds-button>
            </div>
            <mds-section container title="Goal Planning" bold>
                <br>
                <mds-layout-grid>
                    <mds-row class="mdsRow">
                        <mds-col :cols="2">
                        </mds-col>
                        <mds-col>
                            <div class="flipCard" @click="toggleGoal(0)" :class="{ highlight: goalSelected(0) }">
                                <div class="flipCardInner">
                                    <div class="flipCardFront">
                                        <mds-card style=" width: 10rem; height: 10rem" size="small"
                                            title="Quick Retirement" align="center" logoimage="fund.icon"
                                            supplemental-content-first href="#" full-bleed>
                                            <template v-slot:mds-card-supplemental-content>
                                                <div align="center">
                                                    <img src="chartLineGrowth.svg" width="100px" height="100px">
                                                </div>
                                            </template>
                                        </mds-card>
                                    </div>
                                    <div class="flipCardBack">
                                        <mds-card style=" width: 10rem; height: 10rem" title="Quick Retirement"
                                            @data="false">
                                            <span style="font-weight:normal">Recommended for folks younger than
                                                50</span>
                                        </mds-card>
                                    </div>
                                </div>
                                <!-- </div> // extra -->
                            </div>
                        </mds-col>

                        <mds-col>
                            <div class="flipCard" @click="toggleGoal(1)" :class="{ highlight: goalSelected(1) }">
                                <div class="flipCardInner">
                                    <div class="flipCardFront">
                                        <mds-card style=" width: 10rem; height: 10rem" size="small"
                                            title="Detailed Retirement" align="center" logoimage="fund.icon"
                                            supplemental-content-first href="#" full-bleed>
                                            <template v-slot:mds-card-supplemental-content>
                                                <div align="center">
                                                    <img src="chartGrowthCombo.svg" width="100px" height="100px">
                                                </div>
                                            </template>
                                        </mds-card>
                                    </div>
                                    <div class="flipCardBack">
                                        <mds-card style=" width: 10rem; height: 10rem">
                                            <span style="font-weight:normal">Recommended for folks older than 50</span>
                                        </mds-card>
                                    </div>
                                </div>
                            </div>
                        </mds-col>

                        <mds-col class="mdsCard">
                            <div class="flipCard" @click="toggleGoal(2)" :class="{ highlight: goalSelected(2) }">
                                <div class="flipCardInner">
                                    <div class="flipCardFront">
                                        <mds-card class="mdsCard" style=" width: 10rem; height: 10rem" size="small"
                                            title="College" align="center" logoimage="fund.icon"
                                            supplemental-content-first href="#" full-bleed>
                                            <template v-slot:mds-card-supplemental-content>
                                                <div align="center">
                                                    <img src="graduatecap.svg" width="100px" height="100px">
                                                </div>
                                            </template>
                                        </mds-card>
                                    </div>
                                    <div class="flipCardBack">
                                        <mds-card style=" width: 10rem; height: 10rem" supplemental-content-first
                                            href="#">
                                            <span style="font-weight:normal">Recommended for parents</span>
                                        </mds-card>
                                    </div>
                                </div>
                            </div>
                        </mds-col>

                        <mds-col class="mdsCard">
                            <div class="flipCard" @click="toggleGoal(3)" :class="{ highlight: goalSelected(3) }">
                                <div class="flipCardInner">
                                    <div class="flipCardFront">
                                        <mds-card class="mdsCard" style=" width: 10rem; height: 10rem" size="small"
                                            title="Home Downpayment" align="center" logoimage="fund.icon"
                                            supplemental-content-first href="#" full-bleed>
                                            <template v-slot:mds-card-supplemental-content>
                                                <div align="center">
                                                    <img src="house.svg" width="100px" height="100px">
                                                </div>
                                            </template>
                                        </mds-card>
                                    </div>
                                    <div class="flipCardBack">
                                        <mds-card style=" width: 10rem; height: 10rem">
                                            <span style="font-weight:normal">Recommended for families</span>
                                        </mds-card>
                                    </div>
                                </div>
                            </div>
                        </mds-col>

                        <mds-col :cols="2">
                        </mds-col>
                    </mds-row>

                    <mds-row>
                        <mds-col :cols="2">
                        </mds-col>

                        <mds-col class="mdsCard">
                            <div class="flipCard" @click="toggleGoal(4)" :class="{ highlight: goalSelected(4) }">
                                <div class="flipCardInner">
                                    <div class="flipCardFront">
                                        <mds-card class="mdsCard" style=" width: 10rem; height: 10rem" size="small"
                                            title="Car/Boat" align="center" logoimage="fund.icon"
                                            supplemental-content-first href="#" full-bleed>
                                            <template v-slot:mds-card-supplemental-content>
                                                <div align="center">
                                                    <img src="car.svg" width="100px" height="100px">
                                                </div>
                                            </template>
                                        </mds-card>
                                    </div>
                                    <div class="flipCardBack">
                                        <mds-card style=" width: 10rem; height: 10rem">
                                            <span style="font-weight:normal">Recommended for parents</span>
                                        </mds-card>
                                    </div>
                                </div>
                            </div>
                        </mds-col>

                        <mds-col class="mdsCard">
                            <div class="flipCard" @click="toggleGoal(5)" :class="{ highlight: goalSelected(5) }">
                                <div class="flipCardInner">
                                    <div class="flipCardFront">
                                        <mds-card class="mdsCard" style=" width: 10rem; height: 10rem" size="small"
                                            title="Travel" align="center" logoimage="fund.icon"
                                            supplemental-content-first href="#" full-bleed>
                                            <template v-slot:mds-card-supplemental-content>
                                                <div align="center">
                                                    <img src="airplane.svg" width="100px" height="100px">
                                                </div>
                                            </template>
                                        </mds-card>
                                    </div>
                                    <div class="flipCardBack">
                                        <mds-card style=" width: 10rem; height: 10rem">
                                            <span style="font-weight:normal">Recommended for young adults</span>
                                        </mds-card>
                                    </div>
                                </div>
                            </div>
                        </mds-col>

                        <mds-col class="mdsCard">
                            <div class="flipCard" @click="toggleGoal(6)" :class="{ highlight: goalSelected(6) }">
                                <div class="flipCardInner">
                                    <div class="flipCardFront">
                                        <mds-card class="mdsCard" style=" width: 10rem; height: 10rem" size="small"
                                            title="Marriage" align="center" logoimage="fund.icon"
                                            supplemental-content-first href="#" full-bleed>
                                            <template v-slot:mds-card-supplemental-content>
                                                <div align="center">
                                                    <img src="personTwoHalf.svg" width="100px" height="100px">
                                                </div>
                                            </template>
                                        </mds-card>
                                    </div>
                                    <div class="flipCardBack">
                                        <mds-card style=" width: 10rem; height: 10rem">
                                            <span style="font-weight:normal">Recommended for couples</span>
                                        </mds-card>
                                    </div>
                                </div>
                            </div>
                        </mds-col>

                        <mds-col class="mdsCard">
                            <div class="flipCard" @click="toggleGoal(7)" :class="{ highlight: goalSelected(7) }">
                                <div class="flipCardInner">
                                    <div class="flipCardFront">
                                        <mds-card class="mdsCard" style=" width: 10rem; height: 10rem" size="small"
                                            title="Other" align="center" logoimage="fund.icon"
                                            supplemental-content-first href="#" full-bleed>
                                            <template v-slot:mds-card-supplemental-content>
                                                <div align="center">
                                                    <img src="lightbulbilluminated.svg" width="100px" height="100px">
                                                </div>
                                            </template>
                                        </mds-card>
                                    </div>
                                    <div class="flipCardBack">
                                        <mds-card style=" width: 10rem; height: 10rem">
                                            <span style="font-weight:normal">Recommended for anything else</span>
                                        </mds-card>
                                    </div>
                                </div>
                            </div>
                        </mds-col>

                        <mds-col :cols="2">
                        </mds-col>
                    </mds-row>
                </mds-layout-grid>

                <br>
                <br>

                <div style="text-align: center">
                    <mds-button variation="primary" :disabled="!anyGoalsSelected()" @click.native="goToForm"> Continue
                    </mds-button>
                </div>

            </mds-section>
        </mds-module-container>

    </div>
</template>

<script>
import { MdsButton } from '@mds/button';
// import MdsAlert from '@mds/alert';
// import MdsTooltip from '@mds/tooltip';
import { MdsLayoutGrid, MdsRow, MdsCol } from '@mds/layout-grid';
import MdsCard from '@mds/card';
import MdsSection from '@mds/section';
import MdsModuleContainer from '@mds/module-container';

export default {
    name: 'App',
    components: {
        MdsButton,
        MdsLayoutGrid,
        MdsRow,
        MdsCol,
        MdsCard,
        MdsSection,
        MdsModuleContainer
    },
    data() {
        return {
            isContinueBtnDisabled: true,
            selectedGoals: [false, false, false, false, false, false, false, false]
        }
    },
    methods: {
        goToForm() {
            window.location.href = '/form'
        },
        //this function brings you back to the homepage
        handleBackButton: function (event) {
            console.log(event);
            window.location.href = '/Introduction'
        },
        handleCollegeButton: function (event) {
            console.log(event);
            window.location.href = '/College'
        },
        toggleGoal: function (goalNum) {
            this.selectedGoals.splice(goalNum, 1, !this.selectedGoals[goalNum]);
            console.log(this.selectedGoals);
        },
        anyGoalsSelected: function () {
            return this.selectedGoals.some(x => x);
        },
        goalSelected: function (goalNum) {
            console.log("GOALNUM>>", goalNum);
            return this.selectedGoals[goalNum];
        }
    }
}
</script>

<style lang="scss">
@import "../style/main";
.highlight {
    box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.mdsRow {
    padding-bottom: 15px;
}

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flipCard {
    background-color: transparent;
    width: 10rem;
    height: 10rem;
    perspective: 1000px;
    cursor: pointer;
    border-radius: 6px;
    /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flipCardInner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flipCard:hover .flipCardInner {
    transform: rotateY(180deg);
}

/* Position the front and back side */
.flipCardFront,
.flipCardBack {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    /* Safari */
    backface-visibility: hidden;
}


/* Style the back side */
.flipCardBack {
    color: white;
    transform: rotateY(180deg);
}
</style>