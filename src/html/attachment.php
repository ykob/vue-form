<?php
  $file = $_FILES["file"];

  // setting pathname for upload directory.
  $dirArray = Array('./upload_files/', date('Y/'), date('md/'), date('His/'));

  // check to be present directory.
  $dir = '';
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
  $filepath = $dir. $file['name'];
  move_uploaded_file($file['tmp_name'], $filepath);

  // send mail
  $boundary = "__BOUNDARY__";

  $additional_headers = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\n";
  $additional_headers .= "Content-Transfer-Encoding: 8bit\n";
  $additional_headers .= "From: info@tplh.net\n";

  $message = "--{$boundary}\n";

  $message .= "Content-Type: text/plain; charset=\"ISO-2022-JP\"\n";
  $message .= "\n";
  $message .= "これはメール本文です。\n";

  $message .= "--{$boundary}\n";

  $message .= "Content-Type: text/plain; charset=\"ISO-2022-JP\"\n";
  $message .= "\n";
  $message .= "これはメール本文です。2\n";

  $message .= "--{$boundary}\n";

  $filetype = mime_content_type($filepath);
  $filename = basename($filepath);

  $message .= "Content-Type: {$filetype}; name=\"{$filename}\"\n";
  $message .= "Content-Disposition: attachment; filename=\"{$filename}\"\n";
  $message .= "Content-Transfer-Encoding: base64\n";
  $message .= "\n";
  $message .= chunk_split(base64_encode(file_get_contents($filepath)))."\n";

  $message .= "--{$boundary}--";

  mb_send_mail('koba@tsumikiinc.com', '添付ファイルのテスト送信', $message, $additional_headers);
?>
