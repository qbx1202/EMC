function propertySetter()
{
	this.propertyNode = document.getElementById("attributeContent");
	this.propertyInputNodeList = new Object();
	//this.propertyTrNodeList = new Object();

    propertyFieldGenerate(this.propertyInputNodeList,"eId");
	propertyFieldGenerate(this.propertyInputNodeList,"eParent");
	propertyFieldGenerate(this.propertyInputNodeList,"onClick");

	propertyFieldGenerate(this.propertyInputNodeList,"type");
	propertyFieldGenerate(this.propertyInputNodeList,"eName");
	propertyFieldGenerate(this.propertyInputNodeList,"eValue");
	propertyFieldGenerate(this.propertyInputNodeList,"eBindName");
	propertyFieldGenerate(this.propertyInputNodeList,"x");
	propertyFieldGenerate(this.propertyInputNodeList,"y");
	propertyFieldGenerate(this.propertyInputNodeList,"width");
	propertyFieldGenerate(this.propertyInputNodeList,"height");
	
	this.propertyTableNodeList = new Object();
	this.currentTableNode = null;
	
	this.currentControlType = null;
	this.currentControlNode = null;
	this.newPropertyName = "";
	this.newPropertyValue = "";
	this.firstTime = true;

	this.init = function() { }

	this.setPropertyFromControlNode = function(node)
	{
		//added by shaohuan
		if (node == null)
			return;
		
		//1.���������ڵ㣬��û���Ը��²�����ֱ��return
		//2.�������Լ������Ը��µ�����������жϣ�ֱ�������߾�����
		//3.���ڲ����Լ��������Ը��±�ʶ�ǲ���Ϊ�棬ֱ�Ӹ�ֵ������ˢ���б�
//		if((this.currentControlNode==node) && !selfUpdate)  //ֻ���Լ�����Ҫ�ж��Ƿ����Ը��²���
//		{
//			return;
//		}
//		else if (this.currentControlNode != node)
//		{
//			this.currentControlNode = node;
//		}
		
//		 if (this.currentControlNode != node)
//		{
//			this.currentControlNode = node;
//		}
		

//		if((this.currentControlType!=node.property.type)||selfUpdate)  //����û�б����������û�н�����������Ӧ�����ݴ洢���е�������Լ��Ը��µ����
		if((this.currentControlNode != node)|| selfUpdate) 
		{
		    if(this.currentControlNode != node)
			{
				this.currentControlNode = node;
			}
//		    
//			if((this.propertyTableNodeList[node.property.type]==null)||selfUpdate)
//			{
			this.currentTableNode = this.propertyTableNodeList[node.property.type] = document.createElement("table");
			this.currentTableNode.width="100%";
			for(var i=0;i<node.property.group.length;i++)
			{
				var row = this.currentTableNode.insertRow(this.currentTableNode.rows.length);
				row.className = "horizontalLine"
				var td = document.createElement("td");
				td.innerHTML = " - "+node.property.group[i];
				td.colSpan=2;
				row.appendChild(td);
				row.onclick = onRowClicked;
			
				var props =  node.property.group[node.property.group[i]];
				for(var j=0;j<props.length;j++)
				{
					row = this.currentTableNode.insertRow(this.currentTableNode.rows.length);
					
					if(this.propertyInputNodeList[props[j]] == null)
					{
						propertyFieldGenerate(this.propertyInputNodeList,props[j]);
					}
					
					row.insertCell(0).innerHTML =  props[j]+":" ;
					row.insertCell(1).appendChild(this.propertyInputNodeList[props[j]]);
					
					this.propertyInputNodeList[props[j]].value = node.property[props[j]];
	
				}
			}
			
			//added by shaohuan
			selfUpdate = false;
			newAttrName.value = "";
			newAttrValue.value = "";
//			}
//			else   //û�������Եļ��룬ֱ��ˢ��ֵ�Ϳ�����
//			{
//				var index = 0;
//				this.currentTableNode = this.propertyTableNodeList[node.property.type];
//
//				for(var i=0;i<node.property.group.length;i++)
//				{
//					var row = this.currentTableNode.rows[index++];
//                    
//			
//					var props =  node.property.group[node.property.group[i]];
//					for(var j=0;j<props.length;j++)
//					{
//						row = row = this.currentTableNode.rows[index++];;
//						row.cells[1].appendChild(this.propertyInputNodeList[props[j]]);
//						this.propertyInputNodeList[props[j]].value = node.property[props[j]];
//					}
//
//				}
//
//			}

			if(this.propertyNode.firstChild!=null) 
					{this.propertyNode.removeChild(this.propertyNode.firstChild);}
				this.propertyNode.appendChild(this.currentTableNode);

			this.currentControlType = node.property.type;
			
		}
//		else
//		{
//			for(var i=0;i<node.property.group.length;i++)
//			{
//				var props =  node.property.group[node.property.group[i]];
//				for(var j=0;j<props.length;j++)
//				{
//					this.propertyInputNodeList[props[j]].value = node.property[props[j]];
//				}
//			}
//		}
//		
		
	}

	this.clear = function()
	{
		this.classNameField.value = "";
		this.xField.value = "";
		this.yField.value = "";
		this.widthField.value = "";
		this.heightField.value = "";
		
		this.eNameField.value = "";
		this.eValueField.value = "";
		this.eBindNameField.value = "";
	}
	this.setPropertyToField = function(name,node)
	{
		this.propertyInputNodeList[name].value = node.property[name];
	}

	this.setPropertyToNode = function(name,node)
	{
		 node.property[name] = this.propertyInputNodeList[name].value;
	}
	
	this.addPropertyToNode = function(name,value)
	{
		if (this.currentControlNode == null)
		{
			alert("��ѡ��ؼ�!");
		}else if(this.ifPropertyExist(name)){
			alert("�����Ѿ�����!");
		}else if(name == ""){
				alert("����������Ϊ��!");
		}else{
			//ȷ���Զ����Group����׷��û�д�����
			this.currentControlNode.property[name] = value;
			
			var flag = false;

        	this.currentControlNode.property.group["Custom"].push(name);  //�����node��������ӵ�����Custom��ȥ���Է������
			
        	//�ж����Գ���������û��������Զ�Ӧ���ı������û�У�����Ҫ����һ��
			if(this.propertyInputNodeList[name] == null)
			{
				propertyFieldGenerate(this.propertyInputNodeList,name);
			}
			//����������һ���յ�TEXT�������ֵ��Ҫ����һ��
			this.propertyInputNodeList[name].value = value;               //������е�ֵ������ʾ�Ƕ���
			selfUpdate = true;                                            //��Ҫ���и��µı�ʶ
			
			//�����ұ����Table
			this.setPropertyFromControlNode(this.currentControlNode);     //ˢ���б�
		} 
	
	}
	

	//�ж������Ƿ��Ѿ����
	this.ifPropertyExist = function(name)
	{
		var node = this.currentControlNode.property;
		for(var c in node)
		{
			if (name==c)
				return true;
		}
		
		return false;

	}
	
	
//	this.ifPropertyExist = function(name)
//	{
//		for(var i=0;i<this.currentControlNode.property.group.length;i++)
//		{
//			var props =  this.currentControlNode.property.group[this.currentControlNode.property.group[i]];
//			for(var j=0;j<props.length;j++)
//			{
//				if (props[j] == name)
//					return true;
//			}
//
//		}
//		return false;
//	}

}


function onRowClicked()
{
	var node = window.event.srcElement;
	
	if(node.innerText.indexOf("-")>-1)
	{
		node.innerText = node.innerText.replace("-","+");
	}
	else
	{
		node.innerText = node.innerText.replace("+","-");
	}
	
	if(node.tagName=="TD") node = node.parentNode;
	var tempRow = util._nextSiblingOfNode(node);
	while(tempRow!=null && tempRow.className!= "horizontalLine")
	{
		util.changeNodeVisibleStatus(tempRow);
		tempRow = util._nextSiblingOfNode(tempRow);
	}
}


function propertyFieldGenerate(propertyInputNodeList,name)
{
	propertyInputNodeList[name] = document.createElement('input');
	propertyInputNodeList[name].type="text";
	propertyInputNodeList[name].id = name;
	propertyInputNodeList[name].className="flatInput";
	propertyInputNodeList[name].onblur = propertyChanged;
	propertyInputNodeList[name].onkeydown = propertyEnterChanged;
	
}