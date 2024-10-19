// List of malicious patterns for static detection using regex
const MALICIOUS_PATTERNS = [
    /<\?php/, /\?>/, /eval\(/, /base64_decode\(/, /exec\(/, /shell_exec\(/, 
    /system\(/, /passthru\(/, /proc_open\(/, /popen\(/, /proc_close\(/, 
    /preg_replace\(\/e/, /assert\(/, /include\(/, /require\(/, 
    /require_once\(/, /include_once\(/, /create_function\(/, 
    /call_user_func\(/, /call_user_func_array\(/, /set_time_limit\(/, 
    /ignore_user_abort\(/, /register_shutdown_function\(/, 
    /file_get_contents\(/, /fopen\(/, /fwrite\(/, /file_put_contents\(/, 
    /unlink\(/, /rmdir\(/, /rename\(/, /chmod\(/, /chown\(/, /ini_set\(/, 
    /ini_get\(/, /ini_restore\(/, /set_include_path\(/, /error_reporting\(/, 
    /@include\(/, /@require\(/, /\.exe$/, /\.py$/, /\.docx$/, /\.pdf$/, /\.jpg$/, /\.jpeg$/, /\.png$/
];

// Static Threat Detection Function
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('result');

    if (fileInput.files.length === 0) {
        alert("Please select a file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const result = checkFileContent(content);
        resultDiv.innerHTML = result;
    };

    reader.onerror = function() {
        resultDiv.innerHTML = "Error reading file.";
    };

    // Read the file as text
    reader.readAsText(file);
}

// Function to check for malicious patterns in the file content
function checkFileContent(content) {
    for (let pattern of MALICIOUS_PATTERNS) {
        if (pattern.test(content)) {
            return `Threat detected: File contains the pattern "${pattern.source}".`;
        }
    }
    return "File is safe for upload.";
}

