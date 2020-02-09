<?php

define('ACCESS', true);

error_reporting(E_ALL | E_STRICT);

function get_upload_dir() {
  return dirname(__FILE__) . '/files';
}
function is_filename_valid($filename) {
  return preg_match('/^([0-9]+)\.(ogg|mp3|mp4|webm)$/', $filename);
}
function get_filename() {
  $filename = $_GET['filename'];
  if (!is_filename_valid($filename)) {
    die('ACCESS DENIED!');
  }
  return $filename;
}
function template($template_name, $vars=[]) {
  require dirname(__FILE__) . '/templates/' . $template_name . '.phtml';
}
function upload() {
  $headers = getallheaders();
  if (!empty($headers['HTTP_X_FILENAME']) and is_filename_valid($headers['HTTP_X_FILENAME'])) {
    $filename = $headers['HTTP_X_FILENAME'];
  } elseif (!empty($headers['X_FILENAME']) and is_filename_valid($headers['X_FILENAME'])) {
    $filename = $headers['X_FILENAME'];
  }
  file_put_contents(get_upload_dir() . '/' . $filename, file_get_contents('php://input'));
}
function stream() {
  $path = get_upload_dir() . '/' . get_filename();
  readfile($path);
}
