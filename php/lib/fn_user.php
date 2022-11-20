<?php

namespace proven\user;

/**
* 
* @param type $filename the name of the file to be read.
* @param type $delimiter the separator between keys and values.
* @return associative array with the data read from the file only of the user or and empty array if not.
*/
function searchUser(string $username):array {
    $data = array();
    $filepath = './files/database.txt';
    $delimiter = ':';
    
    if (\file_exists($filepath) && \is_readable($filepath)) {
    $handle = \fopen($filepath, 'r');  //returns false on error.
        if ($handle) {
            while (!\feof($handle)) {
                //delete spaces
                \fscanf($handle, "%[^\n]s\n", $line);
                    if ($line) {
                        $fields = explode ($delimiter, $line);
                        if (($fields[0] === $username)){
                            $data = $fields;
                            break;
                        }
                    }
                }
                \fclose($handle);            
            }
        }
    return $data;
};


