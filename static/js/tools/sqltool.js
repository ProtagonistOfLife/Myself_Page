//jdbc查询需要使用的参数进行上传
	var jdbcparam = {};
	//javaBean类需要的属性及对应地类型
	var javaField = null;
	//sql中的字段及对应的类型
	var sqlField = null;
	//用于指定是哪种数据库，执行什么方法，暂时未使用
	var dbexcute = null;
	//用于指定是使用哪种框架进行操作数据库，暂未使用
	var frameworkexcute = null;
	
	var driver = "com.mysql.jdbc.Driver";
	var java_sql_map = {"varchar"	:"java.lang.String",
						"timestamp"	:"java.util.Date",
						"bit"		:"java.lang.Byte",
						"int"		:"java.lang.Integer",
						"tinyint"	:"java.lang.Short",
						"bigint"	:"java.lang.Long",
						"text"		:"java.lang.String",
						"decimal"	:"java.math.BigDecimal"};

//首次执行
function excute(){
		var url = $("#jdbcurl").val();
		var user = $("#user").val();
		var password = $("#password").val();
		
		url = "jdbc:mysql://106.13.80.12:3306/freebase?userUnicode=true&characterEncoding=utf8";
		user = "pcw";
		password = "pcwpass";
		
		
		jdbcparam.url = url;
		jdbcparam.user = user;
		jdbcparam.password = password;
		jdbcparam.driver = driver;
		$.post("/pcw/comm/sql/gettables",jdbcparam,function(result){
			if(result.code == 200){
				var list = result.data;
				for(var index in list){
					var inner = $("<option></option>");
					inner.append(list[index]);
					inner.attr("value",list[index]);
					$("#tables").append(inner);
				}
				$("#excute").attr("onclick","tranToSqlFormate()");
			}
		},"json");
	}

//将sql字段转成java字段属性，_表示后面的单词首字母大写
function tranToJavaName(sqlname){
	var array = sqlname.split("_");
	sqlname = array[0];
	for(var i = 1;i < array.length;i++){
		sqlname += array[i].substr(0,1).toUpperCase()
				+ array[i].substr(1,array[i].length - 1);
	}
	return sqlname;
}

//解析table，选择要解析的table后从服务器获取到该表的所有字段
function parsetable(){
	var table = $("#tables").val();
	jdbcparam.table = table;
	$.post("/pcw/comm/sql/getcolumn",jdbcparam,function(result){
		if(result.code == 200){
			sqlField = result.data;
			savedata("sqlField",sqlField);
			tranToJavaFormate(sqlField);
			$("#usefield").append('<span>查询字段：</span>');
			$("#usefield").append('<span><a href="#" onclick="allAndNotall(this)">全选</a></span>');
			$("#conditional").append('<span>条件字段：</span>');
			$("#conditional").append('<span><a href="#" onclick="allAndNotall(this)">全选</a></span>');
			for(var index in sqlField){
				var childstr = '<span><input type="checkbox" name="field" class="checkbox" value="'
				+ sqlField[index].COLUMN_NAME + '" />' + sqlField[index].COLUMN_NAME +'</span>';
				var child1 = $(childstr);
				var child2 = $(childstr);
				$("#usefield").append(child1);
				$("#conditional").append(child2);
			}
			$("#choose").show();
		}
	},"json");
}

//转成java类属性的格式
function tranToJavaFormate(list){
	javaField = {};
	for(var index in list){
		var javatype = java_sql_map[list[index].DATA_TYPE];
		if(javaField[javatype] == null){
			javaField[javatype] = [];
		}
		var javaname= list[index].COLUMN_NAME;
		javaname = tranToJavaName(javaname);
		javaField[javatype].push(javaname);
	}
	if($("#javacontent").val().replace(/\s+/g,"") == ""){
		printJava(javaField);
	}
	return javaField;
}

//根据sql的框架进行选用不同的sql拼接方法
function tranToSqlFormate(){
	var sql_field = getdata('sqlField');
	var framework = $("#framework").val();
	if(framework == 'mybatis'){
		mybatisFormate(sql_field);
	}
}

//全选及取消全选的操作
function allAndNotall(obj){
	obj = $(obj);
	var text = obj.text();
	var ischecked = null;
	if(text == '全选'){
		//全选需要进行的操作
		ischecked = true;
		text = '取消全选';
	}else{
		//取消全选需要进行的操作
		ischecked = false;
		text = '全选';
	}
	var parent = obj.parent().parent();
	/**
	* 由于jQuery的一些原因，使用attr进行全选只能使用一次，而prop可以多次重复使用
	*/
	parent.find('.checkbox').prop("checked",ischecked);
	obj.text(text);
}

//将生成的java代码输出
function printJava(java_field){
	var javacontent = "";
	for(var key in java_field){
		var array = key.split(".");
		var java_type = array[array.length-1];
		for(var i in java_field[key]){
			javacontent += '\tprivate ' + java_type + ' ' + java_field[key][i] + ';\n';
		}
	}
	$("#javacontent").val(javacontent);
}

//根据复选框中的选项生成对应的sql字段和java属性
function sqlAndJavaField(){
	var resultmap = {};
	//用于存储sql和java的字段属性名，key为sql字段，value为java属性
	var field = {};
	//用于存储条件的字段及参数名，key为sql字段，value为java属性
	var conditional = {};
	//是否选择了所有的字段
	var allfield = true;
	//是否选这里所有的条件
	var allconditional = true;
	var checkboxs = $('#usefield').find('.checkbox');
	console.log(checkboxs);
	for(var index = 0;index < checkboxs.length;index++){
		if(checkboxs[index].checked){
			field[checkboxs[index].value] = tranToJavaName(checkboxs[index].value);
		}else{
			allfield = false;
		}
	}
	checkboxs = $('#conditional').find('.checkbox');
	for(var index = 0;index < checkboxs.length;index++){
		if(checkboxs[index].checked){
			conditional[checkboxs[index].value] = tranToJavaName(checkboxs[index].value);
		}else{
			allconditional = false;
		}
	}
	resultmap.field = field;
	resultmap.conditional = conditional;
	resultmap.allfield = allfield;
	resultmap.allconditional = allconditional;
	return resultmap;
}