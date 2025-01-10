/**
 * @file app.js
 * @date 2024-11-24
 * @author Skyann Heintz
 * @description 
 *
*/
'use strict';

window.addEventListener("load", initialize, false);


// GLOBAL VARIABLES AND CONSTANTS
var yourInfoFormValid = false; // has the form been validated
var contactInfoFormValid = false; // has the form been validated
var educationInfoFormValid = false;
var jobInfoFormValid = false;

var applicationData = {}; // object to hold event data

/**
 * Get everything set up to handle the page functionality.
 */
function initialize() {

    /**
     * Add SmartMenu functionality
     * Not covered in this lab but good to have
     */
    $(".sm").smartmenus({
        showFunction: function ($ul, complete) {
            $ul.slideDown(250, complete);
        },
        hideFunction: function ($ul, complete) {
            $ul.slideUp(250, complete);
        }
    });


    /**
     * Create the success dialog for later
     */
    $("#successDialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 500
        },
        hide: {
            effect: "explode",
            duration: 1000
        }

    }); // end dialog


    /**
     * Set up the accordion
     */
    $("#accordion").accordion(
        {
            disable: [1,2],
            active: 0,
            heightStyle: 'content',
            collapsible: false,
            icons: {
                header: 'ui-icon-circle-plus',
                activeHeader: 'ui-icon-circle-minus'
            },
        
        beforeActivate: function(evt, ui)
        {
            const currentIndex = $("#accordion").accordion("option", "active");
            const nextIndex = currentIndex +1;
            if(currentIndex === 0 && !yourInfoFormValid){
                evt.preventDefault();
            }else if (currentIndex === 1 && !contactInfoFormValid){
                evt.preventDefault();
            } else if (currentIndex === 2 && !educationInfoFormValid){
                evt.preventDefault();
            } else if (currentIndex === 3 && !jobInfoFormValid){
                evt.preventDefault();
            }
        }
        }); // end accordion


    /**
     * Start validation for the yourInfoForm (first form panel)
     */
    $("#yourInfoForm").validate({
        rules: {
            lastName: "required",
            firstName: "required",
            dob: "required"
            
        },
        messages:{
            lastName: "Please enter your last name",
            firstName: "Please enter your first name",
            dob: "Please enter your date of birth"
        }
    }); // end yourInfoForm Validation
    $("#yourInfoFormButton").button().click(function(){
        if($("#yourInfoForm").valid()){
            yourInfoFormValid = true;
            // Add the fields to the event data object
            applicationData.lastName = $("#lastName").val();
            applicationData.firstName = $("#firstName").val();
            applicationData.dob = $("#dob").val();
            // Move to the next form
            $("#accordion").accordion("option", "active", 1)
        }
    }); // end yourInfoFormButton click

    /**
     * Start validation for eventInfoForm (second form panel)
     */
    $("#contactInfoForm").validate({
        rules: {
            address: "required",
            city: "required",
            state: "required",
            zip: "required",
            email:{
                required: true,
                email: true
            },  
            phone: {
                required: true,
                phoneUS: true // requires jQuery Additional Methods
            }     
        },
        messages:{
            address: "Please enter a street address",
            city: "Please enter a city",
            state: "Please enter a state",
            zip: "Please enter a zipcode",
            email:{
                required: "Please enter your email address",
                email: "The email address is not formed correctly"
            },
            phone: {
                required: "Please enter your phone number",
                phoneUS: "Phone number is not formed correctly" 
            }   
        }
    }); // end contactInfoForm Validation
    $("#contactInfoFormButton").button().click(function(){
        if($("#contactInfoForm").valid()){
            contactInfoFormValid= true;
            // Store the values to the event data object
            applicationData.address = $("#address").val();
            applicationData.city = $("#city").val();
            applicationData.state = $("#state").val();
            applicationData.zip = $("#zip").val();
            applicationData.email = $("#email").val();
            applicationData.state = $("#phone").val();
            // Switch to next panel
            $("#accordion").accordion("option", "active", 2)
        }
    }); // end yourInfoFormButton click

    $("contactInfoBackButton").button().click(function(){
        $("#accordion").accordion("option", "active", 0)
    }); 

    $("#educationInfoForm").validate({
        rules: {
            levelEducation: "required",
            schoolName: "required",
            graduationYear: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages:{
            levelEducation: "Please enter your highest level of education",
            schoolName: "Please enter your school name",
            graduationYear: {
                required: "Please enter your graduation year",
                digits: "Graduation year must be a 4-digit number",
                minlength: "Graduation year must be a 4-digit number",
                maxlength: "Graduation year must be a 4-digit number"
            }
        }
    }); // end educationInfoForm Validation


    $("#educationInfoFormButton").button().click(function () {
        if ($("#educationInfoForm").valid()) {
            educationInfoFormValid = true;
            // Store the values to the event data object
            applicationData.levelEducation = $("#levelEducation").val();
            applicationData.schoolName = $("#schoolName").val();
            applicationData.graduationYear = $("#graduationYear").val();
            $("#accordion").accordion("option", "active", 3)
        }
    }); // end educationInfoFormButton click


    $("#jobInfoForm").validate({
        rules: {
            title1: "required",
            employer1: "required",
            startDate1: "required",
            endDate1: "required",
            description1: "required"
            },
        messages:{
            title1: "Please enter your job title",
            employer1: "Please enter the name of your employer",
            startDate1: "Please enter your start date",
            endDate1: "Please enter your end date",
            description1: "Please enter a description" 
        }
    }); // end jobInfoForm Validation

    $("#jobInfoFormButton").button().click(function () {
        if ($("#jobInfoForm").valid()) {
            jobInfoFormValid = true;
            // Store the values to the event data object
            applicationData.title1 = $("#title1").val();
            applicationData.employer1 = $("#employer1").val();
            applicationData.startDate1 = $("#startDate1").val();
            applicationData.endDate1 = $("#endDate1").val();
            applicationData.description1 = $("#description1").val();
            $("#accordion").accordion("option", "active", 4)
        }
    }); // end educationInfoFormButton click


/* Submit button tab 5*/

    $("#confirmNextButton").button().click(function(){
        // show the success dialog
        $("#successDialog").dialog("open")
    }); // end confirmationBackButton click

}



