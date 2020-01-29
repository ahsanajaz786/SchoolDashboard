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
                  <div class="col-md-4">
          <h2 style="font-weight: bold;">Teacher  Subject <Section></Section></h2>
                  </div>
                  <div class="col-md-2"></div>
                  <div class="col-md-3">
         <input type="text" style="height:45px" class="form-control"  placeholder="Search">

              </div>
              
              <div class="col-md-3">
                             <button class="btn btn-danger " style="height:45px;width:100%;"  @click="smallModal = true" >  <CIcon name="cil-plus" />Assign Teacher Subject</button>

               
    
              </div>
               <CModal
      title="Add New Class Subject"
      
      :show.sync="smallModal"
    >
     
     <div class="row">
         <div class="col-md-12">
              <div class="form-group">
    <label for="exampleInputEmail1">Select  Teacher</label>
    <select style="height:50px" class="form-control" v-model="teachersubject.teacher_Id" >
    <option value="0">Select Teacher</option>    
    <option v-for="i in teacherData" :key="i.id" :value="i.user_id">{{i.name}}</option>
    </select>
    
    
      </div>
         </div>
          
     </div>
     <div class="row">
         <div class="col-md-12">
               <div class="form-group">
    <label for="exampleInputEmail1">Select Class</label>
   
    
    <select style="height:50px" class="form-control" v-model="classid" v-on:change="getSection">
    <option value="-1">Select Class</option>
    <option v-for="item in classData" :key="item.id" :value="item.id">{{item.level}}</option>

    </select>
    
      </div>
         </div>
          
     </div>
      <div class="row">
         <div class="col-md-12">
               <div class="form-group">
    <label for="exampleInputEmail1">Select Section </label>
   
    
    <select style="height:50px" class="form-control" v-model="csectionid" v-on:change="getSubject">
    <option value="-1">Select Section</option>
    <option v-for="item in sections" :key="item.id" :value="item.id">{{item.sectionName}}</option>

    </select>
    
      </div>
         </div>
          
     </div>
        <div class="row">
         <div class="col-md-12">
                <div class="form-group">
    <label for="exampleInputEmail1">Select Subject </label>
   
    
    <select style="height:50px" class="form-control" v-model="teachersubject.subject_Id">
    <option value="-1">Select Subject</option>
    <option v-for="item in subjectdata" :key="item.id" :value="item.subjectid">{{item.title}}</option>

    </select>
    
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
                                
                               
                                    <th>ID </th>
                                    <th>Teacher Name</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Subject</th>

                                    
                                             
                                               
                                  <th>Action </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="item in TeacherSubjectData" :key="item.id">
                                
                               <td>{{item.id}}</td> 
                              <td>{{item.fullName}}</td> 
                              <td>{{item.level}}</td> 
                              
                                 <td>{{item.sectionName}}</td>    
                                   <td>{{item.title}}</td>    
                                  
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
     this. getClassData()
     
   this.loadTeacherSubjectData()
     this.loadTData()

    }

   
  },
  data() {
    return {
        csectionid:0,
        classid:0,
        smallModal:false,
     data:[],
     buttonText:"Save",
     sections:[],
      classID:0,
      sectionData:[],
    classData:[],
    teachersubject:{
      id:0,class_Id:0,teacher_Id:0,section_Id:0,subject_Id:0,class_section:0
    },
    classSubjectData:[],
    subjectdata:'',
    teacherData:[],
    TeacherSubjectData:[]
    };
  },
  methods: {
       loadTeacherSubjectData()
   {
     var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetTeacherSubject",
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
          vm.TeacherSubjectData = response.data;
          console.log("Ldata",response.data)
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
       subjectSectionData()
    { var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetClassSectionSubject",
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
          vm.classSubjectData = response.data;
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

    },
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
          vm.classData = response.data;
          console.log(response.data)
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
         
this.classid=0
this.class_subjects.id=0
this.class_subjects.class_section_Id=0
this.class_subjects.subject_Id=0

      },
      saveData()
      {
       var vm=this
       vm.teachersubject.class_Id=this.classid
        vm.teachersubject.class_section=this.csectionid
        if(  this.teachersubject.class_section==0||this.teachersubject.teacher_Id==0)
        {
          Swal.fire({
          title: "Error!",
          text: "Please Select Items",
          icon: "error",
          confirmButtonText: "Ok"
        });
          return
        }
        if(this.sections.length>0)
        {
              vm.teachersubject.section_Id=this.sections[0].sectionID
      
        }
        console.log("data",vm.teachersubject)
        
        axios
        .post(URL.url+"SchoolSetup/AssignTeacherSubject",
        vm.teachersubject
,{
           
                headers: {
                    'Accept': 'application/json',
                     'Authorization': 'Bearer ' + localStorage.getItem("token")
                    //  
                }
        })
        .then(response => {
           vm.smallModal = false
     vm.loadTeacherSubjectData()       
  this.buttonText="Save"
         
this.classid=0
this.class_subjects.id=0
this.class_subjects.class_section_Id=0
this.class_subjects.subject_Id=0
            this.buttonText="Save"
           vm.subjectSectionData()
          // JSON responses are automatically parsed.
        
        })
        .catch(e => {
       
          this.errors(e);
        });
    },
    edit(v)
    {
      
     this.buttonText="Update"
        
this.classid=v.classid
this.class_subjects.id=v.id
this.class_subjects.class_section_Id=v.sectionId
this.class_subjects.subject_Id=v.subjectid
this.smallModal = true
this.getSection()

    },
    getData()
    { var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetSubject",
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
          console.log(response.data)
        })
        .catch(e => {
          alert(e);
          this.errors.push(e);
        });
    

    },
     getSubject()
    { 
        console.log("section",this.csectionid)
        var vm=this
      axios
        .get(URL.url+"SchoolSetup/GetClassSectionSubject?id="+vm.csectionid,
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
          vm.subjectdata = response.data;
          console.log(vm.subjectdata)
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
