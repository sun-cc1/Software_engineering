<?php
session_start();
header("Content-type: text/html; charset=utf-8");
$username = $_POST['username'];
$password = $_POST['password'];
$yzm=$_POST['yzm'];

include_once "connect.php";
if ($conn->connect_error){
    echo '数据库连接失败！';
    exit(0);
}else{
    if ($username == ''){
        echo '<script>alert("请输入用户名！");history.go(-1);</script>';
        exit(0);
    }
    if ($password == ''){
        echo '<script>alert("请输入密码！");history.go(-1);</script>';
        exit(0);
    }
    if($yzm!=$_SESSION['captcha']){
        echo"<script>alert('你的验证码不正确，请重新输入');history.go(-1);</script>";
        exit(0);
    }
    $sql = "select username from userinfo where username =? and password =?";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param(ss,$username,md5($password));
    $stmt->execute();
    $result=mysqli_stmt_get_result($stmt);
    $row=mysqli_fetch_assoc($result);
    if ($row) {
        $_SESSION["username"] = "$username";
        echo '<script>window.location="m_index.html";</script>';

    } else {
        echo '<script>alert("用户名或密码错误！");history.go(-1);</script>';
    }
}
?>