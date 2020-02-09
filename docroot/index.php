<?php
require '../bootstrap.php';

if (isset($_GET['op']) and $_GET['op'] == 'upload') {
  upload();
  die();
}
if (isset($_GET['op']) and $_GET['op'] == 'play') {
  template('play', [get_filename()]);
  die();
}
if (isset($_GET['op']) and $_GET['op'] == 'stream') {
  stream();
  die();
}
template('front');
