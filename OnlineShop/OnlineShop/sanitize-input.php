<?php 

function sanitize($input) {
    return strip_tags(htmlspecialchars(trim($input)));
}

?>