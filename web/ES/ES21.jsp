<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String etc1 = "maxLength='256' regex='/^[_a-z0-9]{1,256}$/i' nullable='false' minLength='1' maxLength='256' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起") +","+I18nMessages.getText("label.ESUserIdRestraint","用户名只能是256位英文字母或者数字字符或下划线。")+"'";
	String etc2 = "regex='/^[^\\x22\\x27]+$/' nullable='false' minLength='1' maxLength='30' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起") +","+I18nMessages.getText("label.ESUserCnameRestraint","用户姓名应该由至少一个，最多30个字节大小的字符组成，并且不能包含控制字符和单，双引号。")+"'";
	String etc3 = "regex='/^[0-9a-zA-Z#*]{0,24}$/' nullable='true'  maxLength='18' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起") +","+I18nMessages.getText("label.ESUserIdcardNoRestraint","身份证件号码由少于等于18个数字字符,字母，#和*组成。")+"'";
	String etc4 = "regex='/^[^\\x22\\x27]+$/' nullable='true' minLength='1' maxLength='16' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起") +","+I18nMessages.getText("label.ESUserOrgCodeRestraint","组织机构代码应该由至少一个，最多16个字节大小的字符组成，并且不能包含控制字符和单，双引号。")+"'";
	String etc5 = "regex='/^[^\\x22\\x27]+$/' nullable='true' minLength='1' maxLength='100' errorPrompt='"+I18nMessages.getText("label.EFSorry","对不起") +","+I18nMessages.getText("label.ESUserOrgNameRestraint","组织机构名称应该由至少一个，最多100个字节大小的字符组成，并且不能包含控制字符和单，双引号。")+"'";
%>
<%@page import="com.baosight.iplat4j.core.resource.I18nMessages"%>
<html>
<head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES21.js"></script>
</head>
 
<body class="bodyBackground">
<form id="ES21" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

  <div id = "ef_region_inqu" title="<%=I18nMessages.getText("label.EFQueryConditions","查询条件") %>" efRegionShowClear=true>
  	<div>
		 <table>
		  <tr>
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="queryUserId" row="0" />					
		    </td>
		   </tr> 
		   </table> 
	</div>
  </div> 

  
  <div id = "ef_region_result" title="<%=I18nMessages.getText("label.EFUserDetail","用户详情") %>" >
   <div>	
		<table>		  
		  <tr>
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userId","用户标识") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userId" row="0" style="width:300px"
			  etc="<%=etc1%>"
			  />					
		    </td>
		   </tr> 
		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userCname","用户姓名") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userCname" row="0" trim="false" style="width:300px"
			  etc="<%=etc2%>"/>
			  <span id="inqu_status-0-userCname-prompt" color=red style='background-color:white;'>【<%=I18nMessages.getText("label.ESUserCnameRestraint","用户姓名应该由至少一个，最多30个字节大小的字符组成，并且不能包含控制字符和单，双引号。") %>】</span>					
		    </td>	
		   </tr> 

		   <tr style="display:none"> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userType","用户类型") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userType" row="0" etc="readonly"/>					
		    </td>	
		   </tr> 
		   <tr > 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userIdcardNo","用户身份证号") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userIdcardNo" row="0" trim="false" style="width:300px"
			  etc="<%=etc3%>"/>					
			  <span id="inqu_status-0-userIdcardNo-prompt" color=red style='background-color:white;'>【<%=I18nMessages.getText("label.ESUserIdcardNoRestraint","身份证件号码由少于等于18个数字字符,字母，#和*组成。") %>】</span>									
		    </td>	
		   </tr> 

		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userOrgCode","组织机构代码") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userOrgCode" row="0" trim="false" style="width:300px"			  
			  etc="<%=etc4%>"/>
			  <span id="inqu_status-0-userOrgCode-prompt" color=red style='background-color:white;'>【<%=I18nMessages.getText("label.ESUserOrgCodeRestraint","组织机构代码应该由至少一个，最多16个字节大小的字符组成，并且不能包含控制字符和单，双引号。") %>】</span>								
		    </td>	
		   </tr> 

		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userOrgName","组织机构名称") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userOrgName" row="0" trim="false" style="width:300px"		 
			   etc="<%=etc5%>"/>
			    <span id="inqu_status-0-userOrgName-prompt" color=red style='background-color:white;'>【<%=I18nMessages.getText("label.ESUserOrgNameRestraint","组织机构名称应该由至少一个，最多100个字节大小的字符组成，并且不能包含控制字符和单，双引号。") %>】</span>					
		    </td>	
		   </tr> 
		   
		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userTel","电话号码") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userTel" row="0" trim="false" style="width:300px"
			  etc="maxLength='24' validateType='phone_with_area_code' "/>
			  <span id="inqu_status-0-userTel-prompt" color=red style='background-color:white;'>【<%=I18nMessages.getText("label.ESUserTelRestraint","(3-4位的数字区号)-(3-11位数字号码)或者带上一个(-数字号码)，总长不能超过24位，允许为空") %>】</span>										
		    </td>	
		   </tr> 

		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userMobile","手机号码") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userMobile" row="0" trim="false" style="width:300px"
			  etc="validateType='mobile_phone' "/>	
			  <span id="inqu_status-0-userMobile-prompt" color=red style='background-color:white;'>【<%=I18nMessages.getText("label.ESUserMobileRestraint","13、15或者18开头的11位长的数字，允许为空") %>】</span>								
		    </td>	
		   </tr> 
		   
		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userEmail","电子邮件") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userEmail" row="0" trim="false" style="width:300px"
			  etc="maxLength='64' validateType='email' "/>
			   <span id="inqu_status-0-userEmail-prompt" color=red style='background-color:white;'>【<%=I18nMessages.getText("label.ESUserEmailRestraint","(字母、数字、\".\"、\"_\"、\"-\")@(字母数字_-).(字母数字)，总长不能超过64位，允许为空") %>】</span>									
		    </td>	
		   </tr> 		

		   <tr> 
		    <td  nowrap width="15%"><%=I18nMessages.getText("E_Col.userLock","是否锁定") %></td>
		    <td   width="85%">
			  <EF:EFInput blockId="inqu_status" ename="userLock" row="0" type="checkbox" value="1" trim="false" />					
		    </td>	
		   </tr> 	
		   
		   <tr style = "display:none"> 
			<td nowrap width="15%"><%=I18nMessages.getText("E_Col.userDetail","描述") %></td>
			<td  width="85%">
				<EF:EFInput blockId="inqu_status" ename="userDetail" row="0" style="width:300px"
				type="textarea" trim="false"
				etc="cols='100' rows='6'" />
			</td>				
		   </tr> 		      
		</table>
	</div>
   </div>  
  <EF:EFRegion/>
 
 </form>
 </body>
</html>