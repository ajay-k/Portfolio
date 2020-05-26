<?php
  $name = $_POST['name'];
  $vistor_email = $_POST['email'];
  $message = $_POST['message'];

  $email_from = 'ajay_k@sbcglobal.net';

  $email_subject = "New Form Submission";

  $email_body = "Name:  $name.\n".
                "User email: $vistor_email.\n".
                "User Message:  $message.\n";

  $to = "ajayk.coding@gmail.com";

  $headers = "From: $email_from \r\n";

  $headers .= "Reply-To: $vistor_email \r\n";

  mail(@to, $email_subject, $email_body, $headers);

  header("Location: index.html");

?> 