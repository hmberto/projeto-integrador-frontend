interface String {
    lpad(padString: string, length: number): string;

    rpad(padString: string, length: number): string;

    trim(): string;

    ltrim(): string;

    rtrim(): string;

    clearTokens(): string;

    removeFullStops(): string;
}

/**
 * Pads the left-side of the string
 *
 * @param {string} padString String to be padded to the left
 * @param {number} length Number of characters to return
 * @return {string} Padded string
 */
String.prototype.lpad = function(padString: string, length: number): string {
    let str: string = this;
    while (str.length < length) {
        str = padString + str;
    }
    return str;
};

/**
 * Pads the right-side of the string
 *
 * @param {string} padString String to be padded to the right
 * @param {number} length Number of characters to return
 * @return {string} Padded string
 */
String.prototype.rpad = function(padString: string, length: number): string {
    let str: string = this;
    while (str.length < length) {
        str = str + padString;
    }
    return str;
};

/**
 * Trims the string
 *
 * @return {string} trimmed string
 */
String.prototype.trim = function(): string {
    let str: string = this;
    return str.replace(/^\s+|\s+$/g, '');
};

/**
 * Left trims the string
 *
 * @return {string} trimmed string
 */
String.prototype.ltrim = function(): string {
    let str: string = this;
    return str.replace(/^\s+/, '');
};

/**
 * Right trims the string
 *
 * @return {string} trimmed string
 */
String.prototype.rtrim = function(): string {
    return this.replace(/\s+$/, '');
};

/**
 * Clear defined tokens on string
 *
 * @return {string} string without defined tokens
 */
String.prototype.clearTokens = function(): string {
    const tokens = [
        [/\\r?\\n/g, ''],
        [/\\s\+(((?!\\s-).)*)(\\s-)?/g, '$1'],
        [/\\b\+(((?!\\b-).)*)(\\b-)?/g, '$1'],
        [
            /\\fsize(\+|-)(\d{3})(((?!\\fsize(?!\1)(\+|-)).)*)(\\fsize(?!\1)(\+|-))?/g,
            '$3'
        ],
        [/\\n/g, ' '],
        [/\\r/g, ''],
        [/\\t/g, ''],
        [/\\c/g, ''],
        [/\\s/g, ' ']
    ];

    let str: string = this;
    for (let index = 0, length = tokens.length; index < length; index++) {
        const element = tokens[index];
        str = str.replace(element[0], element[1].toString());
    }

    return str.trim();
};

interface StringConstructor {
    compositeFormat(text: string, ...args: any[]): string;

    isNullOrWhitespace(text: string): boolean;
}

String.compositeFormat = function(text: string, ...args: any[]): string {
    let formattedText = text.replace(/{(\d+)}/g, (token, matchIndex) => {
        return typeof args[matchIndex] !== 'undefined'
            ? args[matchIndex]
            : token;
    });

    return formattedText;
};

String.isNullOrWhitespace = function(text: string): boolean {
    return typeof text !== 'string' || text.trim().length === 0;
};

/**
 * Removes full stops from text
 *
 * @returns {string} string without full stops.
 */
String.prototype.removeFullStops = function(): string {
    return this.replace(/(\.)$/g, '');
};
