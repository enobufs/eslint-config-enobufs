'use strict';

var linter = require("eslint").linter;
var defaults = linter.defaults();
var CLIEngine = require("eslint").CLIEngine;
var config = require("..");
var _ = require('lodash');
var assert = require('assert');


describe('eslint rule tests', function () {
    var envs;
    var rules;
    var cli;

    function verify(ruleId, severity, lines) {
        var report = cli.executeOnText(lines.join('\n'));
        console.log('report:', require('util').inspect(report, { depth:null }));
        var ok = false;
        report.results.forEach(function (res) {
            res.messages.forEach(function (msg) {
                if (msg.ruleId === ruleId) {
                    assert.equal(msg.severity, severity);
                    ok = true;
                }
            });
        });
        if (severity === 0) {
            assert(!ok); // should have no report
        } else {
            assert(ok);
        }
    }

    before(function () {
        envs = Object.keys(config.env).filter(function (key) {
            return (config.env[key]);
        });
        //console.log('envs:', envs);
        rules = _.extend(defaults.rules, config.rules);
        //console.log('rules:', rules);
        cli = new CLIEngine({
            envs: envs,
            useEslintrc: false,
            rules: rules
        });
    });

    it('arrow-parens', function () {
        verify('arrow-parens', 2, [
            "void(res => { void(res); });"
        ]);
    });

    it('arrow-spacing', function () {
        verify('arrow-spacing', 2, [
            "void((res)=> { void(res); });"
        ]);
        verify('arrow-spacing', 2, [
            "void((res) =>{ void(res); });"
        ]);
    });

    it('callback-return', function () {
        verify('callback-return', 2, [
            "void(function fn(cb) {",
            "    var a = 1;",
            "    if (a === 0) {",
            "        cb(new Error('err'));",
            "    }",
            "});"
        ]);
    });

    it('camelcase', function () {
        verify('camelcase', 2, [
            "var foo_bar;",
            "void(foo_bar);"
        ]);
    });

    it('comma-dangle', function () {
        verify('comma-dangle', 0, [
            "void({",
            "    a: 1,",
            "    b: 2,",
            "});"
        ]);
    });

    it('comma-spacing', function () {
        verify('comma-spacing', 2, [
            "[1 , 2]"
        ]);
        verify('comma-spacing', 2, [
            "[1,2]"
        ]);
    });

    it('eqeqeq', function () {
        verify('eqeqeq', 2, [
            "var a = 0;",
            "(a == 4);"
        ]);
        verify('eqeqeq', 2, [
            "var a = 0;",
            "(a != 3);"
        ]);
    });

    it('indent', function () {
        verify('indent', 2, [
            "var a = 0;",
            "if (!a) {",
            "  void 0;",
            "}"
        ]);
    });

    it('linebreak-style', function () {
        verify('linebreak-style', 2, [
            "var a = 0;\r",
            "void a;"
        ]);
    });

    it('max-len', function () {
        verify('max-len', 2, [
            "/* Hey, Jude, don't make it bad. Take a sad song and make it better. Remember to let her into your heart. Then you can start to make it better. */" // eslint-disable-line max-len
        ]);
    });

    it('no-console', function () {
        verify('no-console', 2, [
            "console.log('hi');"
        ]);
    });

    it('no-extra-boolean-cast', function () {
        verify('no-extra-boolean-cast', 0, [
            "function test(a) { return !!a; }",
            "void(test(1));"
        ]);
    });

    it('no-new', function () {
        verify('no-new', 2, [
            "new Date();"
        ]);
    });

    it('no-restricted-globals', function () {
        verify('no-restricted-globals', 2, [
            "void(Promise.resolved());"
        ]);
    });

    it('no-spaced-func', function () {
        verify('no-spaced-func', 2, [
            "JSON.stringify ({});"
        ]);
    });

    it('no-trailing-spaces', function () {
        verify('no-trailing-spaces', 2, [
            "void 0; "
        ]);
    });

    it('no-unused-vars', function () {
        verify('no-unused-vars', 2, [
            // test if arg2 is checked
            "function add(arg1, arg2) {",
            "    return arg1 + arg1;", // bug
            "}",
            "void(add(1, 2));"
        ]);
        verify('no-unused-vars', 2, [
            // test if arg1 is checked
            "function add(arg1, arg2) {",
            "    return arg2 + arg2;", // bug
            "}",
            "void(add(1, 2));"
        ]);
    });

    it('no-use-before-define', function () {
        verify('no-use-before-define', 2, [
            "function test() { return a; }",
            "var a = 1;",
            "void(test());"
        ]);
    });

    it('quotes', function () {
        verify('quotes', 0, [
            "\"foo\";",
            "'bar';"
        ]);
    });

    it('semi', function () {
        verify('semi', 2, [
            "void 0"
        ]);
    });

    it('keyword-spacing', function () {
        verify('keyword-spacing', 2, [
            "var a = 1;",
            "if(a) { a++; }"
        ]);
    });

    it('keyword-spacing 2', function () {
        verify('keyword-spacing', 2, [
            "function test() { return(true); };",
            "void(test());"
        ]);
    });

    it('space-before-blocks', function () {
        verify('space-before-blocks', 2, [
            "var a = 1;",
            "if (a){ a++; }"
        ]);
    });

    it('space-before-function-paren', function () {
        verify('space-before-function-paren', 2, [
            "var f = function() { return 0; };",
            "void(f);"
        ]);
    });

    it('space-infix-ops', function () {
        verify('space-infix-ops', 2, [
            "void(2+3)"
        ]);
        verify('space-infix-ops', 2, [
            "var a = 5;",
            "void(a< 5)"
        ]);
    });
});
