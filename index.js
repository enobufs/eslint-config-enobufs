'use strict';

module.exports = {
    "rules": {
        "arrow-parens": ["error", "always"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "callback-return": ["error", ["callback", "cb", "next", "done"]],
        "camelcase": ["error", {"properties": "never"}],
        "comma-dangle": "off",
        "comma-spacing": ["error", {"before": false, "after": true}],
        "eqeqeq": [ "error", "smart" ],
        "indent": [ "error", 4, { "SwitchCase": 1 } ],
        "linebreak-style": [ "error", "unix" ],
        "max-len": ["error", 120, 4],
        "no-extra-boolean-cast": ["off"],
        "no-new": "error",
        "no-restricted-globals": ["error", "Promise"],
        "no-spaced-func": ["error"],
        "no-trailing-spaces": ["error"],
        "no-unused-vars": ["error", {"args": "all"}],
        "no-use-before-define": ["error", "nofunc"],
        "quotes": [ "off", "single" ],
        "semi": [ "error", "always" ],
        "keyword-spacing": ["error", { "before": true, "after": true }],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", {"anonymous": "always", "named": "never"}],
        "space-infix-ops": "error"
    },
    "env": {
        "es6": true,
        "mocha": true,
        "node": true,
        "mongo": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "ecmaVersion": 6
        }
    },
    "extends": "eslint:recommended"
};

