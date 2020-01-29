<template>
  <CRow>
     <div style="width:2%"></div>
    <div style="width:96.5%;margin-bottom:20px;">
    <h3 style="font-wight:bold"> School Year List
      

<router-link class="btn btn-danger " style="float:right"
                        :to="{ name: 'SchoolYear' }"
                      >
                      
   <CIcon name="cil-plus" />Add School
            </router-link>

       
         
    </h3>
      
         </div>
    <CCol col>
      <CCard>
        <CCardHeader>
         <!-- Button trigger modal -->

          <!-- Modal -->
        </CCardHeader>
        <CCardBody>
          <div class="row">
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
                  <tr v-for="item in data" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
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
                    <td>
                      <router-link
                        :to="{ name: 'SchoolYear', params: { id: item.id } }"
                      >
                      
  <img  src="../../assets/img/icon-edit.png">
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
</template>

<script>
import axios from "axios";
export default {
  name: "Breadcrumbs",
  components: {},
  mounted() {
    this.OnDataLoad();
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    OnDataLoad() {
      // alert('v')
      var vm = this;
      axios
        .get("http://217.61.21.52/api/Setups/GetSchoolYear")
        .then(response => {
          // JSON responses are automatically parsed.
          vm.data = response.data;
        })
        .catch(e => {
          //  alert(e)
          this.errors.push(e);
        });
    }
  }
};
</script>

<style>
.breadcrumb-item + .font-xl.breadcrumb-item::before {
  color: rgb(140, 195, 38);
  content: ">>";
  padding: 0px 10px;
}
</style>
