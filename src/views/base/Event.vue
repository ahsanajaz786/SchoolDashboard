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
          <h2 style="font-weight: bold;">Events</h2>
                  </div>
                  <div class="col-md-3"></div>
                  <div class="col-md-3">
         <input type="text" style="height:45px" class="form-control" placeholder="Search">

              </div>
              <div class="col-md-2">
               </div>
              <div class="col-md-2">
                <button class="btn btn-danger " style="height:45px;width:150px;"  @click="largeModal = true" >  <CIcon name="cil-plus" />Add Event</button>
    <CModal
      title="Class Section"
      size="lg"
      :show.sync="smallModal"
    >
     
     
     <br>
     <table class="table">
         <thead>
             <tr>
                 <th>#</th>
                 <th>title</th>
                <th>Location</th>
                <th>Start Date and Time</th>
                <th>End Date and Time</th>
                <th>Class</th>
             </tr>
         </thead>
         <tbody>
             <tr v-for="(item,index) in editData.clasees" :key="item.id" >
               <td>{{index+1}}</td>
               <td>{{editData.title}}</td>
               <td>{{editData.location}}</td>
            
               <td>{{editData.startDate}}</td>
               <td>{{editData.endtDate}}</td>
            
               <td>{{item.level}}</td>




                  
                  
             </tr>
         </tbody>
     </table>
       <template #footer>
           <p>    </p>
                   
                       <button class="btn btn-danger btn-block" @click="editRecord()   " style="width:80px;height:40px">Edit</button>
    
                    <button class="btn btn-outline-danger btn-block" @click="close" style="width:80px;height:40px">Discard</button>
    
          
     
          </template>
    </CModal>
            
 
 
  <CModal
      title="Add Event"
      size="lg"
      :show.sync="largeModal"
    >
    <div class="row">
        <div class="col-md-1"></div>
     <div class="col-md-3">
         
<img  width="150px" v-if="img===''" src="../../assets/img/event.png" height="150px" class="rounded-circle" alt="">        
 <img  width="150px" v-if="img!=''"  :src="img" height="150px" class="rounded-circle" alt="">
 <input type="file" v-on:change="onfileupload" style="margin-top:5px" class="btn btn-light btn-block"/>
     <h5 style="margin-left:25px">Cover Image</h5>
      </div>
     <div class="col-md-8">
         <div class="row">
             <div class="col-md-12">
        <div class="form-group">
    <label for="exampleInputEmail1">Event  Title</label>
    <input type="email" style="height:50px" v-model="event.title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Event Title">
      </div>
             </div>
             
         </div>
          <div class="row">
             <div class="col-md-12">
        <div class="form-group">
    <label for="exampleInputEmail1">Description</label>
    <textarea type="email" style="height:50px" v-model="event.description" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Desciption"></textarea>
      </div>
             </div>
          </div>
           <div class="row">
             <div class="col-md-12">
        <div class="form-group">
    <label for="exampleInputEmail1">Loacation</label>
    <input type="email" style="height:50px" v-model="event.location" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Location">
      </div>
             </div>
          </div>
<div class="row">
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Start Date Time</label>
    <input type="datetime-local"  style="height:50px" v-model="event.startDateTime"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username">
      </div>
             </div>
        
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">End Date Time</label>
    <input type="datetime-local"  style="height:50px" v-model="event.endDateTime"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username">
      </div>
             </div>
         </div>
          <div class="row">
             <div class="col-md-12">
        <div class="form-group">
    <label for="exampleInputEmail1">Select Coordinator</label>
   
     <select style="height:50px" class="form-control" v-model="event.teacher_id">
    <option value="0">Select Teacher</option>    
    <option v-for="i in data" :key="i.id" :value="i.user_id">{{i.name}}</option>
    </select>
      </div>
             </div>
         </div>
           <div class="row">
             <div class="col-md-12">
        <div class="form-group">
    <label for="exampleInputEmail1">Select class</label>
   <v-select  multiple  :options="classData" label="level" class="select" v-model="selectedClasses" ></v-select>
      </div>
             </div>
         </div>
         
         
     </div>
 
    </div>
    <template #footer>
     
          <button class="btn btn-outline-danger btn-block" @click="largeModal=false" style="width:150px;height:40px">Discard</button>
            
               
          <button class="btn btn-danger btn-lg" @click="save" style="width:150px">{{buttonText}}</button>
  </template>
      
    </CModal>
       </div>
              </div>
              <br><br>
              <div class="row">
                  <div class="col-md-12">
                      <table class="table">
                          <thead>
                              <tr>
                                     <th width="5%">ID </th>
                                        <th width="10%">Title </th>
                                        <th width="10%">Teacher Name </th>
                                        
                                        <th width="30%"> Description </th>
                                        <th width="10%">Location </th>
                                        
                                        <th width="15%">Start Date and Time </th>
                                        <th width="15%">End Date and Time </th>
                                                
                                  <th width="5%">Action </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in eventData" :key="item.id" >
                              
                               <td>{{item.id}}</td> 
                                <td>{{item.title}}</td> 
                                <td>{{item.teacherName}}</td> 
                               
                               <td>{{item.description}}</td>
                                 <td>{{item.location}}</td>
                                 <td> {{item.sDate}},{{item.startTime}}</td>
                                 <td> {{item.eDate}},{{item.endTime}}</td>
                             

                                 
                                 <td>
                                        <a href="#" v-on:click="viewClasses(item)"  >
                      
           <img  src="../../assets/img/icon-edit.png">
            
                      </a>
                      </td> 

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


<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

<script>
import axios from "axios";
import { join } from "path";
import {URL} from "./url"

import Swal from "sweetalert2";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  name: "Breadcrumbs",
  components: {},
  mounted() {
    this.loadData()
    this.getClasses()
    this.getEvent()
  },
  data() {
    return {
      editData:[],
      smallModal:false,
        eventData:[],
        classId:[],
        selectedClasses:[],
        classData:[],
         largeModal: false,
         buttonText:'Save',
      edit: false,
      img: "",
      image:'',
    
      event: {
        id: 0,
        title: "",
        description:"",
        location: "",
        teacher_id:"",
        startDateTime: "",
        endDateTime: "",
      
       
       
      
      }
      ,
      data:[] 
    };
  },
  methods: {
    editRecord()
    {
      
    this.event.id= this.editData.id,
     this.event.title= this.editData.title,
      this.event.description=this.editData.description,
      this.event.location=this.editData.location,
      this.event.teacher_id=this.editData.teacher_id,
      this.event.startDateTime=this.editData.startDate,
      this.event.endDateTime=this.editData.endtDate
      this.selectedClasses=this.editData.clasees
      this.smallModal=false
      this.largeModal=true;

    },
    viewClasses(d){
       this.editData=d;
       console.log("Edit Data",this.editData)

      this.smallModal=true


    },
    close(){
largeModal=false
    },
   loadData()
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
          vm.data = response.data;
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
   },
    getEvent()
   {
     var vm=this
      axios
        .get(URL.url+"Event/GetEvent",
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
          vm.eventData = response.data;
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
   },
   getClasses()
   {
     var vm=this
      axios
        .get(URL.url+"Event/GetClass",
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
          console.log("classes",response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
   },
   
    onfileupload(e) {
   //   alert(e.target.files[0]);
   
    console.log(event);

                    var image = new Image;
                    var reader = new FileReader;

                    reader.onload = (e) => {
                        this.img = e.target.result;
                    }

                    reader.readAsDataURL(event.target.files[0]);
                    console.log(event.target.files[0]);
      this.image = e.target.files[0];

      console.log(this.img)
    },

    save() {

      if (this.event.title=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Event title ",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }
       if (this.event.location=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Location ",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }
      
       if (this.event.teacher_id=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Selelct Coordinator ",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }
      
       if (this.event.startDateTime=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Start Date Time ",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }
      
       if (this.event.endDateTime=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter End Date Time ",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }
     //  this.classId=[]
var v=new  Array();
       console.log("data",this.selectedClasses)
       for(var i in this.selectedClasses)
       {
           
           v.push(new Object({"clasid":this.selectedClasses[i].id}))
       }

       
       console.log("dedwwwwse",v)
   
    
      
     //  this.classData=[]
       
       
      
      
      let c = new FormData();
      //alert(this.school.Password);
      c.append("id", this.event.id);
      c.append("title", this.event.title);
      c.append("location", this.event.location);
      c.append("teacher_id", this.event.teacher_id);
      c.append("description", this.event.description);
    c.append("startDateTime", this.event.startDateTime);
      c.append("endDateTime", this.event.endDateTime);
       for(var i in this.selectedClasses)
       {
           c.append("clasid", this.selectedClasses[i].id);
           
        //   v.push(new Object({"clasid":this.selectedClasses[i].id}))
       }

    
   
    
console.log("data",c)
      if(this.image!="")
      c.append("uploadFile", this.image, this.image.name);
      axios
        .post(URL.url+"Event/SaveEvent",
        c,
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
          
           
          console.log(response.data)
            Swal.fire({
          title: "Message",
          text: response.data,
          icon: "Data Saved",
          confirmButtonText: "Ok"
        });
          vm.getEvent()
          vm.event.id= 0,
     vm.event.title= "",
      vm.event.description=""
      vm.event.location=""
      vm.event.teacher_id=""
      vm.event.startDateTime=""
      vm.event.endDateTime=""
      vm.selectedClasses=""
      vm.smallModal=false
      vm.largeModal=true;
      vm.selectedClasses=[]

        })

        .catch(e => {
        console.log("error",e) 
         Swal.fire({
          title: "Error!",
          text: e,
          icon: "error",
          confirmButtonText: "Ok"
        });
        return


        });
      var vm = this;
   


    },
    ValidateEmail(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }

      return false;
    },

    ValidateAlpha(evt) {
      var keyCode = evt.which ? evt.which : evt.keyCode;
      if (
        (keyCode < 65 || keyCode > 90) &&
        (keyCode < 97 || keyCode > 123) &&
        keyCode != 32
      )
        return false;
      return true;
    }
  }
};
</script>

<style scope>
.vs__search{
    height: 40px;
}
.v-text-field--box .v-input__slot, .v-text-field--outline .v-input__slot{
       min-height:56px;
     }
.logo{
  background-color: brown
}
.breadcrumb-item + .font-xl.breadcrumb-item::before {
  color: rgb(140, 195, 38);
  content: ">>";
  padding: 0px 10px;
}
</style>
