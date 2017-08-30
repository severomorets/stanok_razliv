<?php

$IP = $_SERVER['HTTP_HOST'];
echo "<script>var IP ='$IP' </script>";

//if ($_SERVER['SERVER_NAME']=="localhost")
if (!isset($_GET['local']))
{
    include("./local.html");
}
else
{
     //include("./local.html");
    include("./phone.php");
}

?>
