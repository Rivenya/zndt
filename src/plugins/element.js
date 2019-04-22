import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Input,
  Radio,
  Form,
  FormItem,
  Switch,
  Popover,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Menu,
  MenuItem,
  Submenu,
  Pagination,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Switch)
Vue.use(Popover)
Vue.component(Message.name, Message)
Vue.prototype.$message = Message
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Badge)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Loading)
