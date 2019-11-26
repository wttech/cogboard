export function validateAemHealthcheck() {

};

export function validateBambooPlan() {

};

export function validateExample() {

};

export function validateIframeEmbed() {

};

export function validateJenkinsJob() {

};

export function validateServiceCheck() {

};

export function validateSonarQube() {

};

export function validateText() {

};

export function validateWorldClock() {

};

export function validateWidgetConfig(type = "Text") {
    if (type !== 'Default' && type !== 'Checkbox') {
        console.log(type)
        cy.get('[data-cy="widget-form-dynamic-tab"]')
            .click();
        switch(type) {
            case "AEM Healthcheck":
                validateAemHealthcheck();
                break;
            case "Bamboo Plan":
                validateBambooPlan();
                break;
            case "Example":
                validateExample();
                break;
            case "Iframe Embed":
                validateIframeEmbed();
                break;
            case "Jenkins Job":
                validateJenkinsJob();
                break;
            case "Service Check":
                validateServiceCheck();
                break;
            case "SonarQube":
                validateSonarQube();
                break;
            case "Text":
                validateText();
                break;
            case "World Clock":
                validateWorldClock();
                break;
            default:
                break;
        };
    };
};