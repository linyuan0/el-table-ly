# el-table-ly
![](https://linyuan0.github.io/el-table-ly.png) 
> Encapsulate the element twice, combine el-table with pagination, search and the number of rows displayed on the current page.


**安装使用:()**

``` bash
注意：本组件依赖如下包，如果没有请安装
vue
   npm install vue
elementUI
   npm i element-ui -S

npm i el-table-ly     

import lyTable from 'el-table-ly'

components: { lyTable }

<ly-table :data="dataTable"></ly-table>
```

**简单例子:**
``` bash
    <ly-table :data="dataTable">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="host" label="主机" sortable></el-table-column>
        <el-table-column prop="name" label="名称" sortable></el-table-column>
        <el-table-column prop="expression" label="表达式" sortable></el-table-column>
        <el-table-column prop="status" label="状态" sortable></el-table-column>
        <el-table-column label="删除">
            <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
        </el-table-column>
    </ly-table>

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import lyTable from 'el-table-ly'

export default {
    name: 'mgr_manage',
    components: { lyTable },
    data() {
        return {
            dataTable:[{"host":"h25","name":"xxx25h28","expression":"111","status":"ok"},
                        {"host":"h28","name":"xxx28","expression":"2222xxx","status":"warning"},
                        {"host":"h25","name":"yyy25","expression":"2222xxx","status":"warning"},
                        {"host":"h25","name":"xxx25","expression":"111xxx","status":"ok"},
                        {"host":"h28","name":"xxx28","expression":"2222xxx","status":"warning"},
                        {"host":"h25","name":"yyy25","expression":"2222xxx","status":"warning"},
                        {"host":"h25","name":"xxx25","expression":"111xxx","status":"ok"},
                        {"host":"h28","name":"xxx28","expression":"2222xxx","status":"warning"},
                        {"host":"h25","name":"yyy25","expression":"2222xxx","status":"warning"},
                        {"host":"h25","name":"xxx25","expression":"111xxx","status":"ok"},
                        {"host":"h28","name":"xxx28","expression":"2222xxx","status":"warning"},
                        {"host":"h25","name":"yyy25","expression":"2222xxx","status":"warning"}]
        }
    }
}
``` 
**ly-table支持的属性**
``` bash
    data,
    stripe,
    border
    height,
    max_height,
    size,
    show_header,
    highlight_current_row,
    current_row_key,
    row_class_name,
    row_style,
    cell_class_name,
    cell_style,
    row_key,
    show_summary
基本和el-table使用方法一致,只是需要使用v-bind   比如 <ly-table :data="dataTable" :highlight_current_row="true"></ly-table>
``` 
**ly-table支持的事件**
``` bash
    @select 
    @select-all 
    @selection-change
    @cell-mouse-enter
    @cell-mouse-leave 
    @cell-click 
    @row-click 
    @header-click
使用和el-table一致        比如 <ly-table @row-click="handleRowClick"></ly-table>
``` 