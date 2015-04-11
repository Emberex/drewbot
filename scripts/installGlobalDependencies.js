require('package-script').spawn([
    {
        command: "npm",
        args: ["install", "-g", "grunt"]
    },
    {
        command: "npm",
        args: ["install", "-g", "grunt-cli"]
    },
    {
        command: "npm",
        args: ["install", "-g", "bower"]
    },
    {
        command: "npm",
        args: ["install", "-g", "express"]
    },
    {
        command: "npm",
        args: ["install", "-g", "nodemon"]
    }
]);