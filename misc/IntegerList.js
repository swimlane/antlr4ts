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
// ConvertTo-TS run at 2016-10-04T11:26:40.5099429-07:00
import { Arrays } from './Arrays';
import { NotNull, Override } from '../Decorators';
var EMPTY_DATA = new Int32Array(0);
var INITIAL_SIZE = 4;
var MAX_ARRAY_SIZE = (((1 << 31) >>> 0) - 1) - 8;
/**
 *
 * @author Sam Harwell
 */
var IntegerList = /** @class */ (function () {
    function IntegerList(arg) {
        if (!arg) {
            this._data = EMPTY_DATA;
            this._size = 0;
        }
        else if (arg instanceof IntegerList) {
            this._data = arg._data.slice(0);
            this._size = arg._size;
        }
        else if (typeof arg === 'number') {
            if (arg === 0) {
                this._data = EMPTY_DATA;
                this._size = 0;
            }
            else {
                this._data = new Int32Array(arg);
                this._size = 0;
            }
        }
        else {
            // arg is Iterable<number>
            this._data = EMPTY_DATA;
            this._size = 0;
            for (var _i = 0, _a = Array.from(arg); _i < _a.length; _i++) {
                var value = _a[_i];
                this.add(value);
            }
        }
    }
    IntegerList.prototype.add = function (value) {
        if (this._data.length === this._size) {
            this.ensureCapacity(this._size + 1);
        }
        this._data[this._size] = value;
        this._size++;
    };
    IntegerList.prototype.addAll = function (list) {
        if (Array.isArray(list)) {
            this.ensureCapacity(this._size + list.length);
            this._data.subarray(this._size, this._size + list.length).set(list);
            this._size += list.length;
        }
        else if (list instanceof IntegerList) {
            this.ensureCapacity(this._size + list._size);
            this._data.subarray(this._size, this._size + list.size).set(list._data);
            this._size += list._size;
        }
        else {
            // list is JavaCollection<number>
            this.ensureCapacity(this._size + list.size);
            var current = 0;
            for (var xi = list.iterator(); xi.hasNext();) {
                this._data[this._size + current] = xi.next();
                current++;
            }
            this._size += list.size;
        }
    };
    IntegerList.prototype.get = function (index) {
        if (index < 0 || index >= this._size) {
            throw RangeError();
        }
        return this._data[index];
    };
    IntegerList.prototype.contains = function (value) {
        for (var i = 0; i < this._size; i++) {
            if (this._data[i] === value) {
                return true;
            }
        }
        return false;
    };
    IntegerList.prototype.set = function (index, value) {
        if (index < 0 || index >= this._size) {
            throw RangeError();
        }
        var previous = this._data[index];
        this._data[index] = value;
        return previous;
    };
    IntegerList.prototype.removeAt = function (index) {
        var value = this.get(index);
        this._data.copyWithin(index, index + 1, this._size);
        this._data[this._size - 1] = 0;
        this._size--;
        return value;
    };
    IntegerList.prototype.removeRange = function (fromIndex, toIndex) {
        if (fromIndex < 0 || toIndex < 0 || fromIndex > this._size || toIndex > this._size) {
            throw RangeError();
        }
        if (fromIndex > toIndex) {
            throw RangeError();
        }
        this._data.copyWithin(toIndex, fromIndex, this._size);
        this._data.fill(0, this._size - (toIndex - fromIndex), this._size);
        this._size -= (toIndex - fromIndex);
    };
    Object.defineProperty(IntegerList.prototype, "isEmpty", {
        get: function () {
            return this._size === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntegerList.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    IntegerList.prototype.trimToSize = function () {
        if (this._data.length === this._size) {
            return;
        }
        this._data = this._data.slice(0, this._size);
    };
    IntegerList.prototype.clear = function () {
        this._data.fill(0, 0, this._size);
        this._size = 0;
    };
    IntegerList.prototype.toArray = function () {
        if (this._size === 0) {
            return [];
        }
        return Array.from(this._data.subarray(0, this._size));
    };
    IntegerList.prototype.sort = function () {
        this._data.subarray(0, this._size).sort();
    };
    /**
     * Compares the specified object with this list for equality.  Returns
     * {@code true} if and only if the specified object is also an {@link IntegerList},
     * both lists have the same size, and all corresponding pairs of elements in
     * the two lists are equal.  In other words, two lists are defined to be
     * equal if they contain the same elements in the same order.
     * <p>
     * This implementation first checks if the specified object is this
     * list. If so, it returns {@code true}; if not, it checks if the
     * specified object is an {@link IntegerList}. If not, it returns {@code false};
     * if so, it checks the size of both lists. If the lists are not the same size,
     * it returns {@code false}; otherwise it iterates over both lists, comparing
     * corresponding pairs of elements.  If any comparison returns {@code false},
     * this method returns {@code false}.
     *
     * @param o the object to be compared for equality with this list
     * @return {@code true} if the specified object is equal to this list
     */
    IntegerList.prototype.equals = function (o) {
        if (o === this) {
            return true;
        }
        if (!(o instanceof IntegerList)) {
            return false;
        }
        if (this._size !== o._size) {
            return false;
        }
        for (var i = 0; i < this._size; i++) {
            if (this._data[i] !== o._data[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Returns the hash code value for this list.
     *
     * <p>This implementation uses exactly the code that is used to define the
     * list hash function in the documentation for the {@link List#hashCode}
     * method.</p>
     *
     * @return the hash code value for this list
     */
    IntegerList.prototype.hashCode = function () {
        var hashCode = 1;
        for (var i = 0; i < this._size; i++) {
            hashCode = 31 * hashCode + this._data[i];
        }
        return hashCode;
    };
    /**
     * Returns a string representation of this list.
     */
    IntegerList.prototype.toString = function () {
        return this._data.toString();
    };
    IntegerList.prototype.binarySearch = function (key, fromIndex, toIndex) {
        if (fromIndex === undefined) {
            fromIndex = 0;
        }
        if (toIndex === undefined) {
            toIndex = this._size;
        }
        if (fromIndex < 0 || toIndex < 0 || fromIndex > this._size || toIndex > this._size) {
            throw new RangeError();
        }
        if (fromIndex > toIndex) {
            throw new RangeError();
        }
        return Arrays.binarySearch(this._data, key, fromIndex, toIndex);
    };
    IntegerList.prototype.ensureCapacity = function (capacity) {
        if (capacity < 0 || capacity > MAX_ARRAY_SIZE) {
            throw new RangeError();
        }
        var newLength;
        if (this._data.length === 0) {
            newLength = INITIAL_SIZE;
        }
        else {
            newLength = this._data.length;
        }
        while (newLength < capacity) {
            newLength = newLength * 2;
            if (newLength < 0 || newLength > MAX_ARRAY_SIZE) {
                newLength = MAX_ARRAY_SIZE;
            }
        }
        var tmp = new Int32Array(newLength);
        tmp.set(this._data);
        this._data = tmp;
    };
    __decorate([
        NotNull
    ], IntegerList.prototype, "_data", void 0);
    __decorate([
        Override
    ], IntegerList.prototype, "equals", null);
    __decorate([
        Override
    ], IntegerList.prototype, "hashCode", null);
    __decorate([
        Override
    ], IntegerList.prototype, "toString", null);
    return IntegerList;
}());
export { IntegerList };
//# sourceMappingURL=IntegerList.js.map