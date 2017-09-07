<?php
  mb_internal_encoding("UTF-8");

  $file = $_FILES["file"];

  // setting pathname for upload directory.
  $dirArray = Array('./upload_files/', date('Y/'), date('md/'), date('His/'));
  $filepath = implode($dirArray). $file['name'];

  // check to be present directory.
  for ($i = 0; $i < count($dirArray); $i++) {
    $dir = '';
    for ($j = 0; $j <= $i; $j++) {
      $dir .= $dirArray[$j];
    }
    if (!is_dir($dir)) {
      mkdir($dir);
    }
  }

  // upload file.
  move_uploaded_file($file['tmp_name'], $filepath);

  // send mail.
  $$recipient = 'koba@tsumikiinc.com';
  $subject = '添付ファイルのテスト送信';
  $filetype = mime_content_type($filepath);
  $filename = basename($filepath);
  $boundary = "__BOUNDARY__";

  $additional_headers = "";
  $additional_headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"; charset=\"UTF-8\"\n";
  $additional_headers .= "Content-Transfer-Encoding: base64\n";
  $additional_headers .= "From: info@tplh.net\n";

  $message = "";

  $message .= "--{$boundary}\n";
  $message .= "Content-Type: multipart/alternative; boundary=\"{$boundary}2\"\n";
  $message .= "\n";

  $message .= "--{$boundary}2\n";
  $message .= "Content-Type: text/plain; charset=\"UTF-8\"\n";
  $message .= "Content-Transfer-Encoding: base64\n";
  $message .= "\n";
  $message .= base64_encode("これは Content-Type: text/plain のメール本文です。\n")."\n";

  $message .= "--{$boundary}2\n";
  $message .= "Content-Type: text/html; charset=\"UTF-8\"\n";
  $message .= "Content-Transfer-Encoding: base64\n";
  $message .= "\n";
  $message .= base64_encode("これは Content-Type: text/html のメール本文です。\n")."\n";

  $message .= "--{$boundary}2--\n";

  $message .= "--{$boundary}\n";
  $message .= "Content-Type: {$filetype}; name=\"{$filename}\"\n";
  $message .= "Content-Disposition: attachment; filename=\"{$filename}\"\n";
  $message .= "Content-Transfer-Encoding: base64\n";
  $message .= "\n";
  $message .= chunk_split(base64_encode(file_get_contents($filepath)))."\n";

  $message .= "--{$boundary}--";

  mail($$recipient, $subject, $message, $additional_headers);
?>
