(function() {
  var jQuery;
  var serverDomain = 'http://localhost:3002';
  var options = {};
  var indifiToken = null;
  var container;
  var css = '<style> .indifi-widget-body {}'
  +' .indifi-widget-body .field {width:50%; float:left;}'
  +' .indifi-widget-body .margin10 {margin: 5px 10px 0px 10px;}'
  +' .indifi-widget-body .field-name { color: #7f7f7f; font-size: 13px;font-family: Sans-Serif; }'
  +' .indifi-widget-body .field .error { color:red; font-size: 12px;font-family: Sans-Serif;}'
  +' .indifi-widget-body .hidden { visibility: hidden; }'
  +' .indifi-widget-body .field .field-value .input{ line-height: 20px; width: 95%;font-family: Sans-Serif;padding: 2px 5px;}'
  +' .indifi-widget-body .submit{ clear: both; text-align: center;}'
  +' .indifi-widget-body .submit .button{-moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; background: #00a2da; color: #fff;text-transform: uppercase;outline: none;border: 0;  line-height: 26px; width: 150px; text-align: center; text-transform: uppercase;font-size: 14px; cursor: pointer;}'
  +'</style>';
  
  function init() {
      var script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js");
      (document.getElementsByTagName("head")[0]).appendChild(script_tag);
      if (script_tag.attachEvent) {
        script_tag.onreadystatechange = function() { // for IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            this.onreadystatechange = null;
            scriptLoadHandler();
          }
        };
      } else {
        script_tag.onload = scriptLoadHandler;
      }
  }
  function scriptLoadHandler() {
    jQuery = window.jQuery.noConflict();
    main();
  }
  function main() {
    jQuery(document).ready(function() {
      jQuery(css).appendTo("head");
      if (jQuery(container).size() === 0) {
        jQuery('body').append('<div class="indifi-widget-body"></div>');
      }
      getToken();
    });
  }
  function getToken(){
    jQuery.ajax({
      url: serverDomain + '/auth/token', 
      contentType: "application/json; charset=utf-8",
      type:  'POST', 
      data: JSON.stringify({
        'grant_type' : 'client_credentials',
        'client_id': options.client_id
      }),
      success: function(data) {
        if(data.data.token) {
          indifiToken = data.data.token;
          render();
        } else {
          unautherizedError();
        }
      }, 
      error: function(xhr, status, error) {
        unautherizedError();
      }
    })
  }
  function render() {
    var markup = '<div>'
      +'<div class="field"><div class="margin10 business-name"><div class="field-name"> Business Name*</div><div class="field-value"><input class="input" type="text" name="businessname"/></div><div class="error hidden">Required!</div></div></div>'
      +'<div class="field"><div class="margin10 email"><div class="field-name"> Email* </div><div class="field-value"><input type="text" class="input" name="email"/></div><div class="error hidden">Required!</div></div></div>'
      +'<div class="field"><div class="margin10 contact-person-first-name"><div class="field-name"> Contact Person First Name* </div><div class="field-value"><input type="text" class="input" name="contactpersonfirstname"/></div><div class="error hidden">Required!</div></div></div>'
      +'<div class="field"><div class="margin10 contact-person-last-name"><div class="field-name"> Contact Person Last Name </div><div class="field-value"><input type="text" class="input" name="contactpersonlastname"/></div><div class="error hidden">Required!</div></div></div>'
      +'<div class="field"><div class="margin10 contact-person-phone"><div class="field-name"> Phone Number*</div><div class="field-value"><input type="text" class="input" name="phonenumber"/></div><div class="error hidden">Required!</div></div></div>'
      +'<div class="field"><div class="margin10 city"><div class="field-name"> City*</div><div class="field-value"><input type="text" class="input" name="city"/></div><div class="error hidden">Required!</div></div></div>'
      +'<div class="field"><div class="margin10 loan-amount"><div class="field-name"> Loan Amount*</div><div class="field-value"><input type="text" class="input" name="loanamount"/></div><div class="error hidden">Required!</div></div></div>'
      +'<div class="submit"><div class=""><input class="button" style="'+options.submit_button_css+'" type="button" value="'+options.submit_button_text+'" /></div>'
    +'</div>';
    jQuery(container).append(markup);
    jQuery(container + ' .button').click(handleClick);
  }
  function unautherizedError(){
    var markup = '<div class="unautherized-error">'
      +'Permision denied.'
    +'</div>';
    jQuery(container).append(markup);

  }
  function operationSuccessed(){
    var markup = '<div class="sucess-message">'
      +'Thanks for submitting this form.'
    +'</div>';
    jQuery(container).html(markup);

  }
  function operationFailed(){
    var markup = '<div class="failure-message">'
      +'Operation failed. Please try again.'
    +'</div>';
    jQuery(container).append(markup);

  }
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function validatePhone(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  }
  function validateAmount(amount) {
    var re = /^(0|[1-9][0-9]*)$/;
    return re.test(amount);
  }
  
  function handleClick() {
    
    var businessName = jQuery(container + ' .business-name .field-value .input').val();
    var email = jQuery(container + ' .email .field-value .input').val();
    var firstName = jQuery(container + ' .contact-person-first-name .field-value .input').val();
    var lastName = jQuery(container + ' .contact-person-last-name .field-value .input').val();
    var phone = jQuery(container + ' .contact-person-phone .field-value .input').val();
    var city = jQuery(container + ' .city .field-value .input').val();
    var loanAmount = jQuery(container + ' .loan-amount .field-value .input').val();
    var requiredMsg = 'This is required!';
    var isValid = true;
    jQuery(container + ' .field .error').addClass('hidden');

    if(!businessName.trim()){
      isValid = false;
      jQuery(container + ' .business-name .error').removeClass('hidden').html(requiredMsg);
    }
    if(!email.trim()){
      isValid = false;
      jQuery(container + ' .email .error').removeClass('hidden').html(requiredMsg);
    }else if(!validateEmail(email.trim())){
        isValid = false;
        jQuery(container + ' .email .error').removeClass('hidden').html("Invalid email!");
    }
    if(!firstName.trim()){
      isValid = false;
      jQuery(container + ' .contact-person-first-name .error').removeClass('hidden').html(requiredMsg);
    }
    if(!phone.trim()){
      isValid = false;
      jQuery(container + ' .contact-person-phone .error').removeClass('hidden').html(requiredMsg);
    }else if(!validatePhone(phone.trim())){
      isValid = false;
      jQuery(container + ' .contact-person-phone .error').removeClass('hidden').html("Invalid phone number!");
    }
    if(!city.trim()){
      isValid = false;
      jQuery(container + ' .city .error').removeClass('hidden').html(requiredMsg);
    }
    if(!loanAmount.trim()){
      isValid = false;
      jQuery(container + ' .loan-amount .error').removeClass('hidden').html(requiredMsg);
    }else if(!validateAmount(loanAmount.trim())){
      isValid = false;
      jQuery(container + ' .loan-amount .error').removeClass('hidden').html("Invalid amount!");
    }
    if(!isValid){return;}

    jQuery.ajax({
      url: serverDomain + '/zoho/createLead', 
      contentType: "application/json; charset=utf-8",
      headers: { 'Authorization' : 'Bearer ' + indifiToken },
      type:  'POST', 
      data: JSON.stringify({
        'application' : {
          'anchor': 'BrownTape',
          'amount': loanAmount
        },
        'business_entity':  {
          'type': 'business',
          'name': businessName,
          'primary_contact': {
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'phone': phone,
          },
          'primary_address': {
            'city': city
          },
          'details': {
            'user_name': options.user_name,
            'password': options.password,
            'token': options.token
          }
        }, 
        'db' : 'az'
      }),
      success: function(data) {
        if(data.success) {
          operationSuccessed();
        } else {
          operationFailed();
        }
      }, 
      error: function(xhr, status, error) {
        operationFailed();
      }
    })
  }
  if (!window.IndifiJS){
    window.IndifiJS = {};
  }
  IndifiJS.Widget = function(opts) {
    options = opts;
    container = '.indifi-widget-body';
    init();
  };
})();