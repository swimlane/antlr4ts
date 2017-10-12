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
import { Override, NotNull } from '../Decorators';
import { Transition } from './Transition';
/** */
var RuleTransition = /** @class */ (function (_super) {
    __extends(RuleTransition, _super);
    function RuleTransition(ruleStart, ruleIndex, precedence, followState) {
        var _this = _super.call(this, ruleStart) || this;
        _this.tailCall = false;
        _this.optimizedTailCall = false;
        _this.ruleIndex = ruleIndex;
        _this.precedence = precedence;
        _this.followState = followState;
        return _this;
    }
    Object.defineProperty(RuleTransition.prototype, "serializationType", {
        get: function () {
            return 3 /* RULE */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleTransition.prototype, "isEpsilon", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    RuleTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    };
    __decorate([
        NotNull
    ], RuleTransition.prototype, "followState", void 0);
    __decorate([
        Override
    ], RuleTransition.prototype, "serializationType", null);
    __decorate([
        Override
    ], RuleTransition.prototype, "isEpsilon", null);
    __decorate([
        Override
    ], RuleTransition.prototype, "matches", null);
    RuleTransition = __decorate([
        __param(0, NotNull), __param(3, NotNull)
    ], RuleTransition);
    return RuleTransition;
}(Transition));
export { RuleTransition };
//# sourceMappingURL=RuleTransition.js.map