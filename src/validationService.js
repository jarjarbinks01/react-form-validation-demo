/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var service;
(function (service) {
    class ValidationService {
        demoValidation(contact) {
            const errorMsg = ({});
            if (contact.get("first").length < 2) {
                /* put */ (errorMsg["first"] = "First name must be at least 2 characters");
            }
            if (contact.get("last").length < 2) {
                /* put */ (errorMsg["last"] = "Last name must be at least 2 characters");
            }
            if (!((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(contact.get("avatar"), ".jpg")) {
                /* put */ (errorMsg["avatar"] = "Avatar must be a valid JPG");
            }
            if (!(contact.get("email").indexOf("@") != -1)) {
                /* put */ (errorMsg["email"] = "That doesn\'t look like an email address");
            }
            return errorMsg;
        }
    }
    service.ValidationService = ValidationService;
    ValidationService["__class"] = "service.ValidationService";
})(service || (service = {}));

export default service;