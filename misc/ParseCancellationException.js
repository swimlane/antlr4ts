/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ConvertTo-TS run at 2016-10-04T11:26:42.5447085-07:00
/**
 * This exception is thrown to cancel a parsing operation. This exception does
 * not extend {@link RecognitionException}, allowing it to bypass the standard
 * error recovery mechanisms. {@link BailErrorStrategy} throws this exception in
 * response to a parse error.
 *
 * @author Sam Harwell
 */
var ParseCancellationException = /** @class */ (function (_super) {
    __extends(ParseCancellationException, _super);
    function ParseCancellationException(cause) {
        var _this = _super.call(this, cause.message) || this;
        _this.cause = cause;
        _this.stack = cause.stack;
        return _this;
    }
    ParseCancellationException.prototype.getCause = function () {
        return this.cause;
    };
    return ParseCancellationException;
}(Error));
export { ParseCancellationException };
//# sourceMappingURL=ParseCancellationException.js.map