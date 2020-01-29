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
          <h2 style="font-weight: bold;">Teachers</h2>
                  </div>
                  <div class="col-md-3"></div>
                  <div class="col-md-3">
         <input type="text" style="height:45px" class="form-control" placeholder="Search">

              </div>
              <div class="col-md-2">
               </div>
              <div class="col-md-2">
                <button class="btn btn-danger " style="height:45px;width:150px;"  @click="largeModal = true" >  <CIcon name="cil-plus" />Add Teacher</button>
  <CModal
      title="Add Teacher"
      size="lg"
      :show.sync="largeModal"
    >
    <div class="row">
        <div class="col-md-1"></div>
     <div class="col-md-3">
         
<img  width="150px" v-if="img===''" src="../../assets/img/teacher.png" height="150px" class="rounded-circle" alt="">        
 <img  width="150px" v-if="img!=''"  :src="img" height="150px" class="rounded-circle" alt="">
 <input type="file" v-on:change="onfileupload" style="margin-top:5px" class="btn btn-light btn-block"/>
     <h5 style="margin-left:25px">Profile Upload</h5>
      </div>
     <div class="col-md-8">
         <div class="row">
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Teacher Name</label>
    <input type="email" style="height:50px" v-model="teacher.fullName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Teahcher Name">
      </div>
             </div>
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Teacher Phone</label>
    <input type="email"  style="height:50px" v-model="teacher.phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Phone">
      </div>
             </div>
         </div>
          <div class="row">
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Teacher Email</label>
    <input type="email" style="height:50px" v-model="teacher.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Teahcher Email">
      </div>
             </div>
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Teacher Username</label>
    <input type="email"  style="height:50px" v-model="teacher.username"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username">
      </div>
             </div>
         </div>
          <div class="row">
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Enter Password</label>
    <input type="password" style="height:50px" v-model="teacher.password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Password">
      </div>
             </div>
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Retype Password</label>
    <input type="password"  style="height:50px" v-model="teacher.reTypePassword"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Retype Password">
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
                                     <th>ID </th>
                                        <th>Full Name </th>
                                            <th>Email </th>
                                                
                                  <th>Action </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in data" :key="item.id">
                              
                               <td>{{item.id}}</td> 
                                <td>{{item.name}}</td> 
                                 <td>{{item.email}}</td>    
                                  
                                   <td>
                                        <a v-on:click="editData(item)"
                        
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


<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

<script>
import axios from "axios";
import { join } from "path";
import {URL} from "./url"

import Swal from "sweetalert2";

export default {
  name: "Breadcrumbs",
  components: {},
  mounted() {
    this.loadData()
    
  },
  data() {
    return {
         largeModal: false,
         buttonText:'Save',
      edit: false,
      img: "",
      image:'',
    
      teacher: {
        id: 0,
        fullName: "",
        phone:"",
        email: "",
       username:"",
        password: "",
        reTypePassword: "",
      
       
       
      
      }
      ,
      data:[] 
    };
  },
  methods: {
    editData(d){
    this. largeModal=true
this.teacher.id=d.user_id      
this.teacher.fullName=d.name
this.teacher.phone=d.phone
this.teacher.email=d.email
this.teacher.username=d.email


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

if (this.teacher.fullName=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Your Name",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
       if (this.teacher.phone=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Phone Number",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      if (!this.ValidateEmail(this.teacher.email)) {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Correct  Email Formate",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
     
       if (this.teacher.username=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Username",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }if (this.image=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Upload your Profile Picture",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      } 
       
       if (this.teacher.password=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Password",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }if (this.teacher.password=="") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Password",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      if (this.teacher.password!= this.teacher.reTypePassword) {
        Swal.fire({
          title: "Error!",
          text: "Please Password D'Not Matched",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      let c = new FormData();
      //alert(this.school.Password);
      c.append("id", this.teacher.id);
      c.append("FullName", this.teacher.fullName);
      c.append("UserName", this.teacher.username);
      c.append("Email", this.teacher.email);
      if(this.teacher.id==0)
       c.append("id", "0");
       else
          c.append("id", this.teacher.id);
      c.append("Password", this.teacher.password);
      c.append("phone", this.teacher.phone
);
console.log("data",c)
      
      c.append("profileimg", this.image, this.image.name);
      axios
        .post(URL.url+"SchoolSetup/RegisterTeacher",
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
            this.loadData()
            vm.teacher.id=0
            
    vm. largeModal=false
vm.teacher.id=""     
vm.teacher.fullName=""
vm.teacher.phone=""
vm.teacher.email=""
vm.teacher.username=""
vm.teacher.password=""
vm.teacher.reTypePassword=""

          console.log(response.data)
            Swal.fire({
          title: "Message",
          text: response.data,
          icon: "error",
          confirmButtonText: "Ok"
        });
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

.logo{
  background-color: brown
}
.breadcrumb-item + .font-xl.breadcrumb-item::before {
  color: rgb(140, 195, 38);
  content: ">>";
  padding: 0px 10px;
}
</style>
