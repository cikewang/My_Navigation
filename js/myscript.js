$(document).ready(function(){
	var page;

	if($.cookie('username') =='' || $.cookie("username") == 'undefined')
	{
		hidd_sc();
	}
	else
	{
		show_sc();
	}

	$("#register").click(function(){
		$(".reg-div").css('display','');
		$(".user-login-div").css('display','none');
	});

	$("#login-reg").click(function(){
		$(".reg-div").css('display','none');
		$(".user-login-div").css('display','');
	});

	$("#register-reg").click(function(){
		var reg_username = $("#reg_username").val();
		var reg_password = $("#reg_password").val();
		var auth_code = $("#auth_code").val();

		if (reg_username == '' || reg_username == 'undefined') 
		{
			$(".username-reg-div").addClass('has-warning');
			$(".user-reg-msg").removeClass('hide');
			$(".user-reg-msg h6").html('请正确填写信息');
			return false;
		}
		else
		{
			$(".username-reg-div").removeClass('has-warning');
			$(".user-reg-msg").addClass('hide');
		}
		if (reg_password == '' || reg_password == 'undefined') 
		{
			$(".password-reg-div").addClass('has-warning');
			$(".user-reg-msg").removeClass('hide');
			$(".user-reg-msg h6").html('请正确填写信息');
			return false;
		}
		else
		{
			$(".password-reg-div").removeClass('has-warning');
			$(".user-reg-msg").addClass('hide');
		}

		$.ajax({
		   type: "POST",
		   dataType:"json",
		   url: "http://localhost/cikewang.com/index.php?p=navigation&c=default&a=user_reg",
		   data: {"username":reg_username,"password":reg_password,"auth_code":auth_code},
		   success: function(msg){
		   	$(".user-reg-msg").removeClass('hide');
		   	$(".user-reg-msg h6").html(msg);
		   }
		});


	});


	$("#login").click(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		if(username == '' || username == 'undefined')
		{
			$(".username-div").addClass('has-warning');
			$(".user-login-msg").removeClass('hide');
			$(".user-login-msg h6").html('用户名或密码错误');
			return false;
		}
		else
		{
			$(".username-div").removeClass('has-warning');
			$(".user-login-msg").addClass('hide');
		}
		
		if(password == '' || password == 'undefined')
		{
			$(".password-div").addClass('has-warning');
			$(".user-login-msg").removeClass('hide');
			$(".user-login-msg h6").html('用户名或密码错误');
			return false;
		}
		else
		{
			$(".password-div").removeClass('has-warning');
			$(".user-login-msg").addClass('hide');
		}
	
		$.ajax({
		   type: "POST",
		   dataType:"json",
		   url: "http://localhost/cikewang.com/index.php?p=navigation&c=default&a=user_login",
		   data: {"username":username,"password":password},
		   success: function(u){
		   	$.cookie('username',u.username);
			$.cookie("uid",u._id);
			url = "http://localhost/cikewang.com/id="+u._id;
			$("#mynavigation").attr("href",url);
			show_sc();
		   }
		});

		
		
	});

	$("#huoqu").click(function(){
		chrome.tabs.getSelected(function(w){
			page = w;
			$("#web_url").val(w.url);
			$("#web_name").val(w.title);
		})
	});

	$("#souchang").click(function(){
		category = $("#category").val();

		$.ajax({
		   type: "POST",
		   url: "http://localhost/cikewang.com/index.php?p=navigation&c=default&a=add",
		   data: {"uid":1,"web_url":page.url,"web_name":page.title,"cate_name":category},
		   success: function(msg){
		     alert( "Data Saved: " + msg );
		   }
		});
	});

	$("#loginOut").click(function(){
		hidd_sc();
		$.removeCookie('username');
		$.removeCookie('uid');

	});
});

function show_sc()
{
	$(".user-login-div").css("display","none");
	$(".sc-div").css("display","");
}

function hidd_sc()
{
	$(".user-login-div").css("display","");
	$(".sc-div").css("display","none");
}