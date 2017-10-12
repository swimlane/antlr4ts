/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NotNull, Override } from '../../Decorators';
import { Token } from '../../Token';
/**
 * A {@link Token} object representing an entire subtree matched by a parser
 * rule; e.g., {@code <expr>}. These tokens are created for {@link TagChunk}
 * chunks where the tag corresponds to a parser rule.
 */
var RuleTagToken = /** @class */ (function () {
    /**
     * Constructs a new instance of {@link RuleTagToken} with the specified rule
     * name, bypass token type, and label.
     *
     * @param ruleName The name of the parser rule this rule tag matches.
     * @param bypassTokenType The bypass token type assigned to the parser rule.
     * @param label The label associated with the rule tag, or {@code null} if
     * the rule tag is unlabeled.
     *
     * @exception IllegalArgumentException if {@code ruleName} is {@code null}
     * or empty.
     */
    function RuleTagToken(ruleName, bypassTokenType, label) {
        if (ruleName == null || ruleName.length === 0) {
            throw new Error("ruleName cannot be null or empty.");
        }
        this._ruleName = ruleName;
        this.bypassTokenType = bypassTokenType;
        this._label = label;
    }
    Object.defineProperty(RuleTagToken.prototype, "ruleName", {
        /**
         * Gets the name of the rule associated with this rule tag.
         *
         * @return The name of the parser rule associated with this rule tag.
         */
        get: function () {
            return this._ruleName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "label", {
        /**
         * Gets the label associated with the rule tag.
         *
         * @return The name of the label associated with the rule tag, or
         * {@code null} if this is an unlabeled rule tag.
         */
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "channel", {
        /**
         * {@inheritDoc}
         *
         * <p>Rule tag tokens are always placed on the {@link #DEFAULT_CHANNEL}.</p>
         */
        get: function () {
            return Token.DEFAULT_CHANNEL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "text", {
        /**
         * {@inheritDoc}
         *
         * <p>This method returns the rule tag formatted with {@code <} and {@code >}
         * delimiters.</p>
         */
        get: function () {
            if (this._label != null) {
                return "<" + this._label + ":" + this._ruleName + ">";
            }
            return "<" + this._ruleName + ">";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "type", {
        /**
         * {@inheritDoc}
         *
         * <p>Rule tag tokens have types assigned according to the rule bypass
         * transitions created during ATN deserialization.</p>
         */
        get: function () {
            return this.bypassTokenType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "line", {
        /**
         * {@inheritDoc}
         *
         * <p>The implementation for {@link RuleTagToken} always returns 0.</p>
         */
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "charPositionInLine", {
        /**
         * {@inheritDoc}
         *
         * <p>The implementation for {@link RuleTagToken} always returns -1.</p>
         */
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "tokenIndex", {
        /**
         * {@inheritDoc}
         *
         * <p>The implementation for {@link RuleTagToken} always returns -1.</p>
         */
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "startIndex", {
        /**
         * {@inheritDoc}
         *
         * <p>The implementation for {@link RuleTagToken} always returns -1.</p>
         */
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "stopIndex", {
        /**
         * {@inheritDoc}
         *
         * <p>The implementation for {@link RuleTagToken} always returns -1.</p>
         */
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "tokenSource", {
        /**
         * {@inheritDoc}
         *
         * <p>The implementation for {@link RuleTagToken} always returns {@code null}.</p>
         */
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTagToken.prototype, "inputStream", {
        /**
         * {@inheritDoc}
         *
         * <p>The implementation for {@link RuleTagToken} always returns {@code null}.</p>
         */
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * {@inheritDoc}
     *
     * <p>The implementation for {@link RuleTagToken} returns a string of the form
     * {@code ruleName:bypassTokenType}.</p>
     */
    RuleTagToken.prototype.toString = function () {
        return this._ruleName + ":" + this.bypassTokenType;
    };
    __decorate([
        NotNull
    ], RuleTagToken.prototype, "ruleName", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "channel", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "text", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "type", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "line", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "charPositionInLine", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "tokenIndex", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "startIndex", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "stopIndex", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "tokenSource", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "inputStream", null);
    __decorate([
        Override
    ], RuleTagToken.prototype, "toString", null);
    RuleTagToken = __decorate([
        __param(0, NotNull)
    ], RuleTagToken);
    return RuleTagToken;
}());
export { RuleTagToken };
//# sourceMappingURL=RuleTagToken.js.map