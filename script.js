let selectedRow = null;

// Phone number validation
function setupPhoneValidation() {
    const phoneInput = document.getElementById('empCode');
    if (!phoneInput) return;

    // Create warning message element
    const warningMsg = document.createElement('div');
    warningMsg.id = 'phoneWarning';
    warningMsg.style.cssText = 'color: #ff5b5b; font-size: 0.85rem; margin-top: 4px; display: none;';
    phoneInput.parentElement.appendChild(warningMsg);

    function showWarning(message) {
        warningMsg.textContent = message;
        warningMsg.style.display = 'block';
        phoneInput.style.borderColor = '#ff5b5b';
    }

    function hideWarning() {
        warningMsg.style.display = 'none';
        phoneInput.style.borderColor = '#c8d3eb';
    }

    // Validate phone number format
    function validatePhoneNumber(value) {
        const numericOnly = value.replace(/\D/g, '');
        if (numericOnly.length < 8) {
            return { valid: false, message: 'Phone Number Must Be at Least 8 Digits.' };
        }
        if (numericOnly.length > 11) {
            return { valid: false, message: 'Phone Number Must Not Exceed 11 Digits.' };
        }
        return { valid: true, numeric: numericOnly };
    }

    // Handle input events
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value;
        const numericOnly = value.replace(/\D/g, '');
        
        // Check if there are non-numeric characters
        if (value !== numericOnly) {
            showWarning('Only Numbers are Allowed. Letters and Emojis are Not Permitted.');
            e.target.value = numericOnly;
            value = numericOnly;
        } else {
            hideWarning();
        }

        // Validate length
        if (numericOnly.length > 0) {
            const validation = validatePhoneNumber(numericOnly);
            if (!validation.valid) {
                showWarning(validation.message);
            } else {
                hideWarning();
            }
        } else {
            hideWarning();
        }
    });

    // Handle paste events
    phoneInput.addEventListener('paste', function(e) {
        setTimeout(() => {
            let value = e.target.value;
            const numericOnly = value.replace(/\D/g, '');
            
            if (value !== numericOnly) {
                showWarning('Only Numbers are Allowed. Letters and Emojis are Not Permitted.');
            }
            
            e.target.value = numericOnly;
            
            const validation = validatePhoneNumber(numericOnly);
            if (!validation.valid) {
                showWarning(validation.message);
            } else if (numericOnly.length > 0) {
                hideWarning();
            }
        }, 0);
    });

    // Handle keydown to prevent non-numeric input
    phoneInput.addEventListener('keydown', function(e) {
        // Allow: backspace, delete, tab, escape, enter, and arrow keys
        if ([8, 9, 27, 13, 46, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        // Ensure that it is a number and stop the keypress if not
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
            showWarning('Only Numbers are Allowed. Letters and Emojis are Not Permitted.');
        }
    });
}

// NEW: Salary validation (only digits allowed). Shows warning icon + message and strips invalid chars.
function setupSalaryValidation() {
	const salaryInput = document.getElementById('salary');
	if (!salaryInput) return;

	// Create warning element
	const warningMsg = document.createElement('div');
	warningMsg.id = 'salaryWarning';
	warningMsg.style.cssText = 'color: #ff5b5b; font-size: 0.85rem; margin-top: 4px; display: none; align-items: center;';
	warningMsg.innerHTML = `
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;flex:0 0 16px;">
			<path fill="#b71c1c" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1-9h-2v7h2V6z"/>
		</svg>
		<span>Only Numbers Allowed. Emojis, Letters and Symbols are Not Permitted.</span>
	`;
	salaryInput.parentElement.appendChild(warningMsg);

	function showWarning(message) {
		warningMsg.querySelector('span').textContent = message;
		warningMsg.style.display = 'flex';
		salaryInput.style.borderColor = '#ff5b5b';
	}

	function hideWarning() {
		warningMsg.style.display = 'none';
		salaryInput.style.borderColor = '#c8d3eb';
	}

	// Utility to strip non-digits
	function digitsOnly(val) {
		return (val || '').replace(/\D/g, '');
	}

	// Input handler: strip non-digit chars and show warning if any removed
	salaryInput.addEventListener('input', function (e) {
		let value = e.target.value;
		const cleaned = digitsOnly(value);
		if (value !== cleaned) {
			e.target.value = cleaned;
			showWarning('Only Numbers Allowed. Emojis, Letters and Symbols are Not Permitted.');
		} else {
			hideWarning();
		}
	});

	// Paste handler: sanitize pasted content
	salaryInput.addEventListener('paste', function (e) {
		setTimeout(() => {
			let value = e.target.value;
			const cleaned = digitsOnly(value);
			if (value !== cleaned) {
				e.target.value = cleaned;
				showWarning('Only Numbers Allowed. Emojis, Letters and Symbols are Not Permitted.');
			} else {
				hideWarning();
			}
		}, 0);
	});

	// Prevent non-digit key presses (allow navigation & control keys)
	salaryInput.addEventListener('keydown', function (e) {
		if ([8, 9, 27, 13, 46, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
			(e.keyCode === 65 && e.ctrlKey === true) ||
			(e.keyCode === 67 && e.ctrlKey === true) ||
			(e.keyCode === 86 && e.ctrlKey === true) ||
			(e.keyCode === 88 && e.ctrlKey === true)) {
			return;
		}
		// numeric keys (top row and numpad)
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
			showWarning('Only Numbers Allowed. Emojis, Letters and Symbols are Not Permitted.');
		}
	});
}

function onFormSubmit(event) {
    event.preventDefault();
    const formData = readFormData();

    if (!isFormValid(formData)) {
        alert('Please complete all the fields before submitting the form.');
        return;
    }

    // Validate phone number before submission
    const phoneValue = formData.empCode.replace(/\D/g, '');
    if (phoneValue.length < 8 || phoneValue.length > 11) {
        alert('Phone number must be between 8 and 11 digits.');
        document.getElementById('empCode').focus();
        return;
    }

    // NEW: Validate salary contains at least one digit and no invalid characters
    const salaryValueRaw = formData.salary || '';
    const salaryDigits = salaryValueRaw.replace(/\D/g, '');
    if (salaryDigits.length === 0) {
        alert('Salary must contain digits only.');
        const salaryInput = document.getElementById('salary');
        if (salaryInput) {
            salaryInput.focus();
            // show inline warning if present
            const warn = document.getElementById('salaryWarning');
            if (warn) {
                warn.style.display = 'flex';
                salaryInput.style.borderColor = '#ff5b5b';
            }
        }
        return;
    }
    // Substitute cleaned digits back into form data (keeps stored value numeric-only)
    formData.salary = salaryDigits;

    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }

    resetForm();
}

// Read operation using this function
function readFormData() {
    return {
        fullName: document.getElementById('fullName').value.trim(),
        empCode: document.getElementById('empCode').value.trim(),
        salary: document.getElementById('salary').value.trim(),
        city: document.getElementById('city').value.trim()
    };
}

function isFormValid(formData) {
    return Object.values(formData).every((value) => value !== '');
}

// Create operation
function insertNewRecord(data) {
    const tableBody = document
        .getElementById('employeeList')
        .getElementsByTagName('tbody')[0];

    const newRow = tableBody.insertRow(tableBody.length);

    const cell1 = newRow.insertCell(0);
    cell1.textContent = data.fullName;
    cell1.setAttribute('data-label', 'Full Name');

    const cell2 = newRow.insertCell(1);
    cell2.textContent = data.empCode;
    cell2.setAttribute('data-label', 'Phone Number');

    const cell3 = newRow.insertCell(2);
    cell3.textContent = data.salary;
    cell3.setAttribute('data-label', 'Salary');

    const cell4 = newRow.insertCell(3);
    cell4.textContent = data.city;
    cell4.setAttribute('data-label', 'City');

    const cell5 = newRow.insertCell(4);
    cell5.setAttribute('data-label', 'Actions');
    cell5.innerHTML = `
        <span class="table-action-group">
            <a href="#" class="table-action edit" onClick="onEdit(event, this)">Edit</a>
            <a href="#" class="table-action delete" onClick="onDelete(event, this)">Delete</a>
        </span>
    `;
}

// To Reset the data of fill input
function resetForm() {
    document.getElementById('fullName').value = '';
    document.getElementById('empCode').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('city').value = '';
    selectedRow = null;

    // Clear phone warning on reset
    const phoneWarn = document.getElementById('phoneWarning');
    if (phoneWarn) {
        phoneWarn.style.display = 'none';
    }
    const phoneInput = document.getElementById('empCode');
    if (phoneInput) {
        phoneInput.style.borderColor = '#c8d3eb';
    }

    // Clear salary warning on reset
    const salaryWarn = document.getElementById('salaryWarning');
    if (salaryWarn) {
        salaryWarn.style.display = 'none';
    }
    const salaryInput = document.getElementById('salary');
    if (salaryInput) {
        salaryInput.style.borderColor = '#c8d3eb';
    }
}

// For Edit operation
function onEdit(event, element) {
    event.preventDefault();
    selectedRow = element.closest('tr');

    document.getElementById('fullName').value = selectedRow.cells[0].textContent;
    document.getElementById('empCode').value = selectedRow.cells[1].textContent;
    document.getElementById('salary').value = selectedRow.cells[2].textContent;
    document.getElementById('city').value = selectedRow.cells[3].textContent;
}

function updateRecord(formData) {
    selectedRow.cells[0].textContent = formData.fullName;
    selectedRow.cells[1].textContent = formData.empCode;
    selectedRow.cells[2].textContent = formData.salary;
    selectedRow.cells[3].textContent = formData.city;
}

function onDelete(event, element) {
    event.preventDefault();

    if (confirm('Are You Sure You Want to Delete This Record?')) {
        const row = element.closest('tr');
        document.getElementById('employeeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

// Initialize validations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupPhoneValidation();
    setupSalaryValidation(); // initialize salary checks
});