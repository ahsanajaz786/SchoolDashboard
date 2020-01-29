<template>
  <div>
    <CRow>
       <div style="width:2%"></div>
    <div style="width:96.5%;margin-bottom:20px;">
   
      
         </div>
      <CCol col>
        <CCard>
      
          <CCardBody>
              <div class="row">
                  <div class="col-md-2">
          <h2 style="font-weight: bold;">Class</h2>
                  </div>
                  <div class="col-md-3"></div>
                  <div class="col-md-3">
         <input type="text" style="height:45px" class="form-control"  placeholder="Search">

              </div>
              <div class="col-md-2">
    
              </div>
              <div class="col-md-2">
                <button class="btn btn-danger " style="height:45px;width:150px;" @click="smallModal = true" >  <CIcon name="cil-plus" />Add Class</button>
    
    
              </div>
               <CModal
      title="Add New Class"
    
      :show.sync="smallModal"
    >
     
     <div class="row">
         <div class="col-md-12">
               <div class="form-group">
    <label for="exampleInputEmail1">Class</label>
    <input type="email" style="height:50px" class="form-control" v-model="classes.level" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Class ">
      </div>
         </div>
     </div>
       <template #footer>
     
          <button class="btn btn-outline-danger btn-block" @click="close" style="width:150px;height:40px">Discard</button>
            
               
          <button class="btn btn-danger btn-lg" @click="saveData" style="width:150px">{{buttonText}}</button>
 </template>
    </CModal>
              </div>
              <br><br>
              <div class="row">
                  <div class="col-md-12">
                      <table class="table">
                          <thead>
                              <tr>
                                
                                <th></th>
                                    <th>ID </th>
                                        <th>Class </th>
                                            
                                               
                                  <th>Action </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in data" :key="item.id">
                                <td></td>
                               <td>{{item.id}}</td> 
                              
                                 <td>{{item.level}}</td>    
                                  
                                   <td>
                                        <a v-on:click="edit(item)"
                        
                      >
                      
           <img  src="../../assets/img/icon-edit.png">
            
                      </a></td> 

                               </tr>
                               
                          </tbody>
                      </table>

                  </div>
              </div>
      
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  
  </div>
</template>



<script>
import axios from "axios";
import { join } from "path";
import {URL} from "./url"


import Swal from "sweetalert2";

export default {
  name: "Breadcrumbs",
  components: {},
  mounted() {
    let token=localStorage.getItem("token");
    console.log("ss",token)
    if(token==null)
    {
       window.location.href = '/#/login'
    }else{
      this.getData()
    }

   
  },
  data() {
    return {
        smallModal:false,
     data:[],
     buttonText:"Save",
      
    
    classes:{
      id:0,level:''
    }
    };
  },
  methods: {
      close()
      {
  this.smallModal = false
  this.buttonText="Save"
  this.classes.level=""
  this.classes.id=0
      },
      saveData()
      {
        if(this.classes.level=='')
        {
          Swal.fire({
          title: "Error!",
          text: "Please Enter Class Level",
          icon: "error",
          confirmButtonText: "Ok"
        });
          return
        }
       var vm=this
        console.log("data",this.classes.level)
        axios
        .post(URL.url+"SchoolSetup/SaveClass",
        vm.classes,{
           
                headers: {
                    'Accept': 'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem("token")
                    //  
                }
        })
        .then(response => {
           vm.smallModal = false
           vm.classes.level=""
           vm.classes.id=0
            this.buttonText="Save"
            Swal.fire({
          title: "Message",
          text: "Data Saved Successfully",
          icon: "error",
          confirmButtonText: "Ok"
        });
           vm.getData()
          // JSON responses are automatically parsed.
        
        })
        .catch(e => {
       
          this.errors(e);
        });
    },
    edit(v)
    {
      
     this.buttonText="Update"
        this.classes.level=v.level
        this.classes.id=v.id
        this.smallModal = true

    },
    getData()
    { var vm=this
      axios
        .get(URL.url+"SchoolSetup/getClass",
        {
           
                headers: {
                    'Accept': 'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem("token")
                    //  
                }
       }
       )
        .then(response => {
          // JSON responses are automatically parsed.
          vm.data = response.data;
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

    }

      
    
   
    
  }
};
</script>

<style scope>

.logo{
  background-color: brown
}
.breadcrumb-item + .font-xl.breadcrumb-item::before {
  color: rgb(140, 195, 38);
  content: ">>";
  padding: 0px 10px;
}
</style>
