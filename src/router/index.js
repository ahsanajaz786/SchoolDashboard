import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')


// Views - Components
const Cards = () => import('@/views/base/Cards')
const School = () => import('@/views/base/School')
const AddSchool = () => import('@/views/base/AddSchool')
const SchoolYear = () => import('@/views/base/SchoolYear')
const Student = () => import('@/views/base/Student')
const Login = () => import('@/views/pages/Login')
const Class = () => import('@/views/base/Class')
const Subject = () => import('@/views/base/Subject')
const Teacher = () => import('@/views/base/Teacher')
const Section = () => import('@/views/base/Section')
const ClassSection = () => import('@/views/base/ClassSection')
const Event = () => import('@/views/base/Event')
const ShiftClass = () => import('@/views/base/ShiftClass')
const SchoolYearList = () => import('@/views/base/SchoolYearList')
const TeacherStubjectAssign = () => import('@/views/base/TeacherStubjectAssign')

const classSubject = () => import('@/views/base/ClassSubject')


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      color:'green',
      component: TheContainer,
      children: [
        {

          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
          ,props:true
        },
       
       
        
        
       
        
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            
            {
              path: 'School',
              name: 'School',
              component: School
            },
            {
              path: 'classSubject',
              name: 'classSubject',
              component: classSubject
              ,props:true
            },
            {
              path: 'ShiftClass',
              name: 'Shift Class',
              component: ShiftClass
              ,props:true
            },
            {
              path: 'Class',
              name: 'Class',
              component: Class
              ,props:true
            },
            {
              path: 'Teacher',
              name: 'Teacher',
              component: Teacher
              ,props:true
            },{
              path: 'Event',
              name: 'Event',
              component: Event
              ,props:true
            },

            {
              path: 'Student',
              name: 'Student',
              component: Student
              ,props:true
            },
            {
              path: 'Subject',
              name: 'Subject',
              component: Subject
              ,props:true
            },
            {
              path: 'ClassSection',
              name: 'ClassSection',
              component: ClassSection
              ,props:true
            }
            ,
            {
              path: 'AddSchool/:id?',
              name: 'AddSchool',
              component: AddSchool,
              props: true
              }, {
              path: 'SchoolYear',
              name: 'SchoolYear',
              component: SchoolYear
            },
            {
              path: 'SchoolYearList',
              name: 'School Year List',
              component: SchoolYearList
              ,props:true
            },
            {
              path: 'TeacherStubjectAssign',
              name: 'TeacherSubject',
              component: TeacherStubjectAssign
              ,props:true
            },
            {
              path: 'Section',
              name: 'Section',
              component: Section
              ,props:true
            },
         
          ]
        },
      
        
        
      ]
    },
    {
      path: '/',
      redirect: '/',
      name: '',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    }
 
  ]
}

