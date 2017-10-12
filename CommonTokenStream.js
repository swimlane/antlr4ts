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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// ConvertTo-TS run at 2016-10-04T11:26:50.3953157-07:00
import { BufferedTokenStream } from './BufferedTokenStream';
import { NotNull, Override } from './Decorators';
import { Token } from './Token';
/**
 * This class extends {@link BufferedTokenStream} with functionality to filter
 * token streams to tokens on a particular channel (tokens where
 * {@link Token#getChannel} returns a particular value).
 *
 * <p>
 * This token stream provides access to all tokens by index or when calling
 * methods like {@link #getText}. The channel filtering is only used for code
 * accessing tokens via the lookahead methods {@link #LA}, {@link #LT}, and
 * {@link #LB}.</p>
 *
 * <p>
 * By default, tokens are placed on the default channel
 * ({@link Token#DEFAULT_CHANNEL}), but may be reassigned by using the
 * {@code ->channel(HIDDEN)} lexer command, or by using an embedded action to
 * call {@link Lexer#setChannel}.
 * </p>
 *
 * <p>
 * Note: lexer rules which use the {@code ->skip} lexer command or call
 * {@link Lexer#skip} do not produce tokens at all, so input text matched by
 * such a rule will not be available as part of the token stream, regardless of
 * channel.</p>
 */
var CommonTokenStream = /** @class */ (function (_super) {
    __extends(CommonTokenStream, _super);
    /**
     * Constructs a new {@link CommonTokenStream} using the specified token
     * source and filtering tokens to the specified channel. Only tokens whose
     * {@link Token#getChannel} matches {@code channel} or have the
     * `Token.type` equal to {@link Token#EOF} will be returned by the
     * token stream lookahead methods.
     *
     * @param tokenSource The token source.
     * @param channel The channel to use for filtering tokens.
     */
    function CommonTokenStream(tokenSource, channel) {
        if (channel === void 0) { channel = Token.DEFAULT_CHANNEL; }
        var _this = _super.call(this, tokenSource) || this;
        _this.channel = channel;
        return _this;
    }
    CommonTokenStream.prototype.adjustSeekIndex = function (i) {
        return this.nextTokenOnChannel(i, this.channel);
    };
    CommonTokenStream.prototype.tryLB = function (k) {
        if ((this.p - k) < 0) {
            return undefined;
        }
        var i = this.p;
        var n = 1;
        // find k good tokens looking backwards
        while (n <= k && i > 0) {
            // skip off-channel tokens
            i = this.previousTokenOnChannel(i - 1, this.channel);
            n++;
        }
        if (i < 0) {
            return undefined;
        }
        return this.tokens[i];
    };
    CommonTokenStream.prototype.tryLT = function (k) {
        //System.out.println("enter LT("+k+")");
        this.lazyInit();
        if (k === 0) {
            throw new RangeError("0 is not a valid lookahead index");
        }
        if (k < 0) {
            return this.tryLB(-k);
        }
        var i = this.p;
        var n = 1; // we know tokens[p] is a good one
        // find k good tokens
        while (n < k) {
            // skip off-channel tokens, but make sure to not look past EOF
            if (this.sync(i + 1)) {
                i = this.nextTokenOnChannel(i + 1, this.channel);
            }
            n++;
        }
        //		if ( i>range ) range = i;
        return this.tokens[i];
    };
    /** Count EOF just once. */
    CommonTokenStream.prototype.getNumberOfOnChannelTokens = function () {
        var n = 0;
        this.fill();
        for (var i = 0; i < this.tokens.length; i++) {
            var t = this.tokens[i];
            if (t.channel === this.channel) {
                n++;
            }
            if (t.type === Token.EOF) {
                break;
            }
        }
        return n;
    };
    __decorate([
        Override
    ], CommonTokenStream.prototype, "adjustSeekIndex", null);
    __decorate([
        Override
    ], CommonTokenStream.prototype, "tryLB", null);
    __decorate([
        Override
    ], CommonTokenStream.prototype, "tryLT", null);
    CommonTokenStream = __decorate([
        __param(0, NotNull)
    ], CommonTokenStream);
    return CommonTokenStream;
}(BufferedTokenStream));
export { CommonTokenStream };
//# sourceMappingURL=CommonTokenStream.js.map