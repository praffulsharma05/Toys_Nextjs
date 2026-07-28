import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ─── Project-wide Rules ──────────────────────────────────────────────
  {
    rules: {
      // ── React / JSX ───────────────────────────────────────────────────
      "react/forbid-dom-props": ["error", { "forbid": ["style"] }],
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",
      "react/no-children-prop": "error",
      "react/no-danger": "warn",
      "react/no-deprecated": "warn",
      "react/no-unescaped-entities": "warn",
      "react/self-closing-comp": ["warn", { "component": true, "html": true }],
      "react/jsx-boolean-value": ["warn", "never"],
      "react/jsx-curly-brace-presence": ["warn", { "props": "never", "children": "never" }],
      "react/jsx-fragments": ["warn", "syntax"],
      "react/jsx-no-target-blank": ["error", { "enforceDynamicLinks": "always" }],
      "react/jsx-no-useless-fragment": ["warn", { "allowExpressions": true }],
      "react/jsx-pascal-case": ["error", { "allowAllCaps": true }],
      "react/no-array-index-key": "warn",
      "react/no-unstable-nested-components": ["warn", { "allowAsProps": true }],
      "react/no-unknown-property": ["error", { "ignore": ["jsx", "global"] }],
      "react/void-dom-elements-no-children": "error",
      "react/no-string-refs": "error",
      "react/no-this-in-sfc": "error",
      "react/no-typos": "error",
      "react/no-direct-mutation-state": "error",
      "react/button-has-type": ["warn", { "reset": false }],

      // ── React Hooks ───────────────────────────────────────────────────
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ── Next.js ───────────────────────────────────────────────────────
      "@next/next/no-img-element": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-head-import-in-document": "error",

      // ── TypeScript ────────────────────────────────────────────────────
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/consistent-type-imports": ["warn", {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports",
      }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-useless-empty-export": "warn",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/ban-ts-comment": ["warn", {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": true,
        "ts-nocheck": true,
        "minimumDescriptionLength": 5,
      }],
      "@typescript-eslint/array-type": ["warn", { "default": "array" }],
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],

      // ── Import Hygiene ────────────────────────────────────────────────
      "no-duplicate-imports": "error",

      // ── Enforce Centralized Routes (custom restriction) ───────────────
      // Prevent hardcoded API / page routes in fetch() and router.push()
      "no-restricted-syntax": [
        "warn",
        {
          "selector": "CallExpression[callee.name='fetch'] > Literal[value=/^\\/api\\//]",
          "message": "Use API_ROUTES from '@/lib/apiRoutes' instead of hardcoded API paths.",
        },
        {
          "selector": "CallExpression[callee.name='fetch'] > TemplateLiteral > TemplateElement[value.raw=/\\/api\\//]",
          "message": "Use API_ROUTES from '@/lib/apiRoutes' instead of hardcoded API paths.",
        },
      ],

      // ── Possible Errors ───────────────────────────────────────────────
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "warn",
      "no-constant-condition": ["error", { "checkLoops": false }],
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": ["warn", { "allowEmptyCatch": true }],
      "no-extra-boolean-cast": "warn",
      "no-irregular-whitespace": "error",
      "no-loss-of-precision": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-optional-chaining": ["error", { "disallowArithmeticOperators": true }],
      "no-unused-private-class-members": "warn",
      "use-isnan": "error",
      "valid-typeof": "error",

      // ── Best Practices ────────────────────────────────────────────────
      "no-var": "error",
      "prefer-const": "warn",
      "prefer-template": "warn",
      "eqeqeq": ["error", "always", { "null": "ignore" }],
      "curly": ["warn", "multi-line"],
      "no-nested-ternary": "warn",
      "no-unneeded-ternary": "warn",
      "no-lonely-if": "warn",
      "no-else-return": ["warn", { "allowElseIf": false }],
      "no-useless-return": "warn",
      "no-throw-literal": "error",
      "no-self-compare": "error",
      "no-self-assign": "error",
      "no-template-curly-in-string": "warn",
      "no-implicit-coercion": ["warn", { "allow": ["!!"] }],
      "object-shorthand": ["warn", "always"],
      "arrow-body-style": ["warn", "as-needed"],
      "prefer-arrow-callback": ["warn", { "allowNamedFunctions": true }],
      "prefer-destructuring": ["warn", {
        "VariableDeclarator": { "array": false, "object": true },
        "AssignmentExpression": { "array": false, "object": false },
      }],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-extend-native": "error",
      "no-iterator": "error",
      "no-labels": "error",
      "no-lone-blocks": "warn",
      "no-loop-func": "warn",
      "no-multi-str": "warn",
      "no-new-wrappers": "error",
      "no-octal-escape": "error",
      "no-param-reassign": ["warn", { "props": false }],
      "no-proto": "error",
      "no-redeclare": "error",
      "no-return-assign": ["error", "except-parens"],
      "no-script-url": "error",
      "no-sequences": "error",
      "no-useless-call": "warn",
      "no-useless-concat": "warn",
      "no-useless-escape": "warn",
      "no-useless-rename": "warn",
      "no-useless-computed-key": "warn",
      "no-useless-constructor": "warn",
      "no-void": ["warn", { "allowAsStatement": true }],
      "no-with": "error",
      "prefer-object-spread": "warn",
      "prefer-rest-params": "warn",
      "prefer-spread": "warn",
      "radix": "warn",
      "symbol-description": "warn",
      "yoda": ["warn", "never"],
      "default-case-last": "warn",
      "grouped-accessor-pairs": ["warn", "getBeforeSet"],
      "no-constructor-return": "error",
      "no-promise-executor-return": "error",
      "no-unreachable-loop": "warn",
      "no-constant-binary-expression": "error",
      "no-new-native-nonconstructor": "error",
      "no-object-constructor": "warn",

      // ── Naming Conventions ────────────────────────────────────────────
      "camelcase": ["warn", {
        "properties": "never",
        "ignoreDestructuring": true,
        "ignoreImports": true,
        "ignoreGlobals": true,
      }],
      "new-cap": ["warn", { "newIsCap": true, "capIsNew": false }],
      "no-underscore-dangle": "off",

      // ── Security ──────────────────────────────────────────────────────
      "no-restricted-globals": [
        "error",
        { "name": "eval", "message": "Use of eval() is forbidden for security reasons." },
        { "name": "Function", "message": "Dynamic code generation via Function() is not allowed." },
      ],

      // ── Accessibility (JSX-a11y from next/core-web-vitals) ────────────
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/img-redundant-alt": "warn",
      "jsx-a11y/no-access-key": "warn",
      "jsx-a11y/tabindex-no-positive": "warn",
    },
  },

  // ─── Override: Allow console.log in API route handlers ──────────────
  {
    files: ["app/api/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },

  // ─── Override: Relax rules for seed / migration scripts ─────────────
  {
    files: ["prisma/**/*.ts", "scripts/**/*.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // ─── Override: Relax some rules for lib utility files ───────────────
  {
    files: ["lib/**/*.ts"],
    rules: {
      "no-console": ["warn", { "allow": ["warn", "error"] }],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
