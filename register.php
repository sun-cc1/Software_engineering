<?php
header("Content-type: text/html");

$username = $_POST['name'];
$password = $_POST['pwd'];
$repassword = $_POST['pwdconfirm'];
$telephone = $_POST['telephone'];
$email=$_POST['email'];

function check_email($email){
    $preg="/^\w+([-_.]\w+)*@\w+([-_.]\w+)*(\.\w+){0,3}$/i";
    $res=preg_match($preg,$email);
    return $res;//匹配成功返回1，匹配失败返回0
}
if ($username == ''){
    echo '<script>alert("请输入用户名！");history.go(-1);</script>';
    exit(0);
}
if ($password == ''){
    echo '<script>alert("请输入密码");history.go(-1);</script>';
    exit(0);
}
if ($password != $repassword){
    echo '<script>alert("密码与确认密码应该一致");history.go(-1);</script>';
    exit(0);
}
if($password == $repassword){
    include_once "connect.php";
    if ($conn->connect_error){
        echo '数据库连接失败！';
        exit(0);
    }else {
        $sql = "select username from userinfo where username = ?";
        $stmt=$conn->prepare($sql);
        $stmt->bind_param(s,$username);
        $stmt->execute();
        $result=mysqli_stmt_get_result($stmt);
        $row=mysqli_fetch_assoc($result);
        if ($row) {
            echo '<script>alert("用户名已经存在");history.go(-1);</script>';
        } else {
            //预处理
            $sql = "insert into userinfo (username,password) values(?,?)";
            $stmt=$conn->prepare($sql);
            $stmt->bind_param("ss", $username,md5($password));
            $res_insert=$stmt->execute();
            //$num=mysqli_num_rows($res_insert);
            if ($res_insert) {
                echo '<script>window.location="login.html";</script>';
            } else {
                echo("错误描述: " . mysqli_error($conn));
                //echo "<script>alert('系统繁忙，请稍候！');</script>";
            }
        }
    }
}else{
    echo "<script>alert('提交未成功！'); history.go(-1);</script>";
}
?>
