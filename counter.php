<?php
// Start a session to track if the user has visited before.
session_start();

header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$filePath = __DIR__ . '/visitor_count.txt';
$count = 0;

// --- Logic to increment only for new visitors ---
// Check if the 'has_visited' session variable is NOT set.
if (!isset($_SESSION['has_visited'])) {
    // This is a new visitor. Let's increment the count.
    $fileHandle = fopen($filePath, 'c+');

    // Use a lock to prevent race conditions if multiple new users visit at the exact same time.
    if (flock($fileHandle, LOCK_EX)) {
        $count = (int)fread($fileHandle, filesize($filePath) ?: 1);
        $count++;

        ftruncate($fileHandle, 0);
        rewind($fileHandle);
        fwrite($fileHandle, $count);

        flock($fileHandle, LOCK_UN); // Release the lock
    }
    fclose($fileHandle);

    // Mark this session as "visited" so we don't count them again on refresh.
    $_SESSION['has_visited'] = true;
}

// For all users (new and returning), just read the latest count and send it.
$count = (int)file_get_contents($filePath);

echo json_encode(['value' => $count]);