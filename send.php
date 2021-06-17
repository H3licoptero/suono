<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=UTF-8');

$postText = file_get_contents('php://input');
$res = json_decode($postText, true); 
$name = $res["form-name"];
$email = $res["form-email"];
$text = $res["form-text"];



//Load Composer's autoloader
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';


//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
  //Server settings
  $mail->SMTPDebug = 0;                                       //Enable verbose debug output
  $mail->isSMTP();                                            //Send using SMTP
  $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
  $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
  $mail->Username   = 'helicgraduado@gmail.com';              //SMTP username
  $mail->Password   = 'verde20Corda16';                       //SMTP password
  $mail->SMTPSecure = "ssl";                                  //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
  $mail->Port       = 465;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
  $mail->CharSet = 'UTF-8';
      
  //Recipients
  $mail->setFrom('helicgraduado@gmail.com', 'Helic Graduado');
  $mail->addAddress('h3licoptero@yandex.ru');     //Add a recipient
  
  //Content
  $mail->isHTML(true);                                  //Set email format to HTML
  $mail->Subject = 'Новая заявка';
  $mail->Body    = "Имя пользователя: ${name}, E-mail пользователя: ${email}, Сообщение пользователя: ${text}.";

  if ($mail->send()) {
    echo 'Письмо отправлено.';
  } else {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
  }

} catch (Exception $e) {
    echo "Ошибка отправки письма: {$mail->ErrorInfo}";
}