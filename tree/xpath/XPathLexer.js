// Generated from XPathLexer.g4 by ANTLR 4.6-SNAPSHOT
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
import { ATNDeserializer } from '../../atn/ATNDeserializer';
import { Lexer } from '../../Lexer';
import { LexerATNSimulator } from '../../atn/LexerATNSimulator';
import { NotNull } from '../../Decorators';
import { Override } from '../../Decorators';
import { VocabularyImpl } from '../../VocabularyImpl';
import * as Utils from '../../misc/Utils';
var XPathLexer = /** @class */ (function (_super) {
    __extends(XPathLexer, _super);
    function XPathLexer(input) {
        var _this = _super.call(this, input) || this;
        _this._interp = new LexerATNSimulator(XPathLexer._ATN, _this);
        return _this;
    }
    Object.defineProperty(XPathLexer.prototype, "vocabulary", {
        get: function () {
            return XPathLexer.VOCABULARY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XPathLexer.prototype, "grammarFileName", {
        get: function () { return "XPathLexer.g4"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XPathLexer.prototype, "ruleNames", {
        get: function () { return XPathLexer.ruleNames; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XPathLexer.prototype, "serializedATN", {
        get: function () { return XPathLexer._serializedATN; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XPathLexer.prototype, "modeNames", {
        get: function () { return XPathLexer.modeNames; },
        enumerable: true,
        configurable: true
    });
    XPathLexer.prototype.action = function (_localctx, ruleIndex, actionIndex) {
        switch (ruleIndex) {
            case 4:
                this.ID_action(_localctx, actionIndex);
                break;
        }
    };
    XPathLexer.prototype.ID_action = function (_localctx, actionIndex) {
        switch (actionIndex) {
            case 0:
                var text = this.text;
                if (text.charAt(0) === text.charAt(0).toUpperCase())
                    this.type = XPathLexer.TOKEN_REF;
                else
                    this.type = XPathLexer.RULE_REF;
                break;
        }
    };
    Object.defineProperty(XPathLexer, "_ATN", {
        get: function () {
            if (!XPathLexer.__ATN) {
                XPathLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(XPathLexer._serializedATN));
            }
            return XPathLexer.__ATN;
        },
        enumerable: true,
        configurable: true
    });
    XPathLexer.TOKEN_REF = 1;
    XPathLexer.RULE_REF = 2;
    XPathLexer.ANYWHERE = 3;
    XPathLexer.ROOT = 4;
    XPathLexer.WILDCARD = 5;
    XPathLexer.BANG = 6;
    XPathLexer.ID = 7;
    XPathLexer.STRING = 8;
    XPathLexer.modeNames = [
        "DEFAULT_MODE"
    ];
    XPathLexer.ruleNames = [
        "ANYWHERE", "ROOT", "WILDCARD", "BANG", "ID", "NameChar", "NameStartChar",
        "STRING"
    ];
    XPathLexer._LITERAL_NAMES = [
        undefined, undefined, undefined, "'//'", "'/'", "'*'", "'!'"
    ];
    XPathLexer._SYMBOLIC_NAMES = [
        undefined, "TOKEN_REF", "RULE_REF", "ANYWHERE", "ROOT", "WILDCARD", "BANG",
        "ID", "STRING"
    ];
    XPathLexer.VOCABULARY = new VocabularyImpl(XPathLexer._LITERAL_NAMES, XPathLexer._SYMBOLIC_NAMES, []);
    XPathLexer._serializedATN = "\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02\n4\b\x01\x04" +
        "\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
        "\x07\t\x07\x04\b\t\b\x04\t\t\t\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03" +
        "\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x07\x06\x1F\n\x06\f\x06" +
        "\x0E\x06\"\v\x06\x03\x06\x03\x06\x03\x07\x03\x07\x05\x07(\n\x07\x03\b" +
        "\x03\b\x03\t\x03\t\x07\t.\n\t\f\t\x0E\t1\v\t\x03\t\x03\t\x03/\x02\x02" +
        "\n\x03\x02\x05\x05\x02\x06\x07\x02\x07\t\x02\b\v\x02\t\r\x02\x02\x0F\x02" +
        "\x02\x11\x02\n\x03\x02\x04\x07\x022;aa\xB9\xB9\u0302\u0371\u2041\u2042" +
        "\x0F\x02C\\c|\xC2\xD8\xDA\xF8\xFA\u0301\u0372\u037F\u0381\u2001\u200E" +
        "\u200F\u2072\u2191\u2C02\u2FF1\u3003\uD801\uF902\uFDD1\uFDF2\uFFFF4\x02" +
        "\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02" +
        "\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x03\x13" +
        "\x03\x02\x02\x02\x05\x16\x03\x02\x02\x02\x07\x18\x03\x02\x02\x02\t\x1A" +
        "\x03\x02\x02\x02\v\x1C\x03\x02\x02\x02\r\'\x03\x02\x02\x02\x0F)\x03\x02" +
        "\x02\x02\x11+\x03\x02\x02\x02\x13\x14\x071\x02\x02\x14\x15\x071\x02\x02" +
        "\x15\x04\x03\x02\x02\x02\x16\x17\x071\x02\x02\x17\x06\x03\x02\x02\x02" +
        "\x18\x19\x07,\x02\x02\x19\b\x03\x02\x02\x02\x1A\x1B\x07#\x02\x02\x1B\n" +
        "\x03\x02\x02\x02\x1C \x05\x0F\b\x02\x1D\x1F\x05\r\x07\x02\x1E\x1D\x03" +
        "\x02\x02\x02\x1F\"\x03\x02\x02\x02 \x1E\x03\x02\x02\x02 !\x03\x02\x02" +
        "\x02!#\x03\x02\x02\x02\" \x03\x02\x02\x02#$\b\x06\x02\x02$\f\x03\x02\x02" +
        "\x02%(\x05\x0F\b\x02&(\t\x02\x02\x02\'%\x03\x02\x02\x02\'&\x03\x02\x02" +
        "\x02(\x0E\x03\x02\x02\x02)*\t\x03\x02\x02*\x10\x03\x02\x02\x02+/\x07)" +
        "\x02\x02,.\v\x02\x02\x02-,\x03\x02\x02\x02.1\x03\x02\x02\x02/0\x03\x02" +
        "\x02\x02/-\x03\x02\x02\x0202\x03\x02\x02\x021/\x03\x02\x02\x0223\x07)" +
        "\x02\x023\x12\x03\x02\x02\x02\x06\x02 \'/\x03\x03\x06\x02";
    __decorate([
        Override,
        NotNull
    ], XPathLexer.prototype, "vocabulary", null);
    __decorate([
        Override
    ], XPathLexer.prototype, "grammarFileName", null);
    __decorate([
        Override
    ], XPathLexer.prototype, "ruleNames", null);
    __decorate([
        Override
    ], XPathLexer.prototype, "serializedATN", null);
    __decorate([
        Override
    ], XPathLexer.prototype, "modeNames", null);
    __decorate([
        Override
    ], XPathLexer.prototype, "action", null);
    return XPathLexer;
}(Lexer));
export { XPathLexer };
//# sourceMappingURL=XPathLexer.js.map