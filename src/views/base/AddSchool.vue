<template>
  <div>
    <CRow>
       <div style="width:2%"></div>
    <div style="width:96.5%;margin-bottom:20px;">
    <h3 style="font-wight:bold"> Add School
      
         
    </h3>
      
         </div>
      <CCol col>
        <CCard>
      
          <CCardBody>
            <div class="row">
             <div class="col-md-1 " style="background-color: #ffeded"></div>
                   <div class="col-md-3 logo" style="background-color: #ffeded" >
                     <div style="margin-top:20%;align-item:center;float;right">
                    <img style="width:150px;" src="../../assets/img/logo_app.png">
                   
                     </div>
            <h3 style="">Sinnt Peter High School</h3>
      </div>
              <div class="col-md-8">
                <div class="row">
                  <div class="col-lg-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Full Username</label>
                  <input
                    type="text"
                    v-model="school.FullName"
                    class="form-control"
                    id="fullName"
                    aria-describedby="emailHelp"
                    placeholder="Enter Full Username"
                  />
                </div>
                  </div>
              
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">User Email</label>
                  <input
                    type="email"
                    v-model="school.Email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your email"
                  />
                </div>
              </div>
              </div>
            
           
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">School Name</label>
                  <input
                    type="email"
                    v-model="school.school.name"
                    class="form-control"
                    id="school_name"
                    aria-describedby="emailHelp"
                    placeholder="Enter School Name"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Password</label>
                  <input
                    type="password"
                    v-model="school.Password"
                    class="form-control"
                    id="txt_password"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
            </div>

            <div class="row">
            <div class="col-md-6">
               <div class="form-group">
                  <label for="exampleInputEmail1">Select School Year</label>
                 <select class="form-control" v-model="school.year">
                   <option value="-1">Select School</option>
                   <option v-for="item in yearData" v-bind:key="item.id" v-bind:value="item.id">{{item.year}}</option>
                 </select>
                </div>

            </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">School Logo</label>
                  <input
                    type="file"
                    class="form-control"
                    v-on:change="handleImageChange"
                    id="img"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
               </div>
            <div class="row">
              <div class="col-md-6">
              <div class="form-group">

               <label for="exampleInputEmail1">Is Active</label>
                <div class="row">
                 
                  <div class="col-md-3">
                    <div class="form-group">
                      <input
                        type="radio"
                        style="width: 50%; height: 2em;"
                         v-model="school.isActive"
                        value="true"
                        name="iA"
                      />
                      <br>
                      <label for="exampleInputEmail1">True</label>
                    </div>
                  </div>
                  
                  <div class="col-md-3">
                    <div class="form-group">
                    

                      <input
                        type="radio"
                        style="width: 50%; height: 2em;"
                        value="false"
                        v-model="school.isActive"
                        name="iA"
                      />
                      <br>
                      <label for="exampleInputEmail1">False</label>
                    </div>
                      
                  </div>
                  
                </div>
               </div>
            
           </div></div>
               
             
           
           <div class="row">

              <div class="col-md-9">
                <div class="form-group"></div>
              </div>
              
              <div style="float:right" class="col-md-3">

                   <button class="btn btn-danger " style="float:right"  v-on:click="save">  <CIcon name="cil-plus" />Add School</button>
      
              
              </div>
              
              </div>
            </div>
            
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow v-if="edit==true">
      <CCol col>
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" /><strong> School List</strong>
            <!-- Button trigger modal -->

            <!-- Modal -->
          </CCardHeader>
          <CCardBody>
            <div v-if="edit == true" class="row">
              <div class="col-md-12">
                <table class="table">
                  <thead>
                    <th>ID</th>
                    <th>School Name</th>
                    <th>Year Name</th>
                    <th>Active</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in yearData" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.year }}</td>
                      <td>
                        <div
                          v-if="item.a"
                          class="alert alert-primary"
                          role="alert"
                        >
                          Active
                        </div>
                        <div
                          v-if="!item.a"
                          class="alert alert-danger"
                          role="alert"
                        >
                          In Active
                        </div>
                      </td>
                      <td>
                        <router-link
                          class="btn btn-primary"
                          :to="{ name: 'SchoolYear', params: { id: item.id } }"
                        >
                          Edit
                        </router-link>
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

import Swal from "sweetalert2";

export default {
  name: "Breadcrumbs",
  components: {},
  mounted() {
    this.loadYears()
    if (!this.$route.params.id) 
    {

    }
    else {
    //  alert(this.$route.params.id);
      this.edit = true;
    
     // this.YearData(this.$route.params.id);

      this.OnDataLoad(this.$route.params.id);
    //  this. loadYears();
      this.$route.params.id = null;
    }
  },
  data() {
    return {
      edit: false,
      img: "",
    
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
      ,  yearData:[]
    };
  },
  methods: {
     loadYears() {
      // alert('v')
      var vm = this;
      axios
        .get("http://localhost:1702/api/Setups/GetSchoolYear?id=-1")
        .then(response => {
          // JSON responses are automatically parsed.
          vm.yearData = response.data;
        })
        .catch(e => {
          //  alert(e)
          this.errors.push(e);
        });
    },
   
    OnDataLoad(id) {
    alert(id)
    var vm = this;
      axios
        .post(
          "http://localhost:1702/api/Setups/GatSchoolAdmin/?id=" + id + "",
          {}
        )
        .then(response => {
          // JSON responses are automatically parsed.
          vm.school.id = response.data.schooid;

          vm.school.Email = response.data.em;

          vm.school.school.name = response.data.name;
          vm.school.schoolLogo = response.data.imgPath;
          vm.school.FullName = response.data.fn;
          vm.school.year=response.data.year
         
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    },

    handleImageChange(e) {
   //   alert(e.target.files[0]);
   
      this.img = e.target.files[0];
      console.log(this.img)
    },

    save() {
  
      if (!this.ValidateEmail(this.school.Email)) {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Correct  Email Formate",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      } else if (this.school.school.name == "") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter School Name",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      } else if (this.img == "" &&  this.school.id==null) {
        Swal.fire({
          title: "Error!",
          text: "Please Upload Image",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      } else if (this.school.FullName == "") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Full Name",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }
      let c = new FormData();
      //alert(this.school.Password);
      c.append("Email", this.school.Email);
      c.append("FullName", this.school.FullName);
      c.append("Password", this.school.Password);
      c.append("schoolName", this.school.school.name);
      c.append("schoolName", this.school.school.name);
      c.append("year", this.school.year);
      c.append("isActive", this.school.isActive);
      c.append("id",  this.school.id);
       if(this.img!="")
      c.append("schoolLogo", this.img, this.img.name);

      // return;
      var vm = this;
      axios
        .post("http://localhost:1702/api/Account/Register", c, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })

        .then(response => {
          //handle success
          console.log("response -- then: ", response);

          
          if (response.data.message == "Error") {
            alert(response.data.message);
            var d;
            for (var r in response.data.errors) {
              d += response.data.errors[r].description + "\n";
              // alert(r)
            }

            Swal.fire({
              title: "Error",
              text: d,
              icon: "error",
              confirmButtonText: "Ok"
            });
          }else{
            // window.location.href = 'http://217.61.21.52:8080/?id=1#/base/School'
           
          }
        })
        .catch(response => {
          //handle error

          console.log("response -- catch: ", response);
        });
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
