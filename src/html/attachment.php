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
  move_uploaded_file($file['tmp_name'], $dir. $file['name']);
?>
