<template>
<div>
  <CRow>
    
     <div style="width:2%"></div>
    <div style="width:96.5%;margin-bottom:20px;">
    <h3 style="font-wight:bold"> Add School Year
      
         
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
                      <h3 style="margin-right:3%;"></h3>
                   </div>
                     <div class="col-md-8">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Enter Year</label>
                <input
                  type="email"
                  v-model="schoolYear.year"
                  class="form-control"
                  id="year"
                  aria-describedby="emailHelp"
                  placeholder="Enter  Year "
                />
              </div>
              </div>
           
              <div class="col-md-6" >
              <div class="form-group">
               <label for="exampleInputEmail1">Is Active</label>
                <div class="row">
                 
                  <div class="col-md-3">
                    <div class="form-group">
                      <input
                        type="radio"
                        style="width: 50%; height: 2em;"
                        v-model="schoolYear.isActive"
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
                        v-model="schoolYear.isActive"
                        value="false"
                        name="iA"
                      />
                      <br>
                      <label for="exampleInputEmail1">False</label>
                    </div>
                      
                  </div>
                  
                </div>
               </div>
            </div>
          </div>
         
                     
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Select Start Date</label>
                <input
                  type="date"
                  v-model="schoolYear.start_Date"
                  class="form-control"
                  id="startDate"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Select End Date</label>
                <input
                  type="date"
                  v-model="schoolYear.end_Date"
                  class="form-control"
                  id="endDate"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
            </div>
          </div>
        

          <div class="row">
            <div class="col-md-10">
              <div class="form-group"></div>
            </div>
            <div style="margin-right:-30px;float:right " class="col-md-2" >
              <button
                type="button"
                v-on:click="save"
                class="btn btn-danger btn-lg"
              >
                Save
              </button>
            </div>
          </div>
          </div>            </div>
                     
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
    <CRow >
      <CCol col>
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" /><strong>  School Years</strong>
            <!-- Button trigger modal -->

            <!-- Modal -->
          </CCardHeader>
          <CCardBody>
            <div  class="row">
              <div class="col-md-12">
                <table class="table">
                  <thead>
                    <th>ID</th>
                    <th>Year</th>
                    <th>Is Active</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </thead>
                  <tbody>
                    <tr v-for="item in data" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.year }}</td>

                        <td>
                      <div
                        v-if="item.a"
                        class="primary"
                        role="alert"
                      >
                      <CIcon name="cil-thumb-up" />
                      
                      </div>
                      <div
                        v-if="!item.a"
                        class=" danger"
                        role="alert"
                      >
                      
                        <CIcon name="cil-thumb-down" />
                     
                      </div>
                    </td>
                    <td>{{ item.startDate }}</td>
                    <td>{{ item.endDate }}</td>

                    <td>
                      <a v-on:click="edit( item.id)"
                      >
                      
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

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Breadcrumbs",
  components: {},
  mounted() {
    this.OnDataLoad();
  },
  data() {
    return {
      data: [],
      img: "",
      schoolYear: {
        id: 0,
        year: "",
      start_Date:"",
end_Date:"",
        id: 0,
        isActive: false
      }
    };
  },
  mounted() {
    
    
    this.OnDataLoad();
  },
  methods: {
    edit(id)
    {
      var vm=this
     axios
        .get("http://localhost:1702/api/Setups/GetSchoolYear?id="+id)
        .then(response => {
          // JSON responses are automatically parsed.
            vm.schoolYear.id = response.data.id;
        
          vm.schoolYear.isActive = response.data.a;
          vm.schoolYear.year = response.data.year;
          vm.schoolYear.start_Date = response.data.startDate;
          vm.schoolYear.end_Date = response.data.endDate;
          alert(vm.schoolYear.start_Date)
         
         
         // alert(response.data)
        })
        .catch(e => {
          //  alert(e)
         console.log(e)
        });
    },
    OnDataLoad() {
      // alert('v')
      var vm = this;
      axios
        .get("http://localhost:1702/api/Setups/GetSchoolYear")
        .then(response => {
          // JSON responses are automatically parsed.
          vm.data = response.data;
        })
        .catch(e => {
          //  alert(e)
          this.errors.push(e);
        });
    },
    OnDataLoadSchoolYear(id) {
      // alert('v')
      var vm = this;
     // alert('s')
      axios
        .get("'http://217.61.21.52/api/Setups/GetSchoolYear/?id=" + id + "")
        .then(response => {
          alert(response.data)
          // JSON responses are automatically parsed.
          vm.schoolYear.id = response.data.id;
          vm.schoolYear.school_ID = response.data.sId;
          vm.schoolYear.year = response.data.year;
          vm.schoolYear.end_Date = response.data.ed;

          vm.schoolYear.start_Date = response.data.sd;
        })
        .catch(e => {
          //  alert(e)
         // this.errors.push(e);
        });
    },
   
    save() {
    
      if (this.schoolYear.year == "") {
        Swal.fire({
          title: "Error!",
          text: "Please Enter Year",
          icon: "error",
          confirmButtonText: "Ok"
        });
        return;
      }

      
      //     alert(this.schoolYear.school_ID)
      var vm = this;
      axios
        .post("http://localhost:1702/api/Setups/AddSchoolYear", vm.schoolYear,
      
        )

        .then(response => {
          if (response.data == true) {
            Swal.fire({
              title: "Successfully",
              text: "Successfully Saved",
              icon: "success",
              confirmButtonText: "Ok"
            });

            vm.schoolYear.id = "";
            vm.schoolYear.school_ID = "";
            vm.schoolYear.year = "";
            vm.schoolYear.end_Date = "";
            vm.schoolYear.start_Date = "";
          //  window.location.href = 'http://217.61.21.52:8080/?id=1#/base/SchoolYear'
        
          } else {
            Swal.fire({
              title: "Error!",
              text: "Filed!",
              icon: "error",
              confirmButtonText: "Ok"
            });
          }
          // JSON responses are automatically parsed.
          vm.data = response.data;
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    }
  }
};
</script>

<style scoped>

.breadcrumb-item + .font-xl.breadcrumb-item::before {
  color: rgb(140, 195, 38);
  content: ">>";
  padding: 0px 10px;
}
</style>
