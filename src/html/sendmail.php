<?php
  function removeCRLF($str) {
    return str_replace(array("\r","\n"), array(" ", " "), $str);
  }
  function removeHtml($str) {
    return strip_tags(trim($str));
  }

  // Only process POST reqeusts.
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $text = removeCRLF(removeHtml($_POST["text"]));
    $mail = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
    $radio = removeHtml($_POST["radio"]);
    $checkbox = removeHtml(implode(" / ", $_POST["checkbox"]));
    $select = removeHtml(implode(" / ", $_POST["select"]));
    $multi_text = removeHtml($_POST["multiText"]);

    // Check that data was sent to the mailer.
    if (
      empty($text) OR
      empty($multi_text) OR
      !filter_var($mail, FILTER_VALIDATE_EMAIL)
    ) {
      // Set a 400 (bad request) response code and exit.
      http_response_code(400);
      echo "400 bad request";
      exit;
    }

    // ------------------------------------
    // For Common
    // ------------------------------------
    // Build the email content.
    $email_content = "";
    $email_content .= "$text\n";
    $email_content .= "$mail\n";
    $email_content .= "$radio\n";
    $email_content .= "$checkbox\n";
    $email_content .= "$select\n";
    $email_content .= "$multi_text\n";

    // ------------------------------------
    // For Admin
    // ------------------------------------
    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient_admin = "info@tplh.net";

    // Set the email subject.
    $subject_admin = "$name 様よりお問い合わせがありました。";

    // Build the email content.
    $email_content_admin = "ウェブサイトのフォームからお問い合わせがありました。\n内容は以下のとおりです。\n\n";
    $email_content_admin .= $email_content;

    // Build the email headers.
    $email_headers_admin = "From: $name <$mail>";

    // ------------------------------------
    // For User
    // ------------------------------------
    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient_user = $mail;

    // Set the email subject.
    $subject_user = "お問い合わせありがとうございました。";

    // Build the email content.
    $email_content_user  = "$name 様\n\n";
    $email_content_user .= "この度はお問い合わせいただきましてありがとうございました。\n以下の内容にて承りました。\n\n";
    $email_content_user .= "$email_content\n";

    // Build the email headers.
    $email_headers_user = "From: yoichi kobayashi <info@tplh.net>";

    // Send the email.
    if (
      mail($recipient_admin, $subject_admin, $email_content_admin, $email_headers_admin) &&
      mail($recipient_user, $subject_user, $email_content_user, $email_headers_user)
    ) {
      // Set a 200 (okay) response code.
      http_response_code(200);
      echo "メールが無事送信されました。";
    } else {
      // Set a 500 (internal server error) response code.
      http_response_code(500);
      echo "500 internal server error";
    }

  } else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "403 forbidden";
  }

?>
