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
// ConvertTo-TS run at 2016-10-04T11:26:58.1768850-07:00
import { Interval } from './misc/Interval';
import { Override } from './Decorators';
import { Token } from './Token';
/**
 * Useful for rewriting out a buffered input token stream after doing some
 * augmentation or other manipulations on it.
 *
 * <p>
 * You can insert stuff, replace, and delete chunks. Note that the operations
 * are done lazily--only if you convert the buffer to a {@link String} with
 * {@link TokenStream#getText()}. This is very efficient because you are not
 * moving data around all the time. As the buffer of tokens is converted to
 * strings, the {@link #getText()} method(s) scan the input token stream and
 * check to see if there is an operation at the current index. If so, the
 * operation is done and then normal {@link String} rendering continues on the
 * buffer. This is like having multiple Turing machine instruction streams
 * (programs) operating on a single input tape. :)</p>
 *
 * <p>
 * This rewriter makes no modifications to the token stream. It does not ask the
 * stream to fill itself up nor does it advance the input cursor. The token
 * stream `TokenStream.index` will return the same value before and
 * after any {@link #getText()} call.</p>
 *
 * <p>
 * The rewriter only works on tokens that you have in the buffer and ignores the
 * current input cursor. If you are buffering tokens on-demand, calling
 * {@link #getText()} halfway through the input will only do rewrites for those
 * tokens in the first half of the file.</p>
 *
 * <p>
 * Since the operations are done lazily at {@link #getText}-time, operations do
 * not screw up the token index values. That is, an insert operation at token
 * index {@code i} does not change the index values for tokens
 * {@code i}+1..n-1.</p>
 *
 * <p>
 * Because operations never actually alter the buffer, you may always get the
 * original token stream back without undoing anything. Since the instructions
 * are queued up, you can easily simulate transactions and roll back any changes
 * if there is an error just by removing instructions. For example,</p>
 *
 * <pre>
 * CharStream input = new ANTLRFileStream("input");
 * TLexer lex = new TLexer(input);
 * CommonTokenStream tokens = new CommonTokenStream(lex);
 * T parser = new T(tokens);
 * TokenStreamRewriter rewriter = new TokenStreamRewriter(tokens);
 * parser.startRule();
 * </pre>
 *
 * <p>
 * Then in the rules, you can execute (assuming rewriter is visible):</p>
 *
 * <pre>
 * Token t,u;
 * ...
 * rewriter.insertAfter(t, "text to put after t");}
 * rewriter.insertAfter(u, "text after u");}
 * System.out.println(rewriter.getText());
 * </pre>
 *
 * <p>
 * You can also have multiple "instruction streams" and get multiple rewrites
 * from a single pass over the input. Just name the instruction streams and use
 * that name again when printing the buffer. This could be useful for generating
 * a C file and also its header file--all from the same buffer:</p>
 *
 * <pre>
 * rewriter.insertAfter("pass1", t, "text to put after t");}
 * rewriter.insertAfter("pass2", u, "text after u");}
 * System.out.println(rewriter.getText("pass1"));
 * System.out.println(rewriter.getText("pass2"));
 * </pre>
 *
 * <p>
 * If you don't use named rewrite streams, a "default" stream is used as the
 * first example shows.</p>
 */
var TokenStreamRewriter = /** @class */ (function () {
    function TokenStreamRewriter(tokens) {
        this.tokens = tokens;
        this.programs = new Map();
        this.programs.set(TokenStreamRewriter.DEFAULT_PROGRAM_NAME, []);
        this.lastRewriteTokenIndexes = new Map();
    }
    TokenStreamRewriter.prototype.getTokenStream = function () {
        return this.tokens;
    };
    TokenStreamRewriter.prototype.rollback = function (instructionIndex, programName) {
        if (programName === void 0) { programName = TokenStreamRewriter.DEFAULT_PROGRAM_NAME; }
        var is = this.programs.get(programName);
        if (is != null) {
            this.programs.set(programName, is.slice(TokenStreamRewriter.MIN_TOKEN_INDEX, instructionIndex));
        }
    };
    TokenStreamRewriter.prototype.deleteProgram = function (programName) {
        if (programName === void 0) { programName = TokenStreamRewriter.DEFAULT_PROGRAM_NAME; }
        this.rollback(TokenStreamRewriter.MIN_TOKEN_INDEX, programName);
    };
    TokenStreamRewriter.prototype.insertAfter = function (tokenOrIndex, text, programName) {
        if (programName === void 0) { programName = TokenStreamRewriter.DEFAULT_PROGRAM_NAME; }
        var index;
        if (typeof tokenOrIndex === 'number') {
            index = tokenOrIndex;
        }
        else {
            index = tokenOrIndex.tokenIndex;
        }
        // to insert after, just insert before next index (even if past end)
        var op = new InsertAfterOp(this.tokens, index, text);
        var rewrites = this.getProgram(programName);
        op.instructionIndex = rewrites.length;
        rewrites.push(op);
    };
    TokenStreamRewriter.prototype.insertBefore = function (tokenOrIndex, text, programName) {
        if (programName === void 0) { programName = TokenStreamRewriter.DEFAULT_PROGRAM_NAME; }
        var index;
        if (typeof tokenOrIndex === 'number') {
            index = tokenOrIndex;
        }
        else {
            index = tokenOrIndex.tokenIndex;
        }
        var op = new InsertBeforeOp(this.tokens, index, text);
        var rewrites = this.getProgram(programName);
        op.instructionIndex = rewrites.length;
        rewrites.push(op);
    };
    TokenStreamRewriter.prototype.replaceSingle = function (index, text) {
        if (typeof index === 'number') {
            this.replace(index, index, text);
        }
        else {
            this.replace(index, index, text);
        }
    };
    TokenStreamRewriter.prototype.replace = function (from, to, text, programName) {
        if (programName === void 0) { programName = TokenStreamRewriter.DEFAULT_PROGRAM_NAME; }
        if (typeof from !== 'number') {
            from = from.tokenIndex;
        }
        if (typeof to !== 'number') {
            to = to.tokenIndex;
        }
        if (from > to || from < 0 || to < 0 || to >= this.tokens.size) {
            throw new RangeError("replace: range invalid: " + from + ".." + to + "(size=" + this.tokens.size + ")");
        }
        var op = new ReplaceOp(this.tokens, from, to, text);
        var rewrites = this.getProgram(programName);
        op.instructionIndex = rewrites.length;
        rewrites.push(op);
    };
    TokenStreamRewriter.prototype.delete = function (from, to, programName) {
        if (programName === void 0) { programName = TokenStreamRewriter.DEFAULT_PROGRAM_NAME; }
        if (to === undefined) {
            to = from;
        }
        if (typeof from === 'number') {
            this.replace(from, to, undefined, programName);
        }
        else {
            this.replace(from, to, undefined, programName);
        }
    };
    TokenStreamRewriter.prototype.getLastRewriteTokenIndex = function (programName) {
        if (programName === void 0) { programName = TokenStreamRewriter.DEFAULT_PROGRAM_NAME; }
        var I = this.lastRewriteTokenIndexes.get(programName);
        if (I == null) {
            return -1;
        }
        return I;
    };
    TokenStreamRewriter.prototype.setLastRewriteTokenIndex = function (programName, i) {
        this.lastRewriteTokenIndexes.set(programName, i);
    };
    TokenStreamRewriter.prototype.getProgram = function (name) {
        var is = this.programs.get(name);
        if (is == null) {
            is = this.initializeProgram(name);
        }
        return is;
    };
    TokenStreamRewriter.prototype.initializeProgram = function (name) {
        var is = [];
        this.programs.set(name, is);
        return is;
    };
    TokenStreamRewriter.prototype.getText = function (intervalOrProgram, programName) {
        if (programName === void 0) { programName = TokenStreamRewriter.DEFAULT_PROGRAM_NAME; }
        var interval;
        if (intervalOrProgram instanceof Interval) {
            interval = intervalOrProgram;
        }
        else {
            interval = Interval.of(0, this.tokens.size - 1);
        }
        if (typeof intervalOrProgram === 'string') {
            programName = intervalOrProgram;
        }
        var rewrites = this.programs.get(programName);
        var start = interval.a;
        var stop = interval.b;
        // ensure start/end are in range
        if (stop > this.tokens.size - 1)
            stop = this.tokens.size - 1;
        if (start < 0)
            start = 0;
        if (rewrites == null || rewrites.length === 0) {
            return this.tokens.getText(interval); // no instructions to execute
        }
        var buf = [];
        // First, optimize instruction stream
        var indexToOp = this.reduceToSingleOperationPerIndex(rewrites);
        // Walk buffer, executing instructions and emitting tokens
        var i = start;
        while (i <= stop && i < this.tokens.size) {
            var op = indexToOp.get(i);
            indexToOp.delete(i); // remove so any left have index size-1
            var t = this.tokens.get(i);
            if (op == null) {
                // no operation at that index, just dump token
                if (t.type !== Token.EOF)
                    buf.push(String(t.text));
                i++; // move to next token
            }
            else {
                i = op.execute(buf); // execute operation and skip
            }
        }
        // include stuff after end if it's last index in buffer
        // So, if they did an insertAfter(lastValidIndex, "foo"), include
        // foo if end==lastValidIndex.
        if (stop === this.tokens.size - 1) {
            // Scan any remaining operations after last token
            // should be included (they will be inserts).
            for (var _i = 0, _a = Array.from(indexToOp.values()); _i < _a.length; _i++) {
                var op = _a[_i];
                if (op.index >= this.tokens.size - 1)
                    buf += op.text;
            }
        }
        return buf.join("");
    };
    /** We need to combine operations and report invalid operations (like
     *  overlapping replaces that are not completed nested). Inserts to
     *  same index need to be combined etc...  Here are the cases:
     *
     *  I.i.u I.j.v                leave alone, nonoverlapping
     *  I.i.u I.i.v                combine: Iivu
     *
     *  R.i-j.u R.x-y.v  | i-j in x-y      delete first R
     *  R.i-j.u R.i-j.v              delete first R
     *  R.i-j.u R.x-y.v  | x-y in i-j      ERROR
     *  R.i-j.u R.x-y.v  | boundaries overlap  ERROR
     *
     *  Delete special case of replace (text==null):
     *  D.i-j.u D.x-y.v  | boundaries overlap  combine to max(min)..max(right)
     *
     *  I.i.u R.x-y.v | i in (x+1)-y      delete I (since insert before
     *                      we're not deleting i)
     *  I.i.u R.x-y.v | i not in (x+1)-y    leave alone, nonoverlapping
     *  R.x-y.v I.i.u | i in x-y        ERROR
     *  R.x-y.v I.x.u               R.x-y.uv (combine, delete I)
     *  R.x-y.v I.i.u | i not in x-y      leave alone, nonoverlapping
     *
     *  I.i.u = insert u before op @ index i
     *  R.x-y.u = replace x-y indexed tokens with u
     *
     *  First we need to examine replaces. For any replace op:
     *
     *     1. wipe out any insertions before op within that range.
     *    2. Drop any replace op before that is contained completely within
     *   that range.
     *    3. Throw exception upon boundary overlap with any previous replace.
     *
     *  Then we can deal with inserts:
     *
     *     1. for any inserts to same index, combine even if not adjacent.
     *     2. for any prior replace with same left boundary, combine this
     *   insert with replace and delete this replace.
     *     3. throw exception if index in same range as previous replace
     *
     *  Don't actually delete; make op null in list. Easier to walk list.
     *  Later we can throw as we add to index &rarr; op map.
     *
     *  Note that I.2 R.2-2 will wipe out I.2 even though, technically, the
     *  inserted stuff would be before the replace range. But, if you
     *  add tokens in front of a method body '{' and then delete the method
     *  body, I think the stuff before the '{' you added should disappear too.
     *
     *  Return a map from token index to operation.
     */
    TokenStreamRewriter.prototype.reduceToSingleOperationPerIndex = function (rewrites) {
        // console.log(`rewrites=[${Utils.join(rewrites, ", ")}]`);
        // WALK REPLACES
        for (var i = 0; i < rewrites.length; i++) {
            var op = rewrites[i];
            if (op == null)
                continue;
            if (!(op instanceof ReplaceOp))
                continue;
            var rop = op;
            // Wipe prior inserts within range
            var inserts = this.getKindOfOps(rewrites, InsertBeforeOp, i);
            for (var _i = 0, inserts_1 = inserts; _i < inserts_1.length; _i++) {
                var iop = inserts_1[_i];
                if (iop.index == rop.index) {
                    // E.g., insert before 2, delete 2..2; update replace
                    // text to include insert before, kill insert
                    rewrites[iop.instructionIndex] = undefined;
                    rop.text = iop.text.toString() + (rop.text != null ? rop.text.toString() : "");
                }
                else if (iop.index > rop.index && iop.index <= rop.lastIndex) {
                    // delete insert as it's a no-op.
                    rewrites[iop.instructionIndex] = undefined;
                }
            }
            // Drop any prior replaces contained within
            var prevReplaces = this.getKindOfOps(rewrites, ReplaceOp, i);
            for (var _a = 0, prevReplaces_1 = prevReplaces; _a < prevReplaces_1.length; _a++) {
                var prevRop = prevReplaces_1[_a];
                if (prevRop.index >= rop.index && prevRop.lastIndex <= rop.lastIndex) {
                    // delete replace as it's a no-op.
                    rewrites[prevRop.instructionIndex] = undefined;
                    continue;
                }
                // throw exception unless disjoint or identical
                var disjoint = prevRop.lastIndex < rop.index || prevRop.index > rop.lastIndex;
                // Delete special case of replace (text==null):
                // D.i-j.u D.x-y.v  | boundaries overlap  combine to max(min)..max(right)
                if (prevRop.text == null && rop.text == null && !disjoint) {
                    // console.log(`overlapping deletes: ${prevRop}, ${rop}`);
                    rewrites[prevRop.instructionIndex] = undefined; // kill first delete
                    rop.index = Math.min(prevRop.index, rop.index);
                    rop.lastIndex = Math.max(prevRop.lastIndex, rop.lastIndex);
                    // console.log(`new rop ${rop}`);
                }
                else if (!disjoint) {
                    throw new Error("replace op boundaries of " + rop + " overlap with previous " + prevRop);
                }
            }
        }
        // WALK INSERTS
        for (var i = 0; i < rewrites.length; i++) {
            var op = rewrites[i];
            if (op == null)
                continue;
            if (!(op instanceof InsertBeforeOp))
                continue;
            var iop = op;
            // combine current insert with prior if any at same index
            var prevInserts = this.getKindOfOps(rewrites, InsertBeforeOp, i);
            for (var _b = 0, prevInserts_1 = prevInserts; _b < prevInserts_1.length; _b++) {
                var prevIop = prevInserts_1[_b];
                if (prevIop.index === iop.index) {
                    if (prevIop instanceof InsertAfterOp) {
                        iop.text = this.catOpText(prevIop.text, iop.text);
                        rewrites[prevIop.instructionIndex] = undefined;
                    }
                    else if (prevIop instanceof InsertBeforeOp) {
                        // convert to strings...we're in process of toString'ing
                        // whole token buffer so no lazy eval issue with any templates
                        iop.text = this.catOpText(iop.text, prevIop.text);
                        // delete redundant prior insert
                        rewrites[prevIop.instructionIndex] = undefined;
                    }
                }
            }
            // look for replaces where iop.index is in range; error
            var prevReplaces = this.getKindOfOps(rewrites, ReplaceOp, i);
            for (var _c = 0, prevReplaces_2 = prevReplaces; _c < prevReplaces_2.length; _c++) {
                var rop = prevReplaces_2[_c];
                if (iop.index == rop.index) {
                    rop.text = this.catOpText(iop.text, rop.text);
                    rewrites[i] = undefined; // delete current insert
                    continue;
                }
                if (iop.index >= rop.index && iop.index <= rop.lastIndex) {
                    throw new Error("insert op " + iop + " within boundaries of previous " + rop);
                }
            }
        }
        // console.log(`rewrites after=[${Utils.join(rewrites, ", ")}]`);
        var m = new Map();
        for (var i = 0; i < rewrites.length; i++) {
            var op = rewrites[i];
            if (op == null)
                continue; // ignore deleted ops
            if (m.get(op.index) != null) {
                throw new Error("should only be one op per index");
            }
            m.set(op.index, op);
        }
        // console.log(`index to op: ${m}`);
        return m;
    };
    TokenStreamRewriter.prototype.catOpText = function (a, b) {
        var x = "";
        var y = "";
        if (a != null)
            x = a.toString();
        if (b != null)
            y = b.toString();
        return x + y;
    };
    /** Get all operations before an index of a particular kind */
    TokenStreamRewriter.prototype.getKindOfOps = function (rewrites, kind, before) {
        var ops = [];
        for (var i = 0; i < before && i < rewrites.length; i++) {
            var op = rewrites[i];
            if (op == null)
                continue; // ignore deleted
            if (op instanceof kind) {
                ops.push(op);
            }
        }
        return ops;
    };
    TokenStreamRewriter.DEFAULT_PROGRAM_NAME = "default";
    TokenStreamRewriter.PROGRAM_INIT_SIZE = 100;
    TokenStreamRewriter.MIN_TOKEN_INDEX = 0;
    return TokenStreamRewriter;
}());
export { TokenStreamRewriter };
// Define the rewrite operation hierarchy
var RewriteOperation = /** @class */ (function () {
    function RewriteOperation(tokens, index, text) {
        this.tokens = tokens;
        this.index = index;
        this.text = text;
    }
    /** Execute the rewrite operation by possibly adding to the buffer.
     *  Return the index of the next token to operate on.
     */
    RewriteOperation.prototype.execute = function (buf) {
        return this.index;
    };
    RewriteOperation.prototype.toString = function () {
        var opName = this.constructor.name;
        var $index = opName.indexOf('$');
        opName = opName.substring($index + 1, opName.length);
        return "<" + opName + "@" + this.tokens.get(this.index) +
            ":\"" + this.text + "\">";
    };
    __decorate([
        Override
    ], RewriteOperation.prototype, "toString", null);
    return RewriteOperation;
}());
export { RewriteOperation };
var InsertBeforeOp = /** @class */ (function (_super) {
    __extends(InsertBeforeOp, _super);
    function InsertBeforeOp(tokens, index, text) {
        return _super.call(this, tokens, index, text) || this;
    }
    InsertBeforeOp.prototype.execute = function (buf) {
        buf.push(this.text);
        if (this.tokens.get(this.index).type !== Token.EOF) {
            buf.push(String(this.tokens.get(this.index).text));
        }
        return this.index + 1;
    };
    __decorate([
        Override
    ], InsertBeforeOp.prototype, "execute", null);
    return InsertBeforeOp;
}(RewriteOperation));
/** Distinguish between insert after/before to do the "insert afters"
 *  first and then the "insert befores" at same index. Implementation
 *  of "insert after" is "insert before index+1".
 */
var InsertAfterOp = /** @class */ (function (_super) {
    __extends(InsertAfterOp, _super);
    function InsertAfterOp(tokens, index, text) {
        return _super.call(this, tokens, index + 1, text) || this;
    }
    return InsertAfterOp;
}(InsertBeforeOp));
/** I'm going to try replacing range from x..y with (y-x)+1 ReplaceOp
 *  instructions.
 */
var ReplaceOp = /** @class */ (function (_super) {
    __extends(ReplaceOp, _super);
    function ReplaceOp(tokens, from, to, text) {
        var _this = _super.call(this, tokens, from, text) || this;
        _this.lastIndex = to;
        return _this;
    }
    ReplaceOp.prototype.execute = function (buf) {
        if (this.text != null) {
            buf.push(this.text);
        }
        return this.lastIndex + 1;
    };
    ReplaceOp.prototype.toString = function () {
        if (this.text == null) {
            return "<DeleteOp@" + this.tokens.get(this.index) +
                ".." + this.tokens.get(this.lastIndex) + ">";
        }
        return "<ReplaceOp@" + this.tokens.get(this.index) +
            ".." + this.tokens.get(this.lastIndex) + ":\"" + this.text + "\">";
    };
    __decorate([
        Override
    ], ReplaceOp.prototype, "execute", null);
    __decorate([
        Override
    ], ReplaceOp.prototype, "toString", null);
    return ReplaceOp;
}(RewriteOperation));
//# sourceMappingURL=TokenStreamRewriter.js.map