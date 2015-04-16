                  
var mainBoard;
var mainDesignContent;
var hint;

var dragBegin;
var orgX;
var orgY;

var currentDragObject;
var amplifyTimeField
var amplifyTime;
var equipmentSizeField;
var equipment;
var propertySetter;
var currentSelectedControl;
var util;
var container;
var isAdd;
var deviceType;   //��ǰ�豸����
var dragType;
var controlIndex=0;
var Supplier;
var ifBelongGrid;

//��̬�������԰�ť
var addAttrBtn;
var newAttrName;
var newAttrValue;

//�Ƿ��ǵ���Ĳ���
var importFlag;
var layoutContent;
var impFileBtn;

//added by shaohuan
var targetContainer;  //Ŀ������
var freezeCursor;  //�����������ȥ������֮ǰ���ƶ��Ĺ����в����������״�ټ����ı�
var selfUpdate;    //���±�ʶ
var editStatus;    //�ı���ؼ��ı༭״̬
var explorerType;  //���������
var test;          //����

//���������
var browserType;

//����tabҳ
var tabSet;
var currentTab;


//Ϊ�϶����ɿؼ�����Ҫ��ȫ�ֱ���
var _startX = 0;            //�����ʼλ��
var _startY = 0;
var _offsetX = 0;           // ���뵱ǰԪ�ص�ƫ��
var _offsetY = 0;
var _dragElement;          
var _oldZIndex = 0;         //��ʱ������ק�����zIndex


function initPage()
{
	mainBoard = document.getElementById("mainBoard");
	mainBoard.className = "canvas";
	mainDesignContent = document.getElementById("mainDesignContent");
	hint = document.getElementById("hint");
	equipmentSizeField = document.getElementById("equipmentSizeField");
	amplifyTimeField = document.getElementById("amplifyTimeField");
	equipment = document.getElementById("equipmentField");
	dragBegin = false;
	deviceType = "iPad";
	Supplier = "Apple";
	equipmentField.value = "iPad";
	ifBelongGrid = false;
	freezeCursor = false;
	orgX = -1;
	orgY = -1;
	isAdd = true;
	currentDragObject = null;
	amplifyTime = eval(amplifyTimeField.innerText);
	propertySetter = new propertySetter();
	propertySetter.init();
	util = new Util();
	generateControlList();
	detectBrowser();
	
	//��̬�������԰�ť
	addAttrBtn = document.getElementById("addAttrBtn");
	newAttrName = document.getElementById("newAttrName");
	newAttrValue = document.getElementById("newAttrValue");
	
	addAttrBtn.onclick = addNewProperty;	
	selfUpdate = false;         //�Ը���
	importFlag = false;         //�Ƿ�������Ĳ���
	editStatus = false;         //�ı���ؼ��Ƿ��Ǳ༭״̬
	
	//tabSet
	tabSet = new Array();
	tabSet.push("mainDesign");
	tabSet.push("mainCode");
	tabSet.push("layoutCode");
	currentTab = "mainDesign";
	
	//��ק��
	util.$('dragger').style.display = "none";
	
}

//added by shaohuan
//chrome��safari�õ���ͬһ�ںˣ�����Ҫ����Դ�
//�ж����������
function detectBrowser()
{
       var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
       
	   var OsObject = "";  
	   if(navigator.userAgent.indexOf("MSIE")>0) {  
	        return "MSIE";  
	   }  
	   
	   if(is_chrome) {  
	        return "Chrome";  
	   }  
	   
	   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
		   if (!is_chrome)
			   return "Safari";  
	   }   

	   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
	        return "Firefox";  
	   }  

	   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
	        return "Camino";  
	   }  
	   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
	        return "Gecko";  
	   }  
	   return Osobject;
}

//added by shaohuan
//�л��豸����ʱ�����ʱ����
resetPropertyPanel = function()
{
	dragBegin = false;
	ifBelongGrid = false;
	freezeCursor = false;
	orgX = -1;
	orgY = -1;
	currentDragObject = null;
	document.getElementById("attributeContent").innerHTML = "";
	document.getElementById("layoutCodeButton").innerHTML = "&nbsp; ���벼�� &nbsp; ";
	util.$('dragger').style.display = "none";
	propertySetter.currentControlType = null;
	propertySetter.currentControlNode = null;
	propertySetter.newPropertyName = "";
	propertySetter.newPropertyValue = "";
	propertySetter.firstTime = true;
	selfUpdate = false;
	importFlag = false;
	editStatus = false;
}


//added by shaohuan
//��property��������µ�����
addNewProperty = function()
{
	var name = newAttrName.value;
	var value = newAttrValue.value;
	propertySetter.addPropertyToNode(newAttrName.value,newAttrValue.value);
	
}



importLayoutFile = function()
{
	layoutContent = "";
	var ForReading = 1;
	
	if (window.File && window.FileReader && window.FileList && window.Blob) {
//	    var r = new FileReader();
//        var content = r.readAsDataURL(document.all.attachFile.value);
//        alert(content);
        alert(document.all.attachFile.value);
	} else {//IE�����
		var fso = new ActiveXObject("Scripting.FileSystemObject");
	    var reader = fso.OpenTextFile(document.all.attachFile.value, ForReading,1,-1); /*�˴�Ϊ��ȫ��·�����ļ���*/
	    if(!reader.atendofstream)  
	    {     
	       //һ����ȫ���������е�����  
	    	layoutContent = reader.ReadAll();  
	    }  
	    reader.Close();    
	}
	

//    var f = attachFile; 
//	
//    if (f) {
//      var r = new FileReader();
//      r.onload = function(e) { 
//	      var contents = e.target.result;
//        alert( "Got the file.n" 
//              +"name: " + f.name + "n"
//              +"type: " + f.type + "n"
//              +"size: " + f.size + " bytesn"
//              + "starts with: " + contents.substr(1, contents.indexOf("n"))
//        );  
//      }
//      r.readAsText(f);
//    } else { 
//      alert("Failed to load file");
//    }
//	
	//���´���ֻ������IE
//    var fso, f1, reader;
//    var ForReading = 1;
//    fso = new ActiveXObject("Scripting.FileSystemObject");
//    reader = fso.OpenTextFile(document.all.attachFile.value, ForReading,1,-1); /*�˴�Ϊ��ȫ��·�����ļ���*/
//    if(!reader.atendofstream)  
//    {     
//       //һ����ȫ���������е�����  
//    	layoutContent = reader.ReadAll();  
//    }  
//    reader.Close();
    
    importLayout();
}


function showFileContent() {
	 if (document.ReadURL.finished==0) {
	  setTimeout("showFileContent()",100);
	  return;
	 }
	 fileContent=document.ReadURL.fileContent;
	 document.form1.textarea1.value=fileContent;
	}


//added by shaohuan
//�������е���ͼ����
importLayout = function()
{
	importFlag = true;
	var nodeList = new Array();                   //�洢�����ļ��е����нڵ�
	var appendFlag = new Object();                //�ڵ��Ƿ��Ѿ�����ı�ʶ��
	
	//У�鵼�벼���뵱ǰ�����Ƿ�ƥ��
	var layoutType = layoutContent.substring(0,4);
	if (layoutType != deviceType)
	{
		alert("���벼���ļ��뵱ǰ���ֲ�ƥ�䣡");
		return;
	}
	
	
	
	layoutContent = layoutContent.substring(4);
	eval("var p="+layoutContent+";");
	for (var i=0; i<p.block.rows.length; i++)
	{
		var	controlName = p.block.rows[i].type;
		var x = p.block.rows[i].x;
		var y = p.block.rows[i].y;
		var width = p.block.rows[i].width;
		var height = p.block.rows[i].height;
		var node = eval("new " + Supplier + controlName + "(" +x+"," + y + "," + width + "," + height + ").obj");
		
		node.property.eName= p.block.rows[i].eName;
		node.property.eValue = p.block.rows[i].eName;
		node.property.eBindName = p.block.rows[i].eBindName;
		node.property.eId = p.block.rows[i].eId;
		node.property.eParent = p.block.rows[i].eParent;
		
		
		for (var attr in p.block.rows[i])
		{
			//�������JSON���а����Զ������ԣ����轫�Զ������Ը���node��Property���Լ���ӵ�����Custom��ȥ
			//node��GROUP����û�У�����������x,y,width,......eBindName
			if (!ifSelfPropertyExist(node,attr) && !ifVarInNode(node.property,attr))
			{
				node.property.group["Custom"].push(attr);                     //������
				node.property[attr] = p.block.rows[i][attr];                 //������������ֵ
			}
		}
		
	    //���ˣ�һ���ڵ��Ѵ��������Ҫ������ӵ��ڵ㼯����
		nodeList.push(node);
		
		//����˽ڵ�û�и��ڵ㣬��ֱ����ӵ�������
		if (node.property.eParent == "self")
		{
			setNodeOriginAndSize(node,amplifyTime);
			mainBoard.appendChild(node);
			appendFlag[node.property.eId] = true;
		}
		else{
			appendFlag[node.property.eId] = false;
		}
	}
	
	//��ʼ����������ӵ�������
    for (var i=0; i<nodeList.length; i++)
    {
    	var node = nodeList[i];
    	var eId = node.property.eId;
    	if (appendFlag[eId] == false)
    	{
    		var parentNode;
    		var eParentId = node.property.eParent;
    		for (var j=0; j<nodeList.length; j++)
    		{
    			if (nodeList[j].property.eId == eParentId)
    				parentNode = nodeList[j];
    		}
    		setNodeOriginAndSize(node,amplifyTime);
    		parentNode.appendChild(node);
    		appendFlag[eId] = true;
    	}
    }
		
	importFlag = false;
}


//added by shaohuan
//�жϵ����JSON����û���Զ�������
ifSelfPropertyExist = function(node, selfPropertyName)
{
	var groups = node.property.group;	
	for(var i=0;i<groups.length;i++)
	{
		var group =  groups[i];

		for(var j=0;j<groups[groups[i]].length;j++)
		{
			if (node.property.group[groups[i]][j]==selfPropertyName)
				return true;
		}
	}
	return false;
}

//added by shaohuan
//�ж�NODE�Ƿ���ĳ����
ifVarInNode = function(node,name)
{
	for (var c in node)
	{
		if (c == name)
			return true;
	}
	return false;
}


//����
saveLayoutFile = function()
{
//	var text = document.getElementById("mainCodeArea").innerText;
	var text = generateJsonString();
	text = deviceType+text;
	
	if (text.length > 30  && confirm("Ҫ������"))
	{
		//�ж����������
		switch(detectBrowser()){
		case "MSIE":
			var b=window.open('', '', 'height=600, width=600, top=200, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
			b.document.open(); 
			b.document.write(text); 
			b.document.close(); 
			b.document.execCommand('Saveas',false,'C:\\design.txt');
			b.close();
			break;
		case "Chrome":
			var content = text;
			var uriContent = "data:application/octet-stream," + encodeURIComponent(content);
			var newWindow = window.open(uriContent, 'neuesDokument');
			break;
		case "Safari":
			var content = text;
			var makeDataURI = "data:application/octet-stream,"+ encodeURIComponent(content);
			document.location.href = makeDataURI;
			break;
		}

	}
}

onEquipmentChanged = function(sender)
{
	saveLayoutFile();
	//��ȡ�豸����
	deviceType = sender.options[sender.selectedIndex].value;
	switch(deviceType)
	{
		case "iPad":
			Supplier = "Apple";
			mainBoard.innerHTML = "";    //��ջ���
			generateControlList();
			equipmentSizeField.value = "1024*768";
			setAmplifyTime(0.5);
			setEquipmentSize("1024*768",amplifyTime);
			showScaling();
//			importLayout();            //���벼�ֺ���
			resetPropertyPanel();
			break;
		case "iPhone":			
			Supplier = "Apple";
			generateControlList();
			mainBoard.innerHTML = "";
			equipmentSizeField.value = "320*480";
			setAmplifyTime(1);
			setEquipmentSize("320*480",amplifyTime);
			showScaling();
			resetPropertyPanel();
			break;
		case "aPad":
			Supplier = "Android";
			generateControlList();
			mainBoard.innerHTML = "";
			equipmentSizeField.value = "1024*768";
			setAmplifyTime(0.5);
			setEquipmentSize("1024*768",amplifyTime);
			showScaling();
			resetPropertyPanel();
			break;
		case "aPhone":		
			Supplier = "Android";
			generateControlList();
			mainBoard.innerHTML = "";
			equipmentSizeField.value = "480*800";
			showScaling();
			setAmplifyTime(1);
			setEquipmentSize("480*800",amplifyTime);
			resetPropertyPanel();
			break;
	}
}

//added by shaohuan
//������ʾ������
showScaling = function()
{
	if (deviceType=="iPad" || deviceType=="aPad")
	{
	    document.getElementById('amplifyTimeField').style.display = "";
	    document.getElementById('amplify').style.display = "";
	    document.getElementById('reduce').style.display = "";
	}else{
	    document.getElementById('amplifyTimeField').style.display = "none";
	    document.getElementById('amplify').style.display = "none";
	    document.getElementById('reduce').style.display = "none";
	}

}

setAmplifyTime = function(time)
{
	amplifyTimeField.innerText = amplifyTime = time;
}

setEquipmentSize = function(size,time,direction)
{
	var _size = size.split("*");

	var width = eval(_size[0]);
	var height = eval(_size[1])
	
	mainBoard.style.pixelWidth = width * time;
	mainBoard.style.pixelHeight = height * time;
	
	setChildrenOriginAndSize(mainBoard,time);
}

setChildrenOriginAndSize = function( node , time)
{
	var childNodes = node.childNodes;
	for(var i =0 ; i< childNodes.length ; i++)
	{
		if(childNodes[i].className!="control")
			continue;
		else
		{
			setNodeOriginAndSize(childNodes[i],time);
		}
		
		if(childNodes[i].childNodes.length>0) 
		{
			setChildrenOriginAndSize(childNodes[i] , time);
		}
	}
}

setNodeOriginAndSize = function(node,time)
{
	node.style.pixelLeft = node.property.x * time;
	node.style.pixelTop = node.property.y * time;
	node.style.pixelWidth = node.property.width * time;
	node.style.pixelHeight = node.property.height * time;
	node.style.fontSize = 16 * time;
}


amplify = function(isEnlarge)
{
	if(isEnlarge)
	{
		if(amplifyTime < 1)
		  amplifyTime += 0.5;
	}
	else
	{
		if(amplifyTime > 0.5)
		   amplifyTime -=0.5;
	}
	amplifyTimeField.innerText = amplifyTime;
	setEquipmentSize(equipmentSizeField.value,amplifyTime);
}

onSpliterClicked = function(sender,direction)
{
	var content =null;
	if(direction =="left")
		content = util.getSiblingofNode(sender,"previous");
	else
		content = util.getSiblingofNode(sender,"next");

	 util.changeNodeVisibleStatus(content);
}

showFirstHideOthers = function(first,selected,normal)
{
	if(first==null) return;
	
	//��������ѡ�
	for (var i=0; i<tabSet.length; i++)
	{
		var tabName = tabSet[i];
		if (tabName != first)
		{
			document.getElementById(tabName+"Content").style.display='none';
			document.getElementById(tabName+"Button").style.backgroundColor = normal;
		}
	}
	
	//��ʾ��ǰѡ�
	document.getElementById(first+"Content").style.display='block';
	document.getElementById(first+"Button").style.backgroundColor = selected;
	
	if (first == "layoutCode")
	{
		var btnName = document.getElementById("layoutCodeButton").innerText.toString().trim();
		if (btnName == "���벼��")
		{
//			document.getElementById("layoutCodeArea").innerText = "";	
			document.getElementById("layoutCodeButton").innerHTML = "&nbsp; ȷ������ &nbsp; ";
		}
		else
		{
			//���ɲ����ļ��������л�������ѡ�
		
			
			
			switch(detectBrowser()){
			case "MSIE":
				layoutContent = document.getElementById("layoutCodeArea").innerText.toString();
				break;
			case "Chrome":
				layoutContent = document.getElementById("layoutCodeArea").value.toString();
				break;
			case "Safari":
				layoutContent = document.getElementById("layoutCodeArea").value.toString();
				break;
			}
			
			
			
			
			importLayout();
			
			document.getElementById("layoutCodeButton").innerHTML = "&nbsp; ���벼�� &nbsp; ";
			//�л������ѡ�
			showFirstHideOthers('mainDesign','','lightGray');
			
		}

		
	}
	
}

addAppleControl = function(controlName,x,y)
{ 
	var str = "(" + x +"," + y + ").obj";
	var controlString = Supplier+controlName+str;
	var node = eval("new " + controlString);
	if(controlName=="EFButton" || controlName=="EFLabel" || controlName=="EFTextField")
		setNodeEditable(node);
	

	
	

	setNodeOriginAndSize(node,amplifyTime);
	

	
	//�����ӵ�λ�ó����˻�����Χ����Ҫ����Ӧ�Ĵ���
	var rflag = false;
	var bflag = false;
	var curXPos = node.style.pixelWidth + node.style.pixelLeft;
	var curYPos = node.style.pixelHeight + node.style.pixelTop;
	if (curXPos > mainBoard.style.pixelWidth)
	{
		rflag = true;
		node.style.pixelLeft = mainBoard.style.pixelWidth-node.style.pixelWidth;
	}
	if (curYPos > mainBoard.style.pixelHeight)
	{
		bflag = true;
		node.style.pixelTop = mainBoard.style.pixelHeight-node.style.pixelHeight;
	}

	
	
	mainBoard.appendChild(node);

	isAdd = false;
	node.property.eId=controlName+controlIndex++;
	node.property.eParent="self"; //modify when drag to another container
	
	var gridCell = null;
	
	if (controlName == "EFGrid")
	{
		ifBelongGrid = false;
		gridCell = eval("new AppleEFGridCell().obj");
		setNodeOriginAndSize(gridCell,amplifyTime);
	}
	if (gridCell != null)
	{
		node.appendChild(gridCell);
		node.property.haveChild="true";
		gridCell.property.eId=node.property.eId+"Cell";
		gridCell.property.eParent=node.property.eId;
	}
	
	return [node,rflag,bflag];
}

//added by shaohuan
//���Android�ؼ�
addAndroidControl = function(controlName,x,y)
{ 
	var str = "(" + x +"," + y + ").obj";
	var controlString = Supplier+controlName+str;
	var node = eval("new " + controlString);
	
    setNodeOriginAndSize(node,amplifyTime);
    
  //�����ӵ�λ�ó����˻�����Χ����Ҫ����Ӧ�Ĵ���
	var rflag = false;
	var bflag = false;
	var curXPos = node.style.pixelWidth + node.style.pixelLeft;
	var curYPos = node.style.pixelHeight + node.style.pixelTop;
	if (curXPos > mainBoard.style.pixelWidth)
	{
		rflag = true;
		node.style.pixelLeft = mainBoard.style.pixelWidth-node.style.pixelWidth;
	}
	if (curYPos > mainBoard.style.pixelHeight)
	{
		bflag = true;
		node.style.pixelTop = mainBoard.style.pixelHeight-node.style.pixelHeight;
	}
	
    mainBoard.appendChild(node);

	isAdd = false;
	node.property.eId=controlName+controlIndex++;
	node.property.eParent="self"; //modify when drag to another container
	
	var gridCell = null;
	if (controlName == "EFGrid")
	{
		ifBelongGrid = false;
		gridCell = eval("new AndroidEFGridCell().obj");
		setNodeOriginAndSize(gridCell,amplifyTime);
		
	}
	
	if (gridCell != null)
	{
		node.appendChild(gridCell);
		node.property.haveChild="true";
		gridCell.property.eId=node.property.eId+"Cell";
		gridCell.property.eParent=node.property.eId;
	}
	
	return node;

}


setNodeEditable = function(node)
{
	node.ondblclick = function()
	{
		var text  = node.innerText;

		var input = document.createElement("input");
		input.type="text";
		input.value = text;
		input.style.pixelWidth = node.style.pixelWidth-5;
		if(node.childNodes.length>0)
			node.removeChild(node.childNodes[0]);
		node.appendChild(input);
		input.focus();
		editStatus = true;
		input.onblur = function()
		{
			if(node.childNodes.length>0)
				node.removeChild(node.childNodes[0]);
			node.innerText = input.value;
			node.property["eValue"] = input.value;
			propertySetter.propertyInputNodeList["eValue"].value = input.value;
			editStatus = false;
		};
		
		//��ӻس��¼����س���ʱ���༭���
		input.onkeydown = function()
		{
			var code;
			if(!e)  
		    {   
				var e = window.event; 
				code = e.keyCode||e.which||e.charCode;
				if(code == 13)   //����ǻس����Ļ����༭���
				{
					if(node.childNodes.length>0)
						node.removeChild(node.childNodes[0]);
					node.innerText = input.value;
					node.property["eValue"] = input.value;
					propertySetter.propertyInputNodeList["eValue"].value = input.value;
					editStatus = false;
				}   
		    }  
		};
	}
}
	
editFinished = function(node,input)
{
	if(node.childNodes.length>0)
		node.removeChild(node.childNodes[0]);
	node.innerText = input.value;
	node.property["eValue"] = input.value;
	propertySetter.propertyInputNodeList["eValue"].value = input.value;
	editStatus = false;
		
}

//added by shaohuan
//�жϻ������Ƿ�������
ifContainerExist = function()
{
	var nodes = mainBoard.childNodes;
	var gridCount = 0;
	for (var i=0; i<nodes.length; i++)
	{
		
		if (nodes[i].isContainer == true)
			return true;
		else if(nodes[i].property!=null && nodes[i].property.type=="EFGrid")
			gridCount++;
	}
	if (gridCount==1 && ifBelongGrid)
		return true;
	if (gridCount > 1)
		return true;
	return false;
}



controlDragStyle = function(sender)
{
	if (sender.property==null || sender.property.width==null || sender.property.height==null)
		return;
	
//	//added by shaohuan
//	//�����EFGridCell����ֻ�ܶ�����������϶��Ĳ���
//	var cellType = Supplier+"EFGridCell";
	if (sender.property.type == "EFGridCell")
	{
		if(window.event.offsetY>(sender.property.height * amplifyTime-3))
		{
			sender.style.cursor="s-resize";
			dragType = "s";
			return;
		}
	}
	
	
	if(window.event.offsetX>(sender.property.width * amplifyTime-3)&&
        window.event.offsetY>(sender.property.height * amplifyTime-3))
	{
        
		sender.style.cursor="se-resize";
        
		dragType = "se";
    
	}
	else if(window.event.offsetX>(sender.property.width * amplifyTime-3))
    
	{
        
		sender.style.cursor="e-resize";
        
		dragType = "e";
    
	}
	else if(window.event.offsetY>(sender.property.height * amplifyTime-3))
    
	{
        
		sender.style.cursor="s-resize";
        
		dragType = "s";
    
	}
	else
	{
        
		sender.style.cursor="crosshair";
        
		dragType = "ch";
    
	}

}

controlDragSize = function()
{
    
	var currentX = window.event.clientX;
	var currentY = window.event.clientY;
	
	//added by shaohuan 
	//Ԥ�������¼���׽���������ֵ�currentDragObject��Ϊ�յ����
	if (currentDragObject==null || currentDragObject.style==null || currentDragObject.property==null) 
		return;
    
	switch (dragType)
	{
			
		case "se": 
			//added by shaohuan
			//�϶���С�Ĺ����п����䲻�ܳ������ؼ���С
			var curWidth = currentDragObject.style.pixelWidth+(currentX - orgX);
			var curXPos = curWidth + currentDragObject.style.pixelLeft;
			var parentWidth = currentDragObject.parentNode.style.pixelWidth;
			
			var curHeight = currentDragObject.style.pixelHeight+(currentY - orgY);
			var curYPos = curHeight + currentDragObject.style.pixelTop;
			var parentHeight = currentDragObject.parentNode.style.pixelHeight;
			
			
			if (curXPos <= parentWidth)
			{
				currentDragObject.style.pixelWidth = currentDragObject.style.pixelWidth+(currentX - orgX);
			}
			else
			{
				currentDragObject.style.pixelWidth = parentWidth-currentDragObject.style.pixelLeft;
			}
			if (curYPos <= parentHeight)
			{
				currentDragObject.style.pixelHeight = currentDragObject.style.pixelHeight+(currentY - orgY);
			}
			else
			{
				currentDragObject.style.pixelHeight = parentHeight-currentDragObject.style.pixelTop;
			}
	        if(currentDragObject!=null&&typeof(currentDragObject.property.width)!="undefined"&&typeof(currentDragObject.property.height)!="undefined") 
			{
	        	
	            if (eval(currentDragObject.style.pixelWidth) <= 0)
	            {
	            	currentDragObject.style.pixelWidth = 0;
	            	currentDragObject.property.width = 0;
	            }
	            	
	            
	            if (eval(currentDragObject.style.pixelHeight) <= 0)
	            {
	            	currentDragObject.style.pixelHeight = 0;
	            	currentDragObject.property.height = 0;
	            }
	            
				currentDragObject.property.width = currentDragObject.style.pixelWidth/amplifyTime;
		                
				currentDragObject.property.height = currentDragObject.style.pixelHeight/amplifyTime;
	
				propertySetter.setPropertyToField("width",currentDragObject);
		                
				propertySetter.setPropertyToNode("width",currentDragObject);
		                
				propertySetter.setPropertyToField("height",currentDragObject);
		                
				propertySetter.setPropertyToNode("height",currentDragObject);
				
			    var cell = getDragCellInGrid();
			    if (cell != null)
			    {
	        		cell.style.pixelWidth = currentDragObject.style.pixelWidth;
	        		cell.property.width = currentDragObject.property.width;
	    			propertySetter.setPropertyToField("width",cell);
	    			propertySetter.setPropertyToNode("width",cell);
			    }
	            
				
	
			}
                
				
		break;

			
		case "e": 
			var curWidth = currentDragObject.style.pixelWidth+(currentX - orgX);
			var curXPos = curWidth + currentDragObject.style.pixelLeft;
			var parentWidth = currentDragObject.parentNode.style.pixelWidth;
			if (curXPos <= parentWidth)
			{
				currentDragObject.style.pixelWidth = currentDragObject.style.pixelWidth+(currentX - orgX);
			}
			else
			{
				currentDragObject.style.pixelWidth = parentWidth-currentDragObject.style.pixelLeft;
			}
		   if(currentDragObject!=null&&typeof(currentDragObject.property.width)!="undefined") 
		  {
			currentDragObject.property.width = currentDragObject.style.pixelWidth/amplifyTime;
			
            if (eval(currentDragObject.style.pixelWidth) <= 0)
            {
            	currentDragObject.style.pixelWidth = 0;
            	currentDragObject.property.width = 0;
            }
            	
			
            
			propertySetter.setPropertyToField("width",currentDragObject);
		            
			propertySetter.setPropertyToNode("width",currentDragObject);
			
		    var cell = getDragCellInGrid();
		    if (cell != null)
		    {
        		cell.style.pixelWidth = currentDragObject.style.pixelWidth-2;
        		cell.property.width = currentDragObject.property.width-2;
    			propertySetter.setPropertyToField("width",cell);
    			propertySetter.setPropertyToNode("width",cell);
		    }
            

		}
				
		break;

			
		case "s": 
			var curHeight = currentDragObject.style.pixelHeight+(currentY - orgY);
			var curYPos = curHeight + currentDragObject.style.pixelTop;
			var parentHeight = currentDragObject.parentNode.style.pixelHeight;
			
			
			if (curYPos <= parentHeight)
			{
				currentDragObject.style.pixelHeight = currentDragObject.style.pixelHeight+(currentY - orgY);
			}
			else
			{
				currentDragObject.style.pixelHeight = parentHeight-currentDragObject.style.pixelTop;
			}

			 if(currentDragObject!=null&&typeof(currentDragObject.property.height)!="undefined") 
			{
				currentDragObject.property.height = currentDragObject.style.pixelHeight/amplifyTime;
				
	            if (eval(currentDragObject.style.pixelHeight) <= 0)
	            {
	            	currentDragObject.style.pixelHeight = 0;
	            	currentDragObject.property.height = 0;
	            }
	            	
	            
				propertySetter.setPropertyToField("height",currentDragObject);
		                
				propertySetter.setPropertyToNode("height",currentDragObject);
	
			}
				
			break;
			default :
	}
	

}


//added by shaohuan
//�õ�EFGrid�����EFGridCell
getCellInGrid = function(node)
{
	if (node==null || node.property==null || node.property.type==null)
		return null;
	if (node.property.type == "EFGrid")
	{
		//��ȡEFGridCell
		var nodes = node.childNodes;
		for (var i=0; i<nodes.length; i++)
		{
			var c = nodes[i];
			if (c.property!=null && c.property.type!=null && c.property.type=="EFGridCell")
				return c;
		}
	}
	
	return null;

}

//added by shaohuan
//���϶�EFGrid�Ĺ�����ֻ�ı�Grid����Ŀ��
getDragCellInGrid = function()
{
	if (currentDragObject==null || currentDragObject.property==null)
		return null;
	var type = currentDragObject.property.type;
	if (type == "EFGrid")
	{
		//��ȡEFGridCell
		var nodes = currentDragObject.childNodes;
		for (var i=0; i<nodes.length; i++)
		{
			var c = nodes[i];
			if (c.property!=null && c.property.type!=null && c.property.type=="EFGridCell")
				return c;
		}
		        		
	}
	return null;	
}


//�õ�OBJ����Ļ�еľ���λ��
function findPos(obj) {
	var curleft = curtop = 0;
	while(obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			obj = obj.offsetParent
	}
	return [curleft,curtop];
}


panelOnMouseDown = function(e)
{
	 //IE�²�����event��������Ҫ���¸�ֵ
    if (e == null) 
        e = window.event; 
    
    // IE����srcElement���������������target
    var target = e.target != null ? e.target : e.srcElement;
    
    //IE�£������������� 1
    //������������������0
    if ((e.button == 1 && window.event != null ||   e.button == 0) && (target.className=='controlSurface'))
    {    	
    	util.$('dragger').title = target.title;
    	util.$('dragger').style.backgroundImage =  "url(img/"+target.title+"_choose.png)";
    	
    	util.$('dragger').style.display = "";
    	util.$('dragger').style.left = e.clientX + 'px';
    	util.$('dragger').style.top = e.clientY + 'px';
    	
        
        _startX = event.clientX-util.$('dragger').offsetLeft;  
        _startY = event.clientY-util.$('dragger').offsetTop; 
        
    	target = util.$('dragger');
    	
        //���϶������DIV�������ϲ�
        _oldZIndex = target.style.zIndex;
        target.style.zIndex = 10000;
        
        //��ק����
        _dragElement = target;

        //������MOVE��UP�¼�
        document.onmousemove = OnMouseMove;
        document.onmouseup = OnMouseUp;
        
        // �൱������ѡ��
        document.body.focus();

        // ��ֹIE��ѡ������
        document.onselectstart = function () { return false; };
        // ��IE��ʹ�䲻���϶�ͼƬ
        target.ondragstart = function() { return false; };
        
        //��ֹ����IE������µ�����ѡ��
        return false;
    }

}


function OnMouseMove(e)
{
    if (e == null) 
        var e = window.event; 
    _dragElement.style.left = ( e.clientX - _startX) + 'px';
    _dragElement.style.top = ( e.clientY - _startY) + 'px';

}


function OnMouseUp(e)
{
    if (_dragElement != null)
    {
        _dragElement.style.zIndex = _oldZIndex;
        
        _dragElement.style.display = "none";
        document.onmousemove = null;
        document.onselectstart = null;
        _dragElement.ondragstart = null;

  	  //��ʱ֪��dragger��������е�λ��
  	  //��Ҫ��ȥboard��������е�λ�ã���������board�е�λ�� 
  	  var posIE = findPos(mainBoard);
  	  var posXInBoard = e.clientX - posIE[0];
  	  var posYInBoard = e.clientY - posIE[1];
  	  
  
      
      var posRight = posIE[0]+mainBoard.style.pixelWidth;
      var posBottom = posIE[1]+mainBoard.style.pixelHeight;
      
//      alert(_dragElement.style.pixelLeft + "  " + _dragElement.style.pixelTop +"\n" + _dragElement.style.pixelWidth + " " +_dragElement.style.pixelHeight);
      if (posXInBoard>mainBoard.style.pixelWidth || posYInBoard>mainBoard.style.pixelHeight)
    	  return;

	  if (posXInBoard<0 || posYInBoard<0)
  		  return;
	  
	  
	  //Ѱ��Ŀ������
      targetContainer = mainBoard;   //Ŀ�������ĳ�ʼ��
		
      //����ӵ�������ȥ
      var result = addControl(posXInBoard/amplifyTime,posYInBoard/amplifyTime);
      var node = result[0];
//      alert(node.style.pixelLeft + "  " + node.style.pixelTop +"\n" + node.style.pixelWidth + " " +node.style.pixelHeight);
      
      currentDragObject = node;
      getTargetContainer(mainBoard);
//      alert("�� " + node.style.pixelLeft + "  " + node.style.pixelTop +"\n" + node.style.pixelWidth + " " + node.style.pixelHeight);
      
//      alert("�ҵ�Ŀ������");
		
 	 //����ҵ���Ŀ������������Ҫ����ǰ��ק������ӵ�Ŀ��������
 	  if (targetContainer != mainBoard) 
 	 {
 		
	    node.style.display = "none";
 		  
  	     //Ȼ����㵱ǰ��ק������Ŀ�������е����λ��	
        // ��ʱ���ܳ���Ҫ��ӵĿؼ�������λ����ADDCONTROL��ʱ������˶��ε����������Ҫ�ж�һ��
	    var pixelPosX = posXInBoard - eval(getPixelLeftInBoard(targetContainer));
	    var pixelPosY =  posYInBoard - eval(getPixelTopInBoard(targetContainer)); 
	    if (result[1] == true)
	    {
	    	node.style.pixelLeft = targetContainer.style.pixelWidth - node.style.pixelWidth;
	    	pixelPosX = eval(getPixelLeftInBoard(node)) - eval(getPixelLeftInBoard(targetContainer));
	    }
	    if (result[2] == true)
	    {
	    	node.style.pixelRight = targetContainer.style.pixelHeight - node.style.pixelHeight;
	    	pixelPosY =   eval(getPixelTopInBoard(node)) - eval(getPixelTopInBoard(targetContainer)); 
	    }
	 
		
	    node.property.x = pixelPosX/amplifyTime;
	    node.property.y = pixelPosY/amplifyTime;
	    setNodeOriginAndSize(node,amplifyTime);
	    
        
		//�ӻ������޳�
        mainBoard.removeChild(node);
			
        node.style.display = "";
    	targetContainer.appendChild(node);
//    	alert(node.style.pixelLeft + "  " + node.style.pixelTop +"\n" + node.style.pixelWidth + " " +node.style.pixelHeight);
        //��ӵ�Ŀ��������ȥ
    
        
        if(targetContainer.className=="control")
        {
            node.property.eParent=targetContainer.property.eId;
            targetContainer.property.haveChild="true";
        }  
        
//        alert(node.style.pixelLeft + "  " + node.style.pixelTop +"\n" + node.style.pixelWidth + " " +node.style.pixelHeight);
        
 	 }
  	  
      //�϶����� 
      _dragElement = null;
	  //��ק��ϣ�����ǰ��ק������Ϊ��
	  currentDragObject = null;
	  targetContainer = null;
        
    }
}

function addControl(x,y)
{
        //���ɿؼ�
	    var controlName = util.$('dragger').title;
		if (Supplier == "Apple")
		{
			
			return addAppleControl(controlName,x,y);
		}
		else
		{
			return addAndroidControl(controlName,x,y);
		}
}



boardOnMouseDown = function(e)
{
	 if (e == null) 
	       e = window.event; 
	    
	 // IE uses srcElement, others use target
	 var target = e.target != null ? e.target : e.srcElement;
	
	if(window.event.srcElement!=null)
	{
		//added by shaohuan
		//����ı���ؼ����ڱ༭״̬��������Ӧ
		if(editStatus==true)
			return;
		
		//�̶���ǰ�����״
		sender = window.event.srcElement;
		
		//�����϶�����
		if (sender.className=="canvas")
			return;
		if (sender.tagName == "IMG"){
			sender = sender.parentNode;
		}
		
		controlDragStyle(sender);
		freezeCursor = true;
		
//		var cellType = Supplier+"EFGridCell";
        if (sender.property!=null && sender.property.type!=null && sender.property.type=="EFGridCell")
   	    {
            currentSelectedControl = window.event.srcElement;
        	//��������Ԫ�أ������Ҳ�����
			propertySetter.setPropertyFromControlNode(window.event.srcElement);
   		   if (dragType != "s")
   			 return;
   	    }
        
		
		if(sender.className=="control"||sender.className=="controlItem" )
		{
			//���������ǲ�ͬ�����ʱ��
			if (sender!=currentDragObject && sender.className=="control")
			{
				if (currentDragObject!=null)
				{
					if (currentDragObject.isContainer )
					{
						currentDragObject.style.borderColor = "#1880c9";
						currentDragObject.style.borderWidth ="1px";
					}
					else{
						currentDragObject.style.borderColor = "#ffffff";
						currentDragObject.style.borderWidth ="1px";
					}
					currentDragObject.style.zIndex = 1;
				}
				currentDragObject = sender;	
				currentDragObject.style.zIndex = 2;
				sender.style.borderColor = "#1880c9";
				sender.style.borderWidth = "2px";
			}
			
		}
		
		
		dragBegin = true;
		orgX = window.event.clientX;
		orgY = window.event.clientY;

		if(sender.className=="control")
		{
			currentSelectedControl = sender;

            if(typeof(currentSelectedControl.property.onClick) != "undefined")
			{
             document.getElementById("controlType").value=currentSelectedControl.property.onClick; //switch tab event value
			}
			else
			{
             document.getElementById("controlType").value="";
			}
			

            //��������Ԫ�أ������Ҳ�����
			propertySetter.setPropertyFromControlNode(sender);
		}
	}
}

bodyOnMouseOver = function()
{
	if (this.className=="control" && this!=currentDragObject)
	{
	    this.style.borderColor = "#1880c9";
	    this.style.borderWidth ="1px";
	}
}

bodyOnMouseOut = function()
{
	
	if (this.className=="control" && this.isContainer!=true && this!=currentDragObject)
	{
		this.style.borderWidth = "1px";
		if (this.property.type != "EFGrid")
		{
	      this.style.borderColor = "#ffffff";
	     
		}
	}else if(this.className=="control" && this.isContainer==true && this!=currentDragObject){
		this.style.borderColor = "#1880c9";
		this.style.borderWidth = "1px";
	}
}

controlTreeOnMouseMove = function()
{
	
   if (window.event.srcElement.tagName == "IMG")
   {
	   
//    	var control = window.event.srcElement;
//		control.src = "img/zoomOut.png";
   }
}
bodyOnMouseMove = function()
{		
	hint.innerHTML = (window.event.offsetX)+' '+ (window.event.offsetY);
    
	//����ı���ؼ����ڱ༭״̬������Ҫ���������Ӧ�¼�
	if (editStatus == true)
		return;
    if(this.className=="control"){
    	//added by shaohuan
    	//�������Ѿ����£��������״�Ͳ���Ҫ�ı䣬��û�а��£�����Ҫ��������λ�����ı���״
    	if (!freezeCursor)
    	{
    		controlDragStyle(this);
    	}
    }
    
    
	if(dragBegin && currentDragObject!=null)
	{
        var currentX = window.event.clientX;
        var currentY = window.event.clientY;
        
        
        //�����ʮ���Σ������϶�
        if(dragType=="ch"){        	          
        	if (currentDragObject.tagName == "IMG")
        		currentDragObject = currentDragObject.parentNode;
        	
            currentDragObject.style.pixelLeft += currentX - orgX;
            currentDragObject.style.pixelTop += currentY - orgY;
            
            var parentNode = currentDragObject.parentNode;
            
            if (parentNode == mainBoard)
            {
                if(currentDragObject.style.pixelLeft < 0) currentDragObject.style.pixelLeft = 0;
                if(currentDragObject.style.pixelTop < 0) currentDragObject.style.pixelTop = 0;
            }
            

            if(currentDragObject.className == "control")
            {
                currentDragObject.property.x =  currentDragObject.style.pixelLeft / amplifyTime ;
                currentDragObject.property.y =  currentDragObject.style.pixelTop / amplifyTime ;
                
                keepControlInBoard(currentDragObject);
                
      
                propertySetter.setPropertyToField("x",currentDragObject);
                propertySetter.setPropertyToField("y",currentDragObject);
                               
            }
        }
        else
        {
        	//�൱���϶�����
            controlDragSize();
        }
        orgX = currentX;
        orgY = currentY;
	}
}


keepControlInBoard =  function(control)
{
	var node = control.parentNode;
	
	//added by shaohuan
	//2012-02-10
	
	//���������ٽ�ֵ��������������Χʱ�滻ʹ��
	var leftOff = mainBoard.clientWidth - control.clientWidth;
	var TopOff =  mainBoard.clientHeight - control.clientHeight;
	
	//�õ������ľ���
	var parentNode = control.parentNode;
	if (parentNode == mainBoard)
	{
		if(control.style.pixelTop > TopOff) control.style.pixelTop = TopOff;
		if(control.style.pixelLeft > leftOff) control.style.pixelLeft = leftOff;
		return;
	}
	
	var disPIB_X = eval(getPixelLeftInBoard(parentNode));
	                        
	var disPIB_Y = eval(getPixelTopInBoard(parentNode));
	
	if (control.style.pixelLeft > 0)
	{
		var temp = control.style.pixelLeft+disPIB_X;
		if (temp > leftOff)
		{
			control.style.pixelLeft = leftOff-disPIB_X;
		}
	}

	if (control.style.pixelTop > 0)
	{
		var temp = control.style.pixelTop+disPIB_Y;
		if (temp > TopOff)
		{
			control.style.pixelTop = TopOff-disPIB_Y;
		}
	}
	
	if (control.style.pixelLeft < 0)
	{
		if (Math.abs(control.style.pixelLeft) > disPIB_X)
		{
			control.style.pixelLeft = -disPIB_X;
		}
	}
	
	if (control.style.pixelTop < 0)
	{
		if (Math.abs(control.style.pixelTop) > disPIB_Y)
		{
			control.style.pixelTop = -disPIB_Y;
		}
	}

}



//added by shaohuan
//�ݹ�õ�Ŀ������
getTargetContainer = function(control)
{
	//�����е�Ԫ�������м��ࣺ1.���� 2.EFGrid 3.������ 
	//EFGrid��һ���ӽ��壬����������������������Ψһ�󶨵�EFGridCell�������������������Ͽؼ��� ����
    //EFGrid�������������Ƿ�����
	//���´����д�������3�������
	
	//���ÿһ��node��������Ҫ���ж��������ǲ����������������Ļ������ǲ��ǰ����˵�ǰ����ק������������ˣ�����Ҫ�滻Ŀ������
	var nodes = control.childNodes;	
	if (control == currentDragObject)
		return;
	 if (control.isContainer==true)   //��Ӧ��1�ࣺ����
	 {
		if (ifContain(control))  //�ж�control�Ƿ������ǰ��ק����������������滻Ŀ������targetContainer
		{
			targetContainer = control;
		}
		
		if (nodes.length == 0)
			return;
		//����Ҫ����������ѭ���ݹ����control���ӽڵ�
		for (var i=0; i<nodes.length; i++)
		{
			getTargetContainer(nodes[i]);
		}
     }else if(control == mainBoard){ //�������Ϊ��������ֱ�ӱ���
		if (nodes.length == 0)
			return;
		 for (var i=0; i<nodes.length; i++)
	     {
			getTargetContainer(nodes[i]);
		 }
     }else if(control.isContainer!=true && control.property!=null && control.property.type=="EFGrid"){ //��Ӧ�ڵ�2�ࣺEFGrid
	    	//����ǰcontrol������������������EFGrid��ʱ��������Ҳ������Ŀ������
			var cell = getCellInGrid(control);
			if (cell!= null && ifContain(cell)) 
			{
				targetContainer = cell;
			}
			
			//��Ϊcell������������ҲҪ����cell
			var nodesInCell = cell.childNodes;
			for (var c=0; c<nodesInCell.length; c++)
			{
				getTargetContainer(nodesInCell[c]);
			}
	     }	
}


bodyOnMouseUp = function(e)
{
		dragBegin = false;
//		added by shaohuan
//		���������֮���ͷŶ����Ķ��ᣬ��ʱ�����ͷŶ����Ķ���
		freezeCursor = false;

		//�Ͽؼ���һ���ȳ���������������Ĺ��̣�׼ȷ��˵��һ���ȳ�����Ĺ��̣���Ϊ��ʼ����ʱ����Ҳ����һ������Board��
		if (dragType == "ch" && mainBoard!=null)
		{
			if (currentDragObject!=null)
			{	
	            if (currentDragObject.property==null || currentDragObject.style==null)
	            	return;
	            	
	            
	            if (currentDragObject.className!="canvas" && currentDragObject.className!="control")
	            	return;
	        
//	            var cellType = Supplier+"EFGridCell";
	            if (currentDragObject.property.type == "EFGridCell")
	            	return;
	            
		        //�ƶ����ж��Ƿ��Ѿ��Ƴ�ԭ�е�����
	            var parentNode = currentDragObject.parentNode;
	            
	            if (parentNode == null)
	            	return;
	          
	            var leftOff = currentDragObject.parentNode.clientWidth - currentDragObject.clientWidth;
	        	var TopOff = currentDragObject.parentNode.clientHeight - currentDragObject.clientHeight;
	        	
	        	//����������ؼ�����mainBoard������û�г��������ؼ�����ֱ�ӷ���
	        	//������Ҫ����һ�£�������û�г����ؼ������������Խ��븸�ؼ������һ�������ؼ�
		        
		        //Ѱ��Ŀ������
			    targetContainer = mainBoard;   //Ŀ�������ĳ�ʼ��
			    getTargetContainer(mainBoard);

				
				
	        	//��Ŀ�������͸�������ͬ����ֱ�ӷ���
	        	if (targetContainer == parentNode) //˵��û����ק��ԭ�еĸ��ؼ���ֱ�ӷ��أ�ɶҲ����
	        	{
	        		return;
	        	}
	        	
	        	
	        	//������ͬ�������ԭ�����н��ؼ��Ƴ���Ȼ������ת���������ӵ�Ŀ��������ȥ

				
				//����ԭ�е��������뵽���µ������У����轫�ؼ������ص���������ľ���λ���û�Ϊ�����е�λ��
		       
	            //Ȼ����㵱ǰ��ק������Ŀ�������е����λ��	
	        	currentDragObject.style.pixelLeft = eval(getPixelLeftInBoard(currentDragObject))-eval(getPixelLeftInBoard(targetContainer));        	
			    currentDragObject.style.pixelTop =  eval(getPixelTopInBoard(currentDragObject))-eval(getPixelTopInBoard(targetContainer));
		        
			    //������λ�õõ�����λ��
	            currentDragObject.property.x =  currentDragObject.style.pixelLeft / amplifyTime ;
	            currentDragObject.property.y =  currentDragObject.style.pixelTop / amplifyTime ;
	            
	            
				//��Ҫ��ԭ���������Ƴ�
				if (parentNode != null)
				{
					parentNode.removeChild(currentDragObject);
				}
				
	            //��ӵ�Ŀ��������ȥ
	            targetContainer.appendChild(currentDragObject);
	            if(targetContainer.className=="control")
	            {
	              currentDragObject.property.eParent=targetContainer.property.eId;
	              targetContainer.property.haveChild="true";
	            }
	            else if(targetContainer==mainBoard)
	            {
	            	 currentDragObject.property.eParent="self";
	                 //targetContainer.property.haveChild="true";
	            }            
	            
	            propertySetter.setPropertyToField("x",currentDragObject);
	            propertySetter.setPropertyToField("y",currentDragObject);
			}
			
		
		   //��ק��ϣ�����ǰ��ק������Ϊ��
		   currentDragObject = null;
		   targetContainer = null;
		   orgX = -1;
		   orgY = -1;
		}
}


//added by shaohuan
//�õ��ؼ��ڻ����о����λ��
function getPixelLeftInBoard(node)
{
	if (node==null || node.style==null)
		return 0;
	//���������Ĳ����ڵ��ǻ��������ǻ����������������Ϊֹ�϶�Ϊ0��
	if (node == mainBoard)
		return 0;
	var posLeft = node.style.pixelLeft;
	
	var parent = node.parentNode;
	while (parent != mainBoard)
	{
		posLeft = posLeft+parent.style.pixelLeft;
		parent = parent.parentNode;
	}

	return posLeft;

}

//added by shaohuan
//�õ��ؼ��ڻ����о��ϱ�λ��
function getPixelTopInBoard(node)
{
	if (node==null || node.style==null)
		return 0;
	if (node == mainBoard)
		return 0;
	var posTop = node.style.pixelTop;
	var parent = node.parentNode;
	while (parent != mainBoard)
	{
		posTop = posTop+parent.style.pixelTop;
		parent = parent.parentNode;
	}
	
	return posTop;
}




//added by shaohuan
//�˴���Ϊ���ã�������ؼ�A��B�����궼Ϊ��������ʱ�����
function rectOverlap(A, B)  
{  

	if (A==null || B==null)
		return true;
	if (A.property==null || B.property==null)
		return true;
	if (A.property.x==null || A.property.y==null || B.property.x==null || B.property.y==null)
		return true;
    var xOverlap =  valueInRange(A.property.x, B.property.x, B.property.x + eval(B.property.width)) ||  
                    valueInRange(B.property.x, A.property.x, A.property.x + eval(A.property.width));  
    var yOverlap =  valueInRange(A.property.y, B.property.y, B.property.y + eval(B.property.height)) ||  
                    valueInRange(B.property.y, A.property.y, A.property.y + eval(A.property.height));  
    return xOverlap && yOverlap;  
}  

function valueInRange(value, min, max)  
{  
	return (value <= max) && (value >= min);  
}  




//added by shaohuan 
//�ж������Ƿ������ǰ��ק�Ķ���CurrentDragObject
ifContain = function(container)
{
    if (container == mainBoard)
    {
    	return true;
    }
    
	if (currentDragObject==null || currentDragObject.property==null)
		return false;
	if (currentDragObject.property.x==null || currentDragObject.property.y==null)
		return false;
    
	
	
	var x1 = eval(getPixelLeftInBoard(container))/ amplifyTime;
	var y1 = eval(getPixelTopInBoard(container))/ amplifyTime;
	var x1w = eval(container.property.width);
	var y1h = eval(container.property.height);
    
	var x2 = eval(getPixelLeftInBoard(currentDragObject))/ amplifyTime;
	var y2 = eval(getPixelTopInBoard(currentDragObject))/ amplifyTime;
	var x2w = eval(currentDragObject.property.width);
	var y2h = eval(currentDragObject.property.height);
	
	var x1right = x1+x1w;
	var x2right = x2+x2w;
	var y1bottom = y1+y1h;
	var y2bottom = y2+y2h;
	
	if (x1<=x2 && y1<=y2 && x1right>=x2right && y1bottom>=y2bottom)
		return true;
	return false;

}

//added by shaohuan
//�ؼ������Ըı�󰴻س���ʱ
propertyEnterChanged = function(sender)
{
	var code;
	if(!e)  
    {   
		var e = window.event; 
		code = e.keyCode||e.which||e.charCode;
		if(code == 13)
		{
			propertyChanged(sender);
		}   
    }  

}
propertyChanged= function(sender)
{
	if(currentSelectedControl!=null)	
	{
		sender = window.event.srcElement;
		switch (sender.id)
		{
			case "x":
				//added by shaohuan�����õ�����Ŀ��ܲ��Ϸ�
				var newValue = eval(sender.value)*amplifyTime;
				var parent = currentSelectedControl.parentNode;
				var leftoff = eval(parent.clientWidth)-eval(currentSelectedControl.clientWidth);
				if (newValue > leftoff)
				{
					sender.value = currentSelectedControl.property.x;
				}
				else
				{
					propertySetter.setPropertyToNode("x",currentSelectedControl);
					currentSelectedControl.style.pixelLeft = currentSelectedControl.property.x * amplifyTime;
				}

				break;

			case "y": 
				var newValue = eval(sender.value)*amplifyTime;
				var parent = currentSelectedControl.parentNode;
				var topoff = eval(parent.clientHeight)-eval(currentSelectedControl.clientHeight);
				if (newValue > topoff)
				{
					sender.value = currentSelectedControl.property.y;
				}
				else
				{
					propertySetter.setPropertyToNode("y",currentSelectedControl);
					currentSelectedControl.style.pixelTop = currentSelectedControl.property.y * amplifyTime;
				}

				break;

			case "width": 
				var newValue = eval(sender.value)*amplifyTime;
				var parent = currentSelectedControl.parentNode;
				var maxWidth = eval(parent.clientWidth);
				var leftoff = newValue+currentSelectedControl.style.pixelLeft;
				if (leftoff > maxWidth)
				{
					sender.value = currentSelectedControl.property.width;
				}
				else
				{
					propertySetter.setPropertyToNode("width",currentSelectedControl);
					currentSelectedControl.style.pixelWidth = currentSelectedControl.property.width * amplifyTime;
				}

				break;

			case "height": 
				var newValue = eval(sender.value)*amplifyTime;
				var parent = currentSelectedControl.parentNode;
				var maxHeight = eval(parent.clientHeight);
				var topoff = newValue+currentSelectedControl.style.pixelTop;
				if (topoff > maxHeight)
				{
					sender.value = currentSelectedControl.property.height;
				}
				else
				{
					propertySetter.setPropertyToNode("height",currentSelectedControl);
					currentSelectedControl.style.pixelHeight = currentSelectedControl.property.height * amplifyTime;
				}

				break;
				
			case "eValue":
				currentSelectedControl.innerText = sender.value;
				currentSelectedControl.property["eValue"] = sender.value;
				break;
			default :
				propertySetter.setPropertyToNode(sender.id,currentSelectedControl);
		}
		
	}
}

function del()
{
	var currKey=0,CapsLock=0,e=e||event;
	currKey=e.keyCode||e.which||e.charCode;
	if((currKey == 8 || currKey == 46) && currentSelectedControl!=null)
	{
		//modified by shaohuan
		if (currentSelectedControl.property.type=="EFGridCell")
			return;
		if(editStatus == true)          //����ı���Ŀؼ����ڱ༭״̬������Ҫ�����˸����DELETE��
			return;
		var parent = currentSelectedControl.parentNode;
		parent.removeChild(currentSelectedControl);
	}
}



function generateSingleJson (row)
{
	if(row.className!="control")
		return "";
	var rowText = new Array();
	

	rowText.push('{');

	for(var attr in row.property)
	{
		if(attr=="group") continue;
		rowText.push(attr +':' + '"'+ row.property[attr] +'",');
	}
	
	rowText.push('}');
    rowText.push(',');
	
	
	if(typeof(row.property.haveChild)!="undefined"&&row.property.haveChild=="true")
	{
	   var rowNodes=row.childNodes;
	   for(var i=0;i<rowNodes.length;i++)
	   {
		   rowText.push(generateSingleJson(rowNodes[i]));
	   }
	}
	rowText = rowText.join("")
	return rowText;
	
}

generateJsonString = function()
{
	var	nodes = mainBoard.childNodes;
	var blockText = new Array();
	blockText.push('{"block":{');
	blockText.push('"rows":[');

	for(var i=0;i<nodes.length;i++)
	{
		var row = nodes[i];
		if(row.className!="control") continue;
		var rowText = new Array();
		rowText.push(generateSingleJson(row));
		blockText.push(rowText);
		
	}

	blockText = blockText.join("");
	blockText=blockText.substr(0,blockText.length-1);
	
	blockText+=']}}';    
    return blockText;
}

setEvent2Control = function()
{

 currentSelectedControl.property.onClick=document.getElementById("controlType").value;//event value 2 control

}

generateCode = function()
{
	var xmlHttp;

	if(window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest();
	else 
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

	xmlHttp.onreadystatechange = function()
	{
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
			document.getElementById("mainCodeArea").innerText = xmlHttp.responseText;
		else
			document.getElementById("mainCodeArea").innerText = "get data error!!";
	}
	
	var jsonCode=generateJsonString();
	
	
	var postdata=encodeURI(encodeURI(jsonCode));
	var equipment=equipmentField.value;
//	xmlHttp.open("POST","http://168.2.238.46:8088/CodeGenerator/CodeGenerateServlet",true);
	xmlHttp.open("POST","http://10.25.10.6:8088/PlatDemo/CodeGenerateServlet",true);
	xmlHttp.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" ); 
	xmlHttp.send('code='+postdata+'&equipment='+equipment);
	document.getElementById("mainCodeArea").innerText = "getting data!" +"<br/>"; 
	
}
