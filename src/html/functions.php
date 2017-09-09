<?php
  mb_internal_encoding("UTF-8");

  function removeCRLF($str) {
    return str_replace(array("\r","\n"), array(" ", " "), $str);
  }
  function removeHtml($str) {
    return strip_tags(trim($str));
  }
  function getMailContent($content_base, $boundary, $filepath) {
    $content = "";

    if ($filepath) {
      $filetype = mime_content_type($filepath);
      $filename = basename($filepath);

      $content .= "--$boundary\n";
      $content .= "Content-Type: text/plain; charset=\"UTF-8\"\n";
      $content .= "Content-Transfer-Encoding: 8bit\n";
      $content .= "\n";
      $content .= "$content_base\n";

      $content .= "--$boundary\n";
      $content .= "Content-Type: $filetype; name=\"$filename\"\n";
      $content .= "Content-Disposition: attachment; filename=\"$filename\"\n";
      $content .= "Content-Transfer-Encoding: base64\n";
      $content .= "\n";
      $content .= chunk_split(base64_encode(file_get_contents($filepath)))."\n";

      $content .= "--$boundary--";
    } else {
      $content .= "$content_base\n";
    }
    return $content;
  }
?>
