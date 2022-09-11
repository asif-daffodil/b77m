<?php
if ($_GET['callback'] != '') {
  $mime = 'application/javascript';
  $start = '(';
  $end = ')';
} else {
  $mime = 'application/json';
  $start = '';
  $end = '';
}
header('Content-type: ' . $mime . '; charset=utf-8');
echo $_GET['callback'] . $start . '{"1": "This text will be updated every 30 seconds on-the-fly!", "2": "Last update: ' . date('Y-m-d h:i:s a') . '"}' . $end;
?>
