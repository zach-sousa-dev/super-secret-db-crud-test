<?php

/**
 * This PHP file really isn't all that important, its more or less just an
 * excuse to do AJAX.
 */
redirectList();     //on load

/**
 * @param $path     the path to redirect to
 */
function redirect($path) {
    header("Location: http://".$_SERVER['HTTP_HOST']."/".$path);
}

/**
 * Redirects to the list of items page.
 */
function redirectList() {
    redirect("super-secret-db-crud-test/public/list.html");
}

/**
 * Redirects to the items create page.
 */
function redirectCreate() {
    redirect("super-secret-db-crud-test/public/list.html");
}
