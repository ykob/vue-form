<?php
  mb_internal_encoding("UTF-8");

  // Only process POST reqeusts.
  if ($_SERVER["REQUEST_METHOD"] != "POST") {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "403 forbidden";
    exit;
  }

  $file = $_FILES["file"];

  // Check file type.
  switch ($file['type']) {
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
      break;
    default:
      http_response_code(400);
      echo "400 bad request";
      exit;
  }

  // Check to be present directory.
  $dirArray = Array('./upload_files/', date('Y/'), date('md/'), date('His/'));
  for ($i = 0; $i < count($dirArray); $i++) {
    $dir = '';
    for ($j = 0; $j <= $i; $j++) {
      $dir .= $dirArray[$j];
    }
    if (!is_dir($dir)) {
      mkdir($dir);
    }
  }

  // Upload file.
  move_uploaded_file($file['tmp_name'], $filepath);

  // Send mail.
  $filepath = implode($dirArray). $file['name'];
  $filetype = mime_content_type($filepath);
  $filename = basename($filepath);

  $recipient = "koba@tsumikiinc.com";
  $subject = "添付ファイルのテスト送信";
  $boundary = "__BOUNDARY__";

  $email_headers_common = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"; charset=\"UTF-8\"\n";
  $email_headers_common .= "Content-Transfer-Encoding: base64\n";
  $email_headers_common .= "From: info@tplh.net\n";

  $email_content = "";

  $email_content .= "--{$boundary}\n";
  $email_content .= "Content-Type: multipart/alternative; boundary=\"{$boundary}2\"\n";
  $email_content .= "\n";

  $email_content .= "--{$boundary}2\n";
  $email_content .= "Content-Type: text/plain; charset=\"UTF-8\"\n";
  $email_content .= "Content-Transfer-Encoding: base64\n";
  $email_content .= "\n";
  $email_content .= base64_encode("これは Content-Type: text/plain のメール本文です。\n")."\n";

  $email_content .= "--{$boundary}2\n";
  $email_content .= "Content-Type: text/html; charset=\"UTF-8\"\n";
  $email_content .= "Content-Transfer-Encoding: base64\n";
  $email_content .= "\n";
  $email_content .= base64_encode("これは Content-Type: text/html のメール本文です。\n")."\n";

  $email_content .= "--{$boundary}2--\n";

  $email_content .= "--{$boundary}\n";
  $email_content .= "Content-Type: {$filetype}; name=\"{$filename}\"\n";
  $email_content .= "Content-Disposition: attachment; filename=\"{$filename}\"\n";
  $email_content .= "Content-Transfer-Encoding: base64\n";
  $email_content .= "\n";
  $email_content .= chunk_split(base64_encode(file_get_contents($filepath)))."\n";

  $email_content .= "--{$boundary}--";

  if (
    mail($recipient, $subject, $email_content, $email_headers_common)
  ) {
    // Set a 200 (okay) response code.
    http_response_code(200);
    echo "200 OK";
  } else {
    // Set a 500 (internal server error) response code.
    http_response_code(500);
    echo "500 internal server error";
  }
?>
