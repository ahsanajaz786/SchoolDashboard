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
          <h2 style="font-weight: bold;">Class Section </h2>
                  </div>
                  <div class="col-md-3"></div>
                  <div class="col-md-3">
         <input type="text" style="height:45px" class="form-control"  placeholder="Search">

              </div>
              <div class="col-md-2">
    
              </div>
              <div class="col-md-2">
               
    
              </div>
               <CModal
      title="Class Section"
      size="lg"
      :show.sync="smallModal"
    >
     
     <div class="row">
       
         <div class="col-md-6">
               <div class="form-group">
    <label for="exampleInputEmail1">Select  Section</label>
    <select style="height:50px" class="form-control" v-model="classSection.section_id">
    <option value="0">Select Section</option>    
    <option v-for="i in section" :key="i.id" :value="i.id">{{i.sectionName}}</option>
    </select>
    
    
      </div>
         </div>
          <div class="col-md-6">
               <div class="form-group">
    <label for="exampleInputEmail1">Select  Teacher</label>
    <select style="height:50px" class="form-control" v-model="classSection.advisor">
    <option value="0">Select Teacher</option>    
    <option v-for="i in teacherData" :key="i.id" :value="i.user_id">{{i.name}}</option>
    </select>
    
    
      </div>
         </div>
     </div>
     <div class="row">
         <div class="col-md-10"></div>
         <div class="col-md-2">
               <button class="btn btn-danger btn-lg" @click="saveData" style="width:80px">{{buttonText}}</button>

          </div>
        
     </div>
     <br>
     <table class="table">
         <thead>
             <tr>
                 <th>ID</th>
                 <th>Class</th>
                <th>Section</th>
                <th>Advisor</th>
             </tr>
         </thead>
         <tbody>
             <tr v-for="item in classSectionData" :key="item.id">
                 <td>{{item.id}}</td>
                 <td>{{item.level}}</td>
                  <td>{{item.sectionName}}</td>
                  <td>{{item.advisor}}</td>
                  
                  <td>
                      <a v-on:click="editdata(item)"
                        
                      >
                      
           <img  src="../../assets/img/icon-edit.png">
            
                      </a></td>
             </tr>
         </tbody>
     </table>
       <template #footer>
           <p>    </p>
                    <button class="btn btn-outline-danger btn-block" @click="close" style="width:80px;height:40px">Discard</button>
    
          
     
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
                                        <a v-on:click="edit(item.id)"
                        
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
     
      this.getSData()
       this.loadTData()
    }

   
  },
  data() {
    return {
        classSection:{class_ID:0,section_id:0,advisor:0},
        smallModal:false,section:[],
     data:[],classSectionData:[],
     teacherData:[],
     buttonText:"Save",
      
    
    classes:{
      id:0,level:''
    }
    };
  },
  methods: {
    editdata(e){
console.log(e)
this.classSection.esection_id=e.sectionID
    },
      getSData()
    { var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetSection",
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
          vm.section = response.data;
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

    },
       loadTData()
   {
     var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetTeacher",
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
          vm.teacherData = response.data;
          console.log("tdata",response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
   },
      close()
      {
  this.smallModal = false
  this.buttonText="Save"
  this.classes.level=""
  this.classes.id=0
      },
      saveData()
      {
      
       var vm=this
       if(this.classSection.class_ID==0 || this.classSection.section_id==0 || this.classSection.advisor==0)
        {
          Swal.fire({
          title: "Error!",
          text: "Please Select Items",
          icon: "error",
          confirmButtonText: "Ok"
        });
          return
        }
        console.log("data",this.classes.level)
        axios
        .post(URL.url+"SchoolSetup/AddClassSection",
        vm.classSection,{
           
                headers: {
                    'Accept': 'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem("token")
                    //  
                }
        })
        .then(response => {
           Swal.fire({
          title: "Congratulation",
          text: "Data Saved Successfully",
          icon: "error",
          confirmButtonText: "Ok"
        });
         
            this.buttonText="Save"
           vm.getData()
           console.log(vm.classSection.class_ID)
            vm.edit(vm.classSection.class_ID)
             vm.classSection.section_id=0
            vm.classSection.advisor="0"
            
          // JSON responses are automatically parsed.
        
        })
        .catch(e => {
       
          this.errors(e);
        });
    },
    edit(v)
    {
        console.log("yes",v)
    var   vm=this
    this.smallModal = true
    this.classSection.class_ID=v
   //  this.buttonText="Update"
    axios
        .get(URL.url+"SchoolSetup/GetclassSection?id="+v,
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
          vm.classSectionData = response.data;
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

     
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
