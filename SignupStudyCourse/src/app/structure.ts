export class Structure {
    // Due to these variables is static variable, we can use
    // them directly whenever we import Structure class in
    // any TypeScript file

    static showHomepage = true;
    static showAbout = false;
    static showSupport = false;
    static showCourses = false;
    static showLogin = false;
    static showSignup = false;

    // Login status
    static isLoggedIn = false;
    static isLoggedOut = true;

    // Initialize the variables as default value
    constructor() {
        Structure.showHomepage = true;
        Structure.showAbout = false;
        Structure.showSupport = false;
        Structure.showCourses = false;
        Structure.isLoggedIn = false;
        Structure.showLogin = false;
        Structure.showSignup = false;
        Structure.isLoggedOut = true;
    }
}