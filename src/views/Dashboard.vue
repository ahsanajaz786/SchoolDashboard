<template>
 
</template>
<script src="https://use.fontawesome.com/9c22f31f23.js"></script>
<style>
body{
  color: black;
}
</style>

<script>

import { freeSet } from '@coreui/icons'
export default {
  name: 'Dashboard',
  components: {
  },
data()
{

  return{
    
  }
}
,
  mounted()
  {
    
    let token=localStorage.getItem("token");
    console.log("ss",token)
    if(token==null)
    {
       window.location.href = '/#/login'
    }
    console.log(token)

    




  },
 
  methods: {
  }
}
</script>
