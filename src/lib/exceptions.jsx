export class Exception extends Error {
    constructor(message = "Something went wrong", code = 500) {
        super(message);
        this.code = code;
    }
}


export class BadRequest extends Exception {
    constructor(message = "Bad request", code = 400) {
        super(message, code);
    }
}


export class ServerException extends Exception {
    constructor(message = "Internal Server Error", code = 500) {
        super(message, code);
    }
}

export class TimeoutException extends Exception {
    constructor(message = "Request timeout, please try again.", code = 408) {
        super(message, code);
    }
}

export class RatelimitException extends Exception {
    constructor(message = "Too many requests, try again later.", code = 429) {
        super(message, code);
    }
}


export class ClientException extends Exception {
    constructor(message = "Instagram Client Exception", code = 400) {
        super(message, code);
    }
}