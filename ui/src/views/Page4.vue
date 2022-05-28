<template>
  <div id="app">

    <mds-module-container>
      <div style="text-align: left">
        <mds-button @click="handleBackButton" size="small" variation="flat" style="color:gray;"> &lt; Back </mds-button>
      </div>

      <div>
        <h3 style="color:black;" align="left"><b>Goal Planning</b></h3>
      </div>


      <mds-module-container>
        <mds-section border-position="bottom" :size="4" :bold="true" title="Visual Style">
          <h4 style="color: #565656;" align="left">Introduction</h4>
          <p align="left">Have you ever heard the phrase, "If you aim at nothing, you'll hit it every time?"</p>
          <p align="left">It's the same with your financial plan. If you don't have a target, a goal, or certain outcome
            in mind, it's hard to know what's achievable, and impossible to understand what you need to do to get there.
          </p>
          <p align="left">That's why a financial plan usually starts with some imagining! From a financial perspective,
            what sorts of things do you want to buy, fund, or enable in the future, and when?</p>
          <p align="left">Depending on where you are in life, some goals will be clear, while others may be fuzzy. If
            you're not sure exactly what kind of retirement you want, what kinds of travel you'll do, or which major
            purchases you'll need to make, that's totally fine. Start with a fuzzy target now, and as time passes and
            things get clearer, you can get more specific and make adjustments - your financial plan will eveolve as you
            do!</p>
          <p align="left">What you don't want to do is wait until everything is crystal clear, because you'll lose
            valuable time that your savings could otherwise be working hard for you. It's much more important to start
            planning now versus knowing exactly what you want in the future. Starting now, even with a fuzzy notion of
            your goal, will give you more flexibility to do the things you'll want to do in the future, however they
            shape up</p>
          <p align="left">Fuzzy or crystal clear, your goals will help you create a starting plan for you and your
            family, and then we'll discuss the choices and trade-offs you can make to craft a truly personalized plan
            that fits your needs, and adapt that plan over time.</p>

          <div>
            <mds-form>
              <mds-checkbox value="accept"><small> Don't show me this again </small> </mds-checkbox>
            </mds-form>
          </div>

          <div style="text-align: right">
            <mds-button @click="handleLetsBeginButton" variation="primary"> Let's Begin </mds-button>
          </div>
        </mds-section>
      </mds-module-container>
    </mds-module-container>


  </div>
</template>

<script>
import { MdsButton } from '@mds/button';
import MdsModuleContainer from '@mds/module-container'
import MdsCheckbox from '@mds/checkbox'


export default {
  name: 'App',
  components: {
    MdsButton,
    MdsModuleContainer,
    MdsCheckbox
  },
  methods: {
    //this function brings you back to the homepage
    handleBackButton: function (event) {
      console.log(event);
      window.location.href = '/Welcome'
    },
    //this function brings you back to the homepage
    handleLetsBeginButton: function (event) {
      console.log(event);
      window.location.href = '/Selection'
    }
  }
}
</script>

<style lang="scss">
@import "../style/main";
</style>