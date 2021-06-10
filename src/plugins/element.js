import Vue from 'vue'
import { Button, Form, FormItem, Switch, Pagination, TableColumn, MessageBox, Row, Col, Table, Input, Message, Card, Container, Header, Aside, Main, MenuItem, Dialog, Submenu, MenuItemGroup, Menu, Breadcrumb, BreadcrumbItem } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(MenuItem)
Vue.use(Dialog)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Switch)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm