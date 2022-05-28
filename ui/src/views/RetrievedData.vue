<template>
  <div id="app">
    <mds-module-container>
      <div align="left">
        <!--back to homepage button-->
        <mds-button @click="handleBackButton" variation="flat" size="small" icon="caret-left"> Back
        </mds-button>
      </div>
      <mds-section container title="Your Information" bold>
        <p>ID: <span id="IDRet"></span></p>
        <p>First Name: <span id="FNRet"></span></p>
        <p>Last Name: <span id="LNRet"></span></p>
        <p>Monthly Retirement Amount Goal: <span id="MRRet"></span></p>
        <p>Retirement Date Goal: <span id="RDRet"></span></p>
        <p>Retirement Age Goal: <span id="RARet"></span></p>
        <br>
        <mds-button @click="getInfo" variation="secondary" size="medium"> Load Info
        </mds-button>
        <br>
        <br>
        <mds-button @click="handleConfirmButton" variation="primary" size="medium"> Confirm and Logout
        </mds-button>
      </mds-section>
    </mds-module-container>
  </div>

</template>

<script>
import { MdsButton } from '@mds/button';
import MdsModuleContainer from '@mds/module-container'
import MdsSection from '@mds/section';


export default {
  name: 'App',
  components: {
    MdsButton,
    MdsModuleContainer,
    MdsSection
  },
  methods: {
    //this function brings you back to the homepage
    handleBackButton: function (event) {
      console.log(event);
      window.location.href = '/form'
    },
    handleConfirmButton: function (event) {
      console.log(event);
      window.location.href = '/'
    },
    getInfo() {
      //XML 
      const get = new XMLHttpRequest();
      get.open("GET", "https://wllfhe2z9k.execute-api.us-east-1.amazonaws.com/beta/data/123456")

      get.onload = () => {
        const data = JSON.parse(get.response);
        console.log(data);
        console.log(JSON.stringify(data));

        document.getElementById('IDRet').textContent = data.Item.ID;
        document.getElementById('FNRet').textContent = data.Item.firstName;
        document.getElementById('LNRet').textContent = data.Item.lastName;
        document.getElementById('MRRet').textContent = data.Item.monthlyInvestment;
        document.getElementById('RDRet').textContent = data.Item.desiredAgeRetired;
        document.getElementById('RARet').textContent = data.Item.estAgeToRetire;

      }
      get.send();

    }
  }
}
</script>

<style lang="scss">
@import "../style/main";
</style>