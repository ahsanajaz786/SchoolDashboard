<template>
  <CHeader fixed with-subheader light style="height:90px;width:100%;border:none;">
    
  <div style="width:20%;height:40px;margin-left:20px;margin-bottom:20px;">
   <img src="../assets/img/logo_app.png" width="25%"> 
   </div>
    <div style="width:60%"></div>

    <div class="header" style="float:right; margin: auto;font-size: 15;
  font-weight: bold">
       Notifications 
      
        <img style="margin-left:20px;margin-bottom:10px;" src="../assets/img/icon-user.png">
      
     <a type="button" class="danger" v-on:click="logout"  style="color:#F15455;margin-left:20px;"
   
                      >
                      
   Log Out
     </a> 

   </div>
    
 
  </CHeader>
</template>
<style>
.header{
  align-items: center;
 
  float: right;
  font-size: 15;
  font-weight: bold
}
</style>
<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  components: {
  //  TheHeaderDropdownAccnt
  },methods:{
logout()
{
   let token=localStorage.removeItem("token");
   
       window.location.href = '/#/login'
   
}
  }
}
</script>
