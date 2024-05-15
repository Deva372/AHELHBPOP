// Validate user credentials
function validateCredentials() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'Reportmis/hbpop') {
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
    } else {
        alert('Invalid username or password!');
        document.getElementById('mainContent').style.display = 'none';
    }
}

// Populate site IDs into the dropdown
const siteIds = [17822, 14286, 16755, 15268, 18819, 13122, 13123, 15249, 15726, 17030, 15992, 15933, 15279, 18218, 14197, 15430, 15090, 15666, 15269, 17033, 14219, 14629, 16973, 17161, 17162, 15977, 18404, 17413, 17160, 17300, 15573, 11677, 16717, 14805, 15082, 15763, 15364, 15978, 14228, 15116, 17425, 15284, 18802, 11763, 16334, 15745, 15297, 14235, 15714, 11812, 15564, 15248, 15513, 16994, 13124, 15232, 14203, 15017, 10041, 14201, 15247, 18777, 13987];
const select = document.getElementById('siteId');
siteIds.forEach(id => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = id;
    select.appendChild(option);
});

// Calculate Customer Feedback
function calculateCustomerFeedback() {
    const excellentCustomer = parseInt(document.getElementById('excellentCustomer').value) || 0;
    const goodCustomer = parseInt(document.getElementById('goodCustomer').value) || 0;
    const averageCustomer = parseInt(document.getElementById('averageCustomer').value) || 0;
    const poorCustomer = parseInt(document.getElementById('poorCustomer').value) || 0;

    const totalCustomers = excellentCustomer + goodCustomer + averageCustomer + poorCustomer;
    const feedbackPercentage = totalCustomers > 0 ? ((excellentCustomer + goodCustomer) / totalCustomers) * 100 : 0;

    document.getElementById('totalCustomers').value = totalCustomers;
    document.getElementById('customerFeedbackPercentage').value = feedbackPercentage.toFixed(2);
}

// Calculate Doctor Feedback
function calculateDoctorFeedback() {
    const excellentDoctor = parseInt(document.getElementById('excellentDoctor').value) || 0;
    const goodDoctor = parseInt(document.getElementById('goodDoctor').value) || 0;
    const averageDoctor = parseInt(document.getElementById('averageDoctor').value) || 0;
    const poorDoctor = parseInt(document.getElementById('poorDoctor').value) || 0;

    const totalDoctors = excellentDoctor + goodDoctor + averageDoctor + poorDoctor;
    const feedbackPercentage = totalDoctors > 0 ? ((excellentDoctor + goodDoctor) / totalDoctors) * 100 : 0;

    document.getElementById('totalDoctors').value = totalDoctors;
    document.getElementById('doctorFeedbackPercentage').value = feedbackPercentage.toFixed(2);
}

// Add Event Listeners for Customer and Doctor Feedback
['excellentCustomer', 'goodCustomer', 'averageCustomer', 'poorCustomer'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateCustomerFeedback);
});
['excellentDoctor', 'goodDoctor', 'averageDoctor', 'poorDoctor'].forEach(id => {
    document.getElementById(id).addEventListener('input', calculateDoctorFeedback);
});

// Update Total Expenses and Expenses Percentage
function updateExpenseTotals() {
    let totalExpenses = 0;
    const expensesInputs = document.querySelectorAll('.expense-input');
    expensesInputs.forEach(input => {
        totalExpenses += parseFloat(input.value) || 0;
    });
    document.getElementById('totalExpenses').value = totalExpenses;

    const totalRevenue = parseFloat(document.getElementById('Totalsales').value) || 0;
    const expensesPercentage = totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0;
    document.getElementById('expensesPercentage').value = expensesPercentage.toFixed(2);
}
document.querySelectorAll('.expense-input').forEach(item => {
    item.addEventListener('input', updateExpenseTotals);
});

// Add Designation
let designationCount = 0;
function addDesignation() {
    designationCount++;
    const container = document.getElementById('designationContainer');
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <label for="designation${designationCount}">Designation ${designationCount}:</label>
        <input type="text" id="designation${designationCount}" name="designation${designationCount}" list="designationList">
        <select id="gender${designationCount}" name="gender${designationCount}">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <input type="number" id="count${designationCount}" name="count${designationCount}" placeholder="Count" min="1">
    `;
    container.appendChild(div);
}
window.onload = addDesignation;

// Add Doctor
let doctorCount = 0;
function addDoctor() {
    doctorCount++;
    const container = document.getElementById('doctorSales');
    const inputGroup = document.createElement('div');
    inputGroup.innerHTML = `
        <div class="form-group">
            <label for="doctorName${doctorCount}">Doctor ${doctorCount} Name:</label>
            <input type="text" id="doctorName${doctorCount}" name="doctorName${doctorCount}">
        </div>
        <div class="form-group">
            <label for="doctorSale${doctorCount}">Sales:</label>
            <input type="number" id="doctorSale${doctorCount}" name="doctorSale${doctorCount}" oninput="updateTotalSales()">
        </div>
    `;
    container.appendChild(inputGroup);
}
function updateTotalSales() {
    let totalSales = 0;
    for (let i = 1; i <= doctorCount; i++) {
        const sale = parseInt(document.getElementById(`doctorSale${i}`).value) || 0;
        totalSales += sale;
    }
    document.getElementById('doctorTotalSales').value = totalSales;
}
const totalContainer = document.getElementById('doctorSales');
const totalDisplay = document.createElement('div');
totalDisplay.innerHTML = `
    <label for="doctorTotalSales">Total Sales:</label>
    <input type="number" id="doctorTotalSales" name="doctorTotalSales" readonly>
`;
totalContainer.appendChild(totalDisplay);

// Update Various Totals
function updateTotal() {
    const newPatients = parseInt(document.getElementById('newPatients').value) || 0;
    const reviewPatients = parseInt(document.getElementById('reviewPatients').value) || 0;
    const cashsale = parseInt(document.getElementById('cashSales').value) || 0;
    const cardsale = parseInt(document.getElementById('cardSales').value) || 0;
    const creditsale = parseInt(document.getElementById('creditSales').value) || 0;
    const cashDiscount = parseInt(document.getElementById('cashDiscount').value) || 0;
    const creditDiscount = parseInt(document.getElementById('creditDiscount').value) || 0;
    const pSale = parseInt(document.getElementById('psale').value) || 0;
    const fSale = parseInt(document.getElementById('fsale').value) || 0;
    const plSale = parseInt(document.getElementById('plsale').value) || 0;
    const sSale = parseInt(document.getElementById('ssale').value) || 0;
    const hSale = parseInt(document.getElementById('Hsale').value) || 0;
    const vSale = parseInt(document.getElementById('Vsale').value) || 0;
    const ERTSale = parseInt(document.getElementById('ERTsale').value) || 0;
    const IVFSale = parseInt(document.getElementById('IVFsale').value) || 0;
    const pdpcDischarge = parseInt(document.getElementById('pdpcDischarge').value) || 0;
    const pdpcSalesValue = parseInt(document.getElementById('pdpcSalesValue').value) || 0;
    const chronicSalesValue = parseInt(document.getElementById('chronicSalesValue').value) || 0;
    const mposSales = parseInt(document.getElementById('mposSales').value) || 0;
    const helpCounterSales = parseInt(document.getElementById('helpCounterSales').value) || 0;
    const totalPrescriptions = parseInt(document.getElementById('totalPrescriptions').value) || 0;
    const closingStockValue = parseInt(document.getElementById('closingStockValue').value) || 0;
    const cogsValue = parseInt(document.getElementById('cogsValue').value) || 0;
    const ePrescriptionToInvoice = parseInt(document.getElementById('ePrescriptionToInvoice').value) || 0;
    const numEPrescriptions = parseInt(document.getElementById('numEPrescriptions').value) || 0;
    const manpowerBudget = parseInt(document.getElementById('manpowerBudget').value) || 0;
    const manpowerActualsCount = parseInt(document.getElementById('manpowerActualsCount').value) || 0;

    const totalSales = mposSales + helpCounterSales;
    document.getElementById('helpTotalSales').value = totalSales;
    document.getElementById('totalPatients').value = newPatients + reviewPatients;
    document.getElementById('Totalsales').value = cashsale + cardsale + creditsale;
    document.getElementById('totalDiscount').value = cashDiscount + creditDiscount;
    document.getElementById('grtot').value = pSale + fSale + plSale + sSale + hSale;
    document.getElementById('Fgrtot').value = vSale + ERTSale + IVFSale;
    document.getElementById('pdpcSalesContribution').value = ((pdpcSalesValue / (cashsale + cardsale + creditsale)) * 100).toFixed(2);
    document.getElementById('chronicSalesContribution').value = ((chronicSalesValue / (cashsale + cardsale + creditsale)) * 100).toFixed(2);
    document.getElementById('helpSalesContribution').value = ((totalSales / (cashsale + cardsale + creditsale)) * 100).toFixed(2);
    document.getElementById('deliverySalesContribution').value = ((deliverySalesValue / (cashsale + cardsale + creditsale)) * 100).toFixed(2);
    document.getElementById('avgBillValue').value = (totalPrescriptions > 0 ? ((cashsale + cardsale + creditsale) / totalPrescriptions).toFixed(2) : 0);
    document.getElementById('cogsValue').value = cashsale + cardsale + creditsale;
    document.getElementById('stockHoldingDays').value = cogsValue > 0 ? (closingStockValue / cogsValue).toFixed(2) : 0;
    document.getElementById('ePrescriptionPercentage').value = (numEPrescriptions > 0 ? (ePrescriptionToInvoice / numEPrescriptions) * 100 : 0).toFixed(2);
    document.getElementById('manpowerVariance').value = manpowerActualsCount - manpowerBudget;
    document.getElementById('manpowerRevenuePerHead').value = manpowerActualsCount > 0 ? ((cashsale + cardsale + creditsale) / manpowerActualsCount).toFixed(2) : 0;
}

// Add event listeners for input fields
['newPatients', 'reviewPatients', 'cashSales', 'creditSales', 'cardSales', 'cashDiscount', 'creditDiscount', 'psale', 'fsale', 'plsale', 'ssale', 'Hsale', 'Vsale', 'ERTsale', 'IVFsale', 'pdpcDischarge', 'pdpcSalesValue', 'pdpcSalesContribution', 'chronicSalesValue', 'chronicSalesContribution', 'flotters', 'mposCount', 'mposSales', 'helpCounterSales', 'helpTotalSales', 'helpSalesContribution', 'counterCount', 'counterAddOnSales', 'doorDeliveries', 'deliverySalesValue', 'deliverySalesContribution', 'totalPrescriptions', 'avgBillValue', 'freeGoodsTransferValue', 'prevMonthBalance', 'freeGoodsSalesValue', 'liquidatePercentage', 'closingStockValue', 'cogsValue', 'stockHoldingDays', 'transferringQuantity', 'transferringValue', 'numEPrescriptions', 'ePrescriptionToInvoice', 'ePrescriptionPercentage', 'manpowerBudget', 'manpowerActualsCount'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateTotal);
});

// Fetch Site Information
function fetchSiteInfo() {
    const siteIdSelect = document.getElementById('siteId');
    const selectedSiteId = siteIdSelect.options[siteIdSelect.selectedIndex].value;

    const siteInfo = {
        "17822": "REHAB EXPERT PHARMACY",
        "14286": "ARAGONDA OP PHARMACY",
        "16755": "OP PHARMACY JUBILEEHILLS REHAB",
        "15268": "MAIN-OP PHARMACY CHENNAI",
        "18819": "WOMENS OP PHARMACY - 2",
        "13122": "KOLKATA OP PHARMACY",
        "13123": "DAYCARE PHARMACY KOLKATA",
        "15249": "SPECIALITY OP-II",
        "15726": "FIRST MED OP MADURAI",
        "17030": "SVP-OP PHARMACY-2(F1-B2)",
        "15992": "CHILD OP2 PHARMACY",
        "15933": "APOLLO SESHADRIPURAM OP",
        "15279": "MADURAI OP PHARMACY",
        "18218": "DIALYSIS CENTER OP PHARMACY",
        "14197": "CANCER OP - JUBILEE HILLS",
        "15430": "JAYANAGAR  BGLR OP PHARMACY",
        "15090": "FIRST MED OP CHENNAI",
        "15666": "INDORE OP PHARMACY",
        "15269": "SINDOORI-OP PHARMACY CHENNAI",
        "17033": "SVP-EMERGENCY PHARMACY(GF-A2)",
        "14219": "DRDO-OP PHARMACY",
        "14629": "SECUNDRABAD OP",
        "16973": "SPECIALITY OP-IV",
        "17161": "SVP-IP PHARMACY-3 (3-F CORE-3)",
        "17162": "SVP-IP PHARMACY-6 (6-F CORE-6)",
        "15977": "VIZAG HEALTH CITY OP PHARMACY",
        "18404": "HEALTHCITY ONCOLOGY OP PHARMACY",
        "17413": "OP PHARMACY ONCO BLOCK",
        "17160": "SVP-IP PHARMACY-2 (2-F CORE-2)",
        "17300": "NELLORE OP2 PHARMACY",
        "15573": "TRICHY OP PHARMACY",
        "11677": "OP PHARMACY NOIDA SEC-26",
        "16717": "APHC BLOCK PHARMACY",
        "14805": "INTERNATIONAL OP PHARMACY",
        "15082": "HYDERGUDA OP PHARMACY",
        "15763": "APOLLO LIFELINE OP PHARMACY",
        "15364": "AYANAMBAKKAM OP PHARMACY",
        "15978": "BANNERGATTA OP PHARMACY",
        "14228": "JUBILEE HILLS OP PHARMACY",
        "15116": "KARUR OP PHARMACY",
        "17425": "ADLUX COCHIN OP PHARMACY",
        "15284": "BGS MYSORE OP",
        "18802": "ROURKELA OP PHARMACY-1",
        "11763": "IMCL REHAB OP PHARMACY",
        "16334": "NAVI MUMBAI OP PHARMACY",
        "15745": "NELLORE OP PHARMACY",
        "15297": "OP PHARMACY BILASPUR",
        "14235": "KARIMNAGAR OP",
        "15714": "NASHIK OP PHARMACY",
        "11812": "OP PHARMACY INDORE ANNEX",
        "15564": "SPECIALITY OP-III",
        "15248": "SPECIALITY OP-I",
        "15513": "OP PHARMACY IMCL",
        "16994": "OP PHARMACY PROTON",
        "13124": "CANCER OP PHARMACY KOLKATA",
        "15232": "TONDAIRPET OP PHARMACY",
        "14203": "VIZAG OP PHARMACY",
        "15017": "BHUBANESWAR OP PHARMACY",
        "10041": "OP-PHARMACY NEW UNIT-II",
        "14201": "KAKINADA OP PHARMACY",
        "15247": "KARAIKUDI-OP PHARMACY",
        "18777": "APOLLO ONE OP PHARMACY",
        "13987": "RAIKVA OP PHARMACY"
    };

    const siteNameInput = document.getElementById('siteName');
    siteNameInput.value = siteInfo[selectedSiteId] || '';
}

// Confirm Details
function confirmDetails() {
    const dateValue = document.getElementById('date').value;
    const siteIdValue = document.getElementById('siteId').value;
    const siteNameValue = document.getElementById('siteName').value;

    if (dateValue && siteIdValue && siteNameValue) {
        const confirmation = confirm(`Are these details correct?\nDate: ${dateValue}\nSite ID: ${siteIdValue}\nSite Name: ${siteNameValue}`);

        if (confirmation) {
            displaySelectedInfo(dateValue, siteIdValue, siteNameValue);
        }
    } else {
        alert('Please fill in all mandatory fields.');
    }
}
