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
                  <div class="col-sm-2">
          <h2 style="font-weight: bold;">Student</h2>
                  </div>
                  <div class="col-md-3"></div>
                  <div class="col-md-3">
         <input type="text" style="height:45px" class="form-control" placeholder="Search">

              </div>
              <div class="col-sm-2">
              </div>
              <div class="col-sm-2">
                <button class="btn btn-danger " style="height:45px;width:100%;"  @click="largeModal = true" >  <CIcon name="cil-plus" />Add Student</button>
  <CModal
       title="Add Student"
       size="lg"
      :show.sync="largeModal"
    >
    <div class="row">
        <div class="col-md-1"></div>
     <div class="col-md-3">
 <img  width="150px" v-if="img===''" src="../../assets/img/student.png" height="150px" class="rounded-circle" alt="">        
 <img  width="150px" v-if="img!=''"  :src="img" height="150px" class="rounded-circle" alt="">
 <input type="file" v-on:change="onfileupload" style="margin-top:5px" class="btn btn-light btn-block"/>
     <h5 style="margin-left:25px">Profile Upload</h5>
     </div>
     <div class="col-md-8">
         <div class="row">
             <div class="col-md-12">
        <div class="form-group">
    <label for="exampleInputEmail1">Student Name</label>
    <input type="email" style="height:50px" v-model="student.fullName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Student Name">
      </div>
             </div>
         </div>
         <div class="row">
             <div class="col-md-12">
        <div class="form-group">
    <label for="exampleInputEmail1">Select Class</label>
    
   <select style="height:45px" class="form-control" v-model="classid" v-on:change="getSection">
     <option value="0"></option>
     <option v-for="item in classdata" :key="item.id" :value="item.id">{{item.level}}</option>
     
   </select>
   
      </div>
             </div>
         </div>
          <div class="row">
             <div class="col-md-12">
        <div class="form-group">
    <label for="exampleInputEmail1">Select Section</label>
    <select style="height:50px" class="form-control" v-model="student.clasSectionID">
    <option value="-1">Select Section</option>
    <option v-for="item in sections" :key="item.id" :value="item.id">{{item.sectionName}}</option>

    </select>   </div>
             </div>
             
              </div>
             <div class="row">
 <div class="col-md-10">
        <div class="form-group">
    <label for="exampleInputEmail1">Seclct Guardian Account </label>
   <select style="height:50px" class="form-control" v-model="student.gid">
    <option value="-1">Select Guardian</option>
    <option v-for="item in GuardianData" :key="item.gid" :value="item.gid">{{item.fullName}}</option>

    </select> 
   
   
   </div>
      </div>
      <div class="col-md-2">
           <div class="form-group">
    <label for="exampleInputEmail1"> </label>
    
    <button class="btn btn-danger " style="margin-top:50%"  @click="largeModal2 = true" >  <CIcon name="cil-plus" /></button>
 
   
      </div>
      </div>
       
      
            

             </div>
        
         
         
     </div>
 
    </div>
    <template #footer>
     
          <button class="btn btn-outline-danger btn-block" v-on:click="largeModal=false" style="width:150px;height:40px">Discard</button>
            
               
          <button class="btn btn-danger btn-lg" v-on:click="saveStudent" style="width:150px">Save</button>
          </template>
      
    </CModal>
     <CModal
      title="Register New  Guardian Account"
      size="lg"
      :show.sync="largeModal2"
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
    <label for="exampleInputEmail1">Guardian Name</label>
    <input type="email" style="height:50px" v-model="gdata.FullName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Full Name">
      </div>
             </div>
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Guardian Email</label>
    <input type="email"  style="height:50px"  v-model="gdata.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email">
      </div>
             </div>
         </div>
          <div class="row">
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Password</label>
    <input type="password" style="height:50px" v-model="gdata.Password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Password">
      </div>
             </div>
             <div class="col-md-6">
        <div class="form-group">
    <label for="exampleInputEmail1">Retype Password</label>
    <input type="password"  style="height:50px"   v-model="gdata.rePassword" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Retype Password">
      </div>
             </div>
              </div>
          
         
         
     </div>
 
    </div>
    <template #footer>
     
          <button class="btn btn-outline-danger btn-block" v-on:click="largeModal2 = false" style="width:150px;height:40px">Discard</button>
            
               
          <button class="btn btn-danger btn-lg" v-on:click="SaveGuardian" style="width:150px">Save</button>
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
                                        <th> Student Name </th>
                                            <th>Guardian</th>
                                                <th>Class </th>
                                                 <th>Section </th>
                                  <th>Action </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in studentData" :key="item.id">
                             
                               <td>{{item.id}}</td> 
                                <td>{{item.fullName}}</td> 
                                 <td>{{item.guardian}}</td>    
                                  <td>{{item.clas}}</td>   
                                  <td>{{item.sec}}</td>
                                   <td>
                                        <a type="button"
 v-on:click="editdata(item)"                        
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
<style>
  @import "https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css";
</style>
<script src="https://unpkg.com/vue-multiselect@2.1.0"></script>


<script>
import axios from "axios";
import { join } from "path";
import {URL} from "./url"
import Vue from 'vue'
import Swal from "sweetalert2";
import vSelect from 'vselect-component'
export default {
  name: "Breadcrumbs",
  components: {
    vSelect
  },
  mounted() {
    this.getClassData()
    this.GetGuardian()
    this.GetStudent()

   
    
  },
  data() {
    return {
      studentData:[],
      student:{ id:0,
   fullName:'',clasSectionID:0,gid:0
      },
      GuardianData:[],
      sections:[],
      classid:'',
          image:[],
          classdata:[],

      gdata:{
 email:'',FullName:'',UserName:'',phone:'',Password:'',rePassword:''

      },
      largeModal2:false,
         largeModal: false,
      edit: false,
      img: '',
    
      school: {
        id: null,
        FullName: "",
        Email: "",
        name: "",
        Password: "",
        year:'',
        school: {
          name: ""
        },
        schoolLogo: "",
        isActive:false
      
      }
        };
  },
  methods: {
  

       saveStudent()
    {
      
      if(this.student.fullName=="")
      {
          Swal.fire({
          title: "Error",
          text: "Please Enter your FullName",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      } 
      
      if( this.student.clasSectionID==0)
      {
          Swal.fire({
          title: "Error",
          text: "Please Select your Class Section",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
       if(this.student.gid==0)
      {
          Swal.fire({
          title: "Error",
          text: "Please Select Guardian",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      if(this.image=="" && this.student.id==0)
      {
          Swal.fire({
          title: "Error",
          text: "Please Upload Profile Image",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      
      var vm=this
console.log("thi",this.image)
console.log("tqhi",this.student)
 let c = new FormData();
      //alert(this.school.Password);
      if( this.image=="")
      {
         Swal.fire({
          title: "Error",
          text: "Please Upload Image",
          icon: "error",
          confirmButtonText: "Ok"
        });
      }

      c.append("FullName", this.student.fullName);
      c.append("sId", this.student.id);
     
     c.append("ClassSectionID", this.student.clasSectionID);
     

      
      c.append("Guardian", this.student.gid);
     
     
     
      
      c.append("Profileimg", this.image, this.image.name);
      axios
        .post(URL.url+"SchoolSetup/SaveStudentData",
       c, {
           
                headers: {
                    'Accept': 'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem("token")
                    //  
                }
       }
       )
        .then(response => {
             Swal.fire({
          title: "Congratulation",
          text: response.data,
          icon: "error",
          confirmButtonText: "Ok"
        });
        vm.student.fullName=""
        vm.student.clasSectionID=0
        vm.student.gid=0
        
          // JSON responses are automatically parsed.
          vm.GetStudent()
          console.log("gData",response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    }
    ,editdata(d)
    {
     this.largeModal=true
      this.student.id=d.id
     this.student.fullName=d.fullName
     this.student.clasSectionID=d.cid
     this.student.gid=d.guardiaID
   
 
    },
     getSection()
    { var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetclassSection?id="+vm.classid,
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
          vm.sections = response.data;
          console.log("gData",response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

    },
    GetStudent()
    { var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetStudent",
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
          vm.studentData= response.data;
          console.log("dddd",vm.studentData)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

    },
    GetGuardian()
    { var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetGuardian",
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
          vm.GuardianData= response.data;
          console.log(vm.GuardianData.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

    },
    SaveGuardian()
    {
      
      if(this.gdata.FullName=="")
      {
          Swal.fire({
          title: "Error",
          text: "Please Enter your FullName",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      
      if(this.gdata.email=="")
      {
          Swal.fire({
          title: "Error",
          text: "Please Enter your Email",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      
      if(this.image=="")
      {
          Swal.fire({
          title: "Error",
          text: "Please Upload Profile Image",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      if(this.gdata.Password=="")
      {
          Swal.fire({
          title: "Error",
          text: "Please Enter Password",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      if(this.gdata.Password!=this.gdata.rePassword)
      {
          Swal.fire({
          title: "Error",
          text: "Confirm Password doesn't match ",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return
      }
      
      
      console.log("Hello",this.gdata)
        let c = new FormData();
      //alert(this.school.Password);
      c.append("Email", this.gdata.email);
      c.append("FullName", this.gdata.FullName);
      c.append("Password", this.gdata.Password);
     
     
      c.append("phone", this.gdata.phone);
     
     
      
      c.append("profileimg", this.image, this.image.name);
var vm = this;

      axios
        .post(URL.url+"SchoolSetup/SaveGuardian",
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
      
           vm.GetGuardian()
              Swal.fire({
          title: "Congratulation",
          text: response.data,
          icon: "error",
          confirmButtonText: "Ok"
        });
        vm.gdata.email=""
        vm.gdata.FullName=""
        vm.image=""
            vm.gdata.Password=""
            vm.gdata.rePassword=""
          console.log(response.data)
          // JSON responses are automatically parsed.
          //vm.yearData = response.data;
        })
        .catch(e => {
          //  alert(e)
          this.errors.push(e);

    })
    }    
    
,     
    getClassData()
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
          vm.classdata = response.data;
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

    }
,
   
    handleImageChange(e) {
   //   alert(e.target.files[0]);
   
   
      this.img = e.target.files[0];
      console.log(this.img)
    },
    onfileupload(e){
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
