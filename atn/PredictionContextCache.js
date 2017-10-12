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
// ConvertTo-TS run at 2016-10-04T11:26:35.6390614-07:00
import { Array2DHashMap } from '../misc/Array2DHashMap';
import { Override } from "../Decorators";
import { ObjectEqualityComparator } from '../misc/ObjectEqualityComparator';
import { PredictionContext } from './PredictionContext';
import * as assert from 'assert';
/** Used to cache {@link PredictionContext} objects. Its used for the shared
 *  context cash associated with contexts in DFA states. This cache
 *  can be used for both lexers and parsers.
 *
 * @author Sam Harwell
 */
var PredictionContextCache = /** @class */ (function () {
    function PredictionContextCache(enableCache) {
        if (enableCache === void 0) { enableCache = true; }
        this.contexts = new Array2DHashMap(ObjectEqualityComparator.INSTANCE);
        this.childContexts = new Array2DHashMap(ObjectEqualityComparator.INSTANCE);
        this.joinContexts = new Array2DHashMap(ObjectEqualityComparator.INSTANCE);
        this.enableCache = enableCache;
    }
    PredictionContextCache.prototype.getAsCached = function (context) {
        if (!this.enableCache) {
            return context;
        }
        var result = this.contexts.get(context);
        if (!result) {
            result = context;
            this.contexts.put(context, context);
        }
        return result;
    };
    PredictionContextCache.prototype.getChild = function (context, invokingState) {
        if (!this.enableCache) {
            return context.getChild(invokingState);
        }
        var operands = new PredictionContextCache.PredictionContextAndInt(context, invokingState);
        var result = this.childContexts.get(operands);
        if (!result) {
            result = context.getChild(invokingState);
            result = this.getAsCached(result);
            this.childContexts.put(operands, result);
        }
        return result;
    };
    PredictionContextCache.prototype.join = function (x, y) {
        if (!this.enableCache) {
            return PredictionContext.join(x, y, this);
        }
        var operands = new PredictionContextCache.IdentityCommutativePredictionContextOperands(x, y);
        var result = this.joinContexts.get(operands);
        if (result) {
            return result;
        }
        result = PredictionContext.join(x, y, this);
        result = this.getAsCached(result);
        this.joinContexts.put(operands, result);
        return result;
    };
    PredictionContextCache.UNCACHED = new PredictionContextCache(false);
    return PredictionContextCache;
}());
export { PredictionContextCache };
(function (PredictionContextCache) {
    var PredictionContextAndInt = /** @class */ (function () {
        function PredictionContextAndInt(obj, value) {
            this.obj = obj;
            this.value = value;
        }
        PredictionContextAndInt.prototype.equals = function (obj) {
            if (!(obj instanceof PredictionContextAndInt)) {
                return false;
            }
            else if (obj == this) {
                return true;
            }
            var other = obj;
            return this.value === other.value
                && (this.obj === other.obj || (this.obj != null && this.obj.equals(other.obj)));
        };
        PredictionContextAndInt.prototype.hashCode = function () {
            var hashCode = 5;
            hashCode = 7 * hashCode + (this.obj != null ? this.obj.hashCode() : 0);
            hashCode = 7 * hashCode + this.value;
            return hashCode;
        };
        __decorate([
            Override
        ], PredictionContextAndInt.prototype, "equals", null);
        __decorate([
            Override
        ], PredictionContextAndInt.prototype, "hashCode", null);
        return PredictionContextAndInt;
    }());
    PredictionContextCache.PredictionContextAndInt = PredictionContextAndInt;
    var IdentityCommutativePredictionContextOperands = /** @class */ (function () {
        function IdentityCommutativePredictionContextOperands(x, y) {
            assert(x != null);
            assert(y != null);
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(IdentityCommutativePredictionContextOperands.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IdentityCommutativePredictionContextOperands.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        IdentityCommutativePredictionContextOperands.prototype.equals = function (o) {
            if (!(o instanceof IdentityCommutativePredictionContextOperands)) {
                return false;
            }
            else if (this === o) {
                return true;
            }
            var other = o;
            return (this._x === other._x && this._y === other._y) || (this._x === other._y && this._y === other._x);
        };
        IdentityCommutativePredictionContextOperands.prototype.hashCode = function () {
            return this._x.hashCode() ^ this._y.hashCode();
        };
        __decorate([
            Override
        ], IdentityCommutativePredictionContextOperands.prototype, "equals", null);
        __decorate([
            Override
        ], IdentityCommutativePredictionContextOperands.prototype, "hashCode", null);
        return IdentityCommutativePredictionContextOperands;
    }());
    PredictionContextCache.IdentityCommutativePredictionContextOperands = IdentityCommutativePredictionContextOperands;
})(PredictionContextCache || (PredictionContextCache = {}));
//# sourceMappingURL=PredictionContextCache.js.map