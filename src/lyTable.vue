<template>
  <div style="margin-bottom: 20px;margin: 10px 20px 10px 20px;">
    <div> 
        <div style="float:left;padding-top:10px">
        <label style="font-weight:bold;">Show</label>  
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                {{data_pageSize}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="10">10</el-dropdown-item>
                <el-dropdown-item command="25">25</el-dropdown-item>
                <el-dropdown-item command="50">50</el-dropdown-item>
                <el-dropdown-item command="100">100</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>     
        <label style="font-weight:bold;">entries</label>  
        </div>
        <div class="search-Box" style="float:right;width:250px;height:40px;padding-right:10px;">
                <el-label style="float:left;font-weight:bold;padding-top:10px">Search:</el-label>
                <el-input style="display:inline;float:right;width:180px" prefix-icon="el-icon-search" placeholder="请输入搜索内容" icon="search" class="search" v-model="data_search"></el-input>
        </div>
    </div>
    <el-table :data="(data_filter_table=tables).slice((data_currentPage-1)*data_pageSize,data_currentPage*data_pageSize)" :stripe="stripe" :border="border" :height="height" :max-height="max_height" :size="size" :show-header="show_header" :highlight-current-row="highlight_current_row" :current-row-key="current_row_key" :row-class-name="row_class_name" :row-style="row_style" :cell-class-name="cell_class_name" :cell-style="cell_style" :row-key="row_key" :show-summary="show_summary" @select="handleSelect" @select-all="handleSelectAll" @selection-change="handleSelectionChange" @cell-mouse-enter="handleCellMouseEnter" @cell-mouse-leave="handleCellMouseLeave" @cell-click="handleCellClick" @row-click="handleRowClick" @header-click="handleHeaderClick" ref="ref_table">
        <slot></slot>
    </el-table>
    <div style="padding-top:10px;vertical-align:middle">
        Showing {{data_show_first}} to {{data_show_end}} of {{data_filter_table_length}} entries<span v-if="data_filter_table_length!=data_total">(filtered from {{data_total}} total entries)</span>
        <el-pagination style="float:right" layout="prev, pager, next" :page-size="data_pageSize" :total="data_filter_table.length" background @current-change="handleCurrentPage" :current-page="data_currentPage">
    </div>
  </div>
</template>

<script>
  export default {
    props:{
        data:{},
        stripe:{default:true},
        border:{default:true},
        height:{default:null},
        max_height:{default:null},
        size:{default:null},
        show_header:{default:true},
        highlight_current_row:{default:false},
        current_row_key:{default:null},
        row_class_name:{default:null},
        row_style:{default:null},
        cell_class_name:{default:null},
        cell_style:{default:null},
        row_key:{default:null},
        show_summary:{default:false},
        ref_table:{default:null}
    },
    data() {
        return {
            data_total:100,//默认数据总数
            data_pageSize:10,//每页的数据条数
            data_currentPage:1,//默认开始页面
            data_search: '',  //搜索内容
            data_filter_table:[],
        }
    },
    watch:{
        tables(val){
            this.data_filter_table = val;
            this.data_currentPage = 1;
        }
    },
    computed: {
        // 模糊搜索
        tables:function(){
            var data_search=this.data_search;
            if(data_search){
                return  this.data.filter(function(dataNews){
                    return Object.keys(dataNews).some(function(key){
                        return String(dataNews[key]).toLowerCase().indexOf(data_search) > -1
                    })
                })
            }else{
                this.data_total = this.data.length;
            }
            return this.data;
        },
        data_pageSize(){
            return this.data_pageSize;
        },
        data_search: {
            get () {
                return this.data_search;
            },
            set (val) {
                this.data_search = val;
            }      
        },
        data_total(){
            return this.data_total;
        },
        data_filter_table_length(){
            return this.data_filter_table.length;            
        },
        data_show_first(){
            return ((this.data_currentPage-1)*(this.data_pageSize)+1)>this.data_filter_table.length?0:((this.data_currentPage-1)*(this.data_pageSize)+1);         
        },
        data_show_end(){
            return (this.data_currentPage*(this.data_pageSize))>this.data_filter_table.length?this.data_filter_table.length:(this.data_currentPage*(this.data_pageSize));
        },
        data_currentPage(){
            return this.data_currentPage;
        },
    },
    methods: {
        handleCommand(val){
            this.data_pageSize = val;
            this.data_currentPage = 1;
        },
        handleCurrentPage(val){
            this.data_currentPage = val;
        },
        //el-table 对应事件
        handleSelect(selection, row){
            this.$emit('select',selection, row);
        },
        handleSelectAll(selection){
            this.$emit('select-all',selection);
        },
        handleSelectionChange(selection){
            this.$emit('selection-change',selection);
        },
        handleCellMouseEnter(row, column, cell, event){
            this.$emit('cell-mouse-enter',row, column, cell, event);
        },
        handleCellMouseLeave(row, column, cell, event){
            this.$emit('cell-mouse-leave',row, column, cell, event);
        },
        handleCellClick(row, column, cell, event){
            this.$emit('cell-click',row, column, cell, event);
        },
        handleRowClick(row, column, event){
            this.$emit('row-click',row, column, event);
        },
        handleHeaderClick(column, event){
            this.$emit('header-click',column, event);
        },
        clearSelection(){
            this.$refs.ref_table.clearSelection();
        },
        toggleRowSelection(row, selected){
            this.$refs.ref_table.toggleRowSelection(row, selected);
        },
        toggleAllSelection(){
            this.$refs.ref_table.toggleAllSelection();
        },
        setCurrentRow(row){
            this.$refs.ref_table.setCurrentRow(row);
        }
    }
  };
</script>

