/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function () 
{
	efgrid.submitInqu( "ef_grid_result", "ej","EJPD01","query");
}


/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ej","EJPD01","insert",true );
}


/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{
	efgrid.submitForm( "ef_grid_result", "ej","EJPD01","update",true );
}


/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{

    if(confirm(getI18nMessages("label.EJPDConfirmDeleteJobDefine","此次操作将删除该作业定义，要继续吗？"))){
  	   efgrid.submitForm( "ef_grid_result", "ej","EJPD01","delete", true );
  	}
}

/**
	grid单元格显示时，显示按钮信息。*/

efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
      if(grid_id=="ef_grid_result"){
         var grid = efgrid.getGridObject( "ef_grid_result" );
         var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
         var jobCode=grid.getCellValue(row_index,1,TYPE_FIX);
         //var jobParams = grid.getCellValue(row_index,3,TYPE_FIX);
         //alert(jobCode);
         //alert(jobParams); 
         if(columnEname=="asyOperate"){ 
              return "<div align='center' efval=''><input value='"+getI18nMessages("label.EJPDAsyOperate","自助运行")+"' class='buttonclass' type='button' style='height:22px' align='center' onclick='showWindowOfEJAC02(\""+jobCode+"\")'></div>" ;
          }
         if(columnEname=="viewJobQueue"){
             return "<div align='center' efval=''><input value='"+getI18nMessages("label.EJPDJobQueue","查看排队情况")+"' class='buttonclass' type='button' style='height:22px' align='center' onclick='showWindowOfEJPD02(\""+jobCode+"\")'></div>" ;        	 
         }
         if(columnEname=="viewJobHistory"){
             return "<div align='center' efval=''><input value='"+getI18nMessages("label.EJPDJobHistory","查看运行历史")+"' class='buttonclass' type='button' style='height:22px' align='center' onclick='showWindowOfEJPD03(\""+jobCode+"\")'></div>" ;        	 
         }
       }
}

showWindowOfEJPD02 = function(jobCode){

    if(!jobCode)
    {
       alert(getI18nMessages("label.EJPDPleaseAddWorkInfomation","请先添加作业信息！"));
       return;
    }
    efform.openNewForm('EJPD02', "methodName=query&inqu_status-0-jobEname=" + encodeURI(jobCode) );
}

showWindowOfEJPD03 = function(jobCode){

    if(!jobCode)
    {
       alert(getI18nMessages("label.EJPDPleaseAddWorkInfomation","请先添加作业信息！"));
       return;
    }
    efform.openNewForm('EJPD03', "methodName=query&inqu_status-0-jobEname=" + encodeURI(jobCode) );
}

/**
	弹出自助运行页面
*/
showWindowOfEJAC02 = function(jobCode){

    if(!jobCode)
    {
       alert(getI18nMessages("label.EJPDPleaseAddWorkInfomation","请先添加作业信息！"));
       return;
    }
    var inInfo = new EiInfo();
    inInfo.set("jobEname", jobCode);
    EiCommunicator.send( "EJPD00", "excute" , inInfo, null );
	//var childWindow = efform.openNewForm('EJAC02', "serviceName=EJAC02&methodName=getWorkInfo&workEname=" + workEname);
    //childWindow.focus();
}

//efgrid_onFixCellClick = function(grid_id, row_index, col_index, cell_value) {
//		if (col_index == 1) {	
//			efform.openNewForm('EJPD02', "methodName=query&inqu_status-0-jobEname=" + encodeURI(cell_value) );
//		}
//}

//efgrid_onFixCellDisplayReady = function(div_node_html,row_index, col_index, cell_value, display_value, grid_id){
//    if (col_index==0&&display_value)
//      return "\<a href='javascript:void(0)' onclick='showSql(\""+ display_value + "\" )'>&nbsp;"+ display_value +"&nbsp;</a>" ;    
//}
//
//showSql = function( jobEname ){ 
//    efform.openNewForm('EJPD02', "methodName=query&inqu_status-0-jobEname=" + encodeURI(jobEname) );   
//}
