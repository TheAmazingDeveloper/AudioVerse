class CustomLogger {
  constructor(
    fileName = "(  )",
    title = "No title provided",
    message = "No message provided"
  ) {
    this.fileName = fileName;
    this.title = title;
    this.message = message;
  }
}

export default CustomLogger;
