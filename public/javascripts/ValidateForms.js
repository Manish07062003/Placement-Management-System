(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

const erDiv = document.querySelector("#experience_range_div");
const erFrom = document.querySelector("#experience_from");
const erTo = document.querySelector("#experience_to");
const esDiv = document.querySelector("#experience_single_div");
const esInput = document.querySelector("#experience");
document.querySelector("#experience_switch").addEventListener("change", function () {
    if (erDiv.style.display != "none") {
        erFrom.value = "";
        erTo.value = "";
        erDiv.style.display = "none";
        esDiv.style.display = "block";
    } else {
        esInput.value = "";
        esDiv.style.display = "none";
        erDiv.style.display = "block";
    }
})


const srDiv = document.querySelector("#salary_range_div");
const ssDiv = document.querySelector("#salary_single_div");
const srFrom = document.querySelector("#salary_from");
const srTo = document.querySelector("#salary_to");
const ssInput = document.querySelector("#salary");
document.querySelector("#salary_switch").addEventListener("change", function () {
    if (srDiv.style.display != "none") {
        srDiv.style.display = "none";
        srFrom.value = "";
        srTo.value = "";
        ssDiv.style.display = "block";
    } else {
        ssInput.value = "";
        ssDiv.style.display = "none";
        srDiv.style.display = "block";
    }
})



const arDiv = document.querySelector("#age_range_div");
const asDiv = document.querySelector("#age_single_div");
const arFrom = document.querySelector("#age_from");
const arTo = document.querySelector("#age_to");
const asInput = document.querySelector("#age");
document.querySelector("#age_switch").addEventListener("change", function () {
    if (arDiv.style.display != "none") {
        arFrom.value = "";
        arTo.value = "";
        arDiv.style.display = "none";
        asDiv.style.display = "block";
    } else {
        asInput.value = "";
        asDiv.style.display = "none";
        arDiv.style.display = "block";
    }
})


function check_password() {
    if (document.querySelector("#password").value !== document.querySelector("#confirm_password").value) {
        document.querySelector("#password_match_div").innerText = "Password Did Not Match";
        document.querySelector("#password_match_div").classList.add = "invalid-feedback";
    } else {
        document.querySelector("#password_match_div").innerText = "";
        document.querySelector.classList.add = "valid-feedback";
    }
}