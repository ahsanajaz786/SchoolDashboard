<template>
  <div class="c-app">
     <TheHeader/>
    <TheSidebar style="height:100%"/>
    <div class="c-wrapper">
     
      <div class="c-body">
        <main class="c-main" style="background-color: #F8F8F8">
          <CContainer fluid style="background-color: #F8F8F8">
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </div>
  </div>
</template>
<style>
.c-sidebar .c-sidebar-nav-dropdown.c-show .c-sidebar-nav-link, .c-sidebar .c-sidebar-nav-dropdown.c-show .c-sidebar-nav-dropdown-toggle {
    color:black ; 
}
</style>
<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.c-wrapper li a:hover{
  background-color: brown !important;
}
</style>
