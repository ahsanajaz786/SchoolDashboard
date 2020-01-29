<template>
  <div>
    <CRow>
       <div style="width:2%"></div>
    <div style="width:96.5%;margin-bottom:20px;">
   
      
         </div>
      <CCol col>
        <CCard>
                 <CModal
      title="Shift Class"
      size="lg"
      :show.sync="smallModal"
    >
    <div class="row">
        <div class="col-md-5">
            <div class="form-group">
    <label for="exampleInputEmail1">Current Level</label>
     <input type="text" class="form-control" style="height:45px" readonly v-model="classSection">
    
     </div>
           
            </div>

  <div class="col-md-7">
           <div class="form-group">
    <label for="exampleInputEmail1">Shift</label>
    <div class="row">
        <div class="col-md-9">
     <select class="form-control"  style="height:45px;width:70%" v-model="pclass">
        <option>Select Class Section</option>
        <option v-for="item in classData" :key="item.id"  :value="item.id">
            {{item.level}}-{{item.sectionName}}
        </option>
        </select> 
        </div>
        <div class="col-md-1">
         <button class="btn btn-danger btn-lg" v-on:click="shiftClass" style="height:46px;width:70px">Shift</button>
      
        </div>
         <div class="col-md-2">
        
        </div>
    </div>
     </div>
            </div>
          

    </div>
     
     
     <br>
     <table class="table">
         <thead>
             <tr>
                 <th><input  :value="checkbox" v-model="checkbox" v-on:click="action()" type="checkbox"></th>
                 <th>Student Name</th>
              
             </tr>
         </thead>
         <tbody>
             <tr v-for="item in viewData" :key="item.id">
                 <td><input type="checkbox"  v-model="item.action"></td>
               <td>{{item.studentName}}</td>
             </tr>
         </tbody>
     </table>
       <template #footer>
           <p>    </p>
                    <button class="btn btn-outline-danger btn-block" @click="close" style="width:80px;height:40px">Discard</button>
    
          
     
          </template>
    </CModal>
       
      
          <CCardBody>
              <div class="row">
                  <div class="col-md-2">
          <h2 style="font-weight: bold;"> Shift Classes <Section></Section></h2>
                  </div>
                  <div class="col-md-3"></div>
                  <div class="col-md-3">
         <input type="text" style="height:45px" class="form-control"  placeholder="Search">

              </div>
              <div class="col-md-2">
    
              </div>
              <div class="col-md-2">
               
    
              </div>
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
                                            
                                        <th>Section</th>       
                                  <th>Action </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in classData" :key="item.id">
                                <td></td>
                               <td>{{item.id}}</td> 
                              
                                 <td>{{item.level}}</td>    
                                  <td>{{item.sectionName}}</td>
                                   <td>
                                        <a v-on:click="view(item.id)"
                        
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
        csid:0,
        cid:0,
        pclass:0,
        viewData:[],
        classSection:'',
   smallModal:false,
   classData:[],checkbox:false
    };
  },
  methods: {
      shiftClass()
      {

        console.log("s",this.pclass)
          this.viewData.forEach(e => {
              e.pormationid=this.pclass
          });
         
          var vm=this
console.log("Data",this.viewData)

   axios
        .post(URL.url+"SchoolSetup/PromateStudentClass",
        vm.viewData,{
           
                headers: {
                    'Accept': 'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem("token")
                    //  
                }
       }
       )
        .then(response => {
          // JSON responses are automatically parsed.
             vm.view(vm.csid)
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    
   
      },
      action(){
     if(this.checkbox)
     {
     console.log("yes",this.checkbox)
     this.viewData.forEach(e => {
             e.action=false
         });
     }else{
         console.log("no",this.checkbox)
        this. viewData.forEach(e => {
             e.action=true
         });
     }

      },
      view(id)
      {
          this.smallModal=true
          var vm=this
          this.csid=id
      axios
        .get(URL.url+"SchoolSetup/GetClassSectionStudent?id="+id,
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
          vm.viewData = response.data;
          if(vm.viewData.length>0)
          {
              
             vm.classSection=vm.viewData[0].sectionleve
                 vm.cid=vm.viewData[0].id
         
          }
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    
      }
    ,
close(){

this.smallModal=false
}
      ,
    getData()
    { var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetClassSectionData",
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
          vm.classData = response.data;
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
