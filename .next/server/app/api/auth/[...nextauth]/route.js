"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=%2FUsers%2Fsk3tch%2FDocuments%2FGitHub%2Fneedlekvlt-website%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsk3tch%2FDocuments%2FGitHub%2Fneedlekvlt-website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=%2FUsers%2Fsk3tch%2FDocuments%2FGitHub%2Fneedlekvlt-website%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsk3tch%2FDocuments%2FGitHub%2Fneedlekvlt-website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sk3tch_Documents_GitHub_needlekvlt_website_src_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.js */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/Users/sk3tch/Documents/GitHub/needlekvlt-website/src/app/api/auth/[...nextauth]/route.js\",\n    nextConfigOutput,\n    userland: _Users_sk3tch_Documents_GitHub_needlekvlt_website_src_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRnNrM3RjaCUyRkRvY3VtZW50cyUyRkdpdEh1YiUyRm5lZWRsZWt2bHQtd2Vic2l0ZSUyRnNyYyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZzazN0Y2glMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZuZWVkbGVrdmx0LXdlYnNpdGUmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9c3RhbmRhbG9uZSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN5QztBQUN0SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL25lZWRsZWt2bHQtd2Vic2l0ZS8/MDQxNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvc2szdGNoL0RvY3VtZW50cy9HaXRIdWIvbmVlZGxla3ZsdC13ZWJzaXRlL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJzdGFuZGFsb25lXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3NrM3RjaC9Eb2N1bWVudHMvR2l0SHViL25lZWRsZWt2bHQtd2Vic2l0ZS9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=%2FUsers%2Fsk3tch%2FDocuments%2FGitHub%2Fneedlekvlt-website%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsk3tch%2FDocuments%2FGitHub%2Fneedlekvlt-website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.js":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/discord */ \"(rsc)/./node_modules/next-auth/providers/discord.js\");\n/* harmony import */ var _lib_discord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/discord */ \"(rsc)/./src/lib/discord.js\");\n\n\n\n// ═══════════════════════════════════════════════\n// NextAuth Configuration\n// ═══════════════════════════════════════════════\n// Discord OAuth2 with automatic role verification.\n// After login, we check the user's guild roles to determine\n// if they can access gated content (courses).\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.DISCORD_CLIENT_ID,\n            clientSecret: process.env.DISCORD_CLIENT_SECRET,\n            authorization: {\n                params: {\n                    scope: \"identify guilds guilds.members.read\"\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, account, profile }) {\n            // On initial sign in, check guild membership + roles\n            if (account && profile) {\n                token.discordId = profile.id;\n                token.username = profile.username;\n                token.avatar = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null;\n                // Check roles via bot\n                try {\n                    const roleCheck = await (0,_lib_discord__WEBPACK_IMPORTED_MODULE_2__.hasRequiredRole)(profile.id);\n                    token.isMember = roleCheck.isMember;\n                    token.hasRequiredRole = roleCheck.hasRole;\n                    token.discordNick = roleCheck.nick;\n                } catch (error) {\n                    console.error(\"Role check failed:\", error);\n                    token.isMember = false;\n                    token.hasRequiredRole = false;\n                }\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            session.user.discordId = token.discordId;\n            session.user.username = token.username;\n            session.user.avatar = token.avatar;\n            session.user.isMember = token.isMember;\n            session.user.hasRequiredRole = token.hasRequiredRole;\n            session.user.discordNick = token.discordNick;\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/courses\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 7 * 24 * 60 * 60\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFpQztBQUN5QjtBQUNWO0FBRWhELGtEQUFrRDtBQUNsRCx5QkFBeUI7QUFDekIsa0RBQWtEO0FBQ2xELG1EQUFtRDtBQUNuRCw0REFBNEQ7QUFDNUQsOENBQThDO0FBRXZDLE1BQU1HLGNBQWM7SUFDekJDLFdBQVc7UUFDVEgsdUVBQWVBLENBQUM7WUFDZEksVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxpQkFBaUI7WUFDdkNDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0cscUJBQXFCO1lBQy9DQyxlQUFlO2dCQUNiQyxRQUFRO29CQUNOQyxPQUFPO2dCQUNUO1lBQ0Y7UUFDRjtLQUNEO0lBRURDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRUMsT0FBTyxFQUFFQyxPQUFPLEVBQUU7WUFDbkMscURBQXFEO1lBQ3JELElBQUlELFdBQVdDLFNBQVM7Z0JBQ3RCRixNQUFNRyxTQUFTLEdBQUdELFFBQVFFLEVBQUU7Z0JBQzVCSixNQUFNSyxRQUFRLEdBQUdILFFBQVFHLFFBQVE7Z0JBQ2pDTCxNQUFNTSxNQUFNLEdBQUdKLFFBQVFJLE1BQU0sR0FDekIsQ0FBQyxtQ0FBbUMsRUFBRUosUUFBUUUsRUFBRSxDQUFDLENBQUMsRUFBRUYsUUFBUUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUN4RTtnQkFFSixzQkFBc0I7Z0JBQ3RCLElBQUk7b0JBQ0YsTUFBTUMsWUFBWSxNQUFNckIsNkRBQWVBLENBQUNnQixRQUFRRSxFQUFFO29CQUNsREosTUFBTVEsUUFBUSxHQUFHRCxVQUFVQyxRQUFRO29CQUNuQ1IsTUFBTWQsZUFBZSxHQUFHcUIsVUFBVUUsT0FBTztvQkFDekNULE1BQU1VLFdBQVcsR0FBR0gsVUFBVUksSUFBSTtnQkFDcEMsRUFBRSxPQUFPQyxPQUFPO29CQUNkQyxRQUFRRCxLQUFLLENBQUMsc0JBQXNCQTtvQkFDcENaLE1BQU1RLFFBQVEsR0FBRztvQkFDakJSLE1BQU1kLGVBQWUsR0FBRztnQkFDMUI7WUFDRjtZQUVBLE9BQU9jO1FBQ1Q7UUFFQSxNQUFNYyxTQUFRLEVBQUVBLE9BQU8sRUFBRWQsS0FBSyxFQUFFO1lBQzlCYyxRQUFRQyxJQUFJLENBQUNaLFNBQVMsR0FBR0gsTUFBTUcsU0FBUztZQUN4Q1csUUFBUUMsSUFBSSxDQUFDVixRQUFRLEdBQUdMLE1BQU1LLFFBQVE7WUFDdENTLFFBQVFDLElBQUksQ0FBQ1QsTUFBTSxHQUFHTixNQUFNTSxNQUFNO1lBQ2xDUSxRQUFRQyxJQUFJLENBQUNQLFFBQVEsR0FBR1IsTUFBTVEsUUFBUTtZQUN0Q00sUUFBUUMsSUFBSSxDQUFDN0IsZUFBZSxHQUFHYyxNQUFNZCxlQUFlO1lBQ3BENEIsUUFBUUMsSUFBSSxDQUFDTCxXQUFXLEdBQUdWLE1BQU1VLFdBQVc7WUFDNUMsT0FBT0k7UUFDVDtJQUNGO0lBRUFFLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBRUFILFNBQVM7UUFDUEksVUFBVTtRQUNWQyxRQUFRLElBQUksS0FBSyxLQUFLO0lBQ3hCO0FBQ0YsRUFBRTtBQUVGLE1BQU1DLFVBQVVwQyxnREFBUUEsQ0FBQ0c7QUFFa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZWVkbGVrdmx0LXdlYnNpdGUvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanM/MjMyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCBEaXNjb3JkUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9kaXNjb3JkJztcbmltcG9ydCB7IGhhc1JlcXVpcmVkUm9sZSB9IGZyb20gJ0AvbGliL2Rpc2NvcmQnO1xuXG4vLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcbi8vIE5leHRBdXRoIENvbmZpZ3VyYXRpb25cbi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxuLy8gRGlzY29yZCBPQXV0aDIgd2l0aCBhdXRvbWF0aWMgcm9sZSB2ZXJpZmljYXRpb24uXG4vLyBBZnRlciBsb2dpbiwgd2UgY2hlY2sgdGhlIHVzZXIncyBndWlsZCByb2xlcyB0byBkZXRlcm1pbmVcbi8vIGlmIHRoZXkgY2FuIGFjY2VzcyBnYXRlZCBjb250ZW50IChjb3Vyc2VzKS5cblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zID0ge1xuICBwcm92aWRlcnM6IFtcbiAgICBEaXNjb3JkUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkRJU0NPUkRfQ0xJRU5UX0lELFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5ESVNDT1JEX0NMSUVOVF9TRUNSRVQsXG4gICAgICBhdXRob3JpemF0aW9uOiB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHNjb3BlOiAnaWRlbnRpZnkgZ3VpbGRzIGd1aWxkcy5tZW1iZXJzLnJlYWQnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcblxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgYWNjb3VudCwgcHJvZmlsZSB9KSB7XG4gICAgICAvLyBPbiBpbml0aWFsIHNpZ24gaW4sIGNoZWNrIGd1aWxkIG1lbWJlcnNoaXAgKyByb2xlc1xuICAgICAgaWYgKGFjY291bnQgJiYgcHJvZmlsZSkge1xuICAgICAgICB0b2tlbi5kaXNjb3JkSWQgPSBwcm9maWxlLmlkO1xuICAgICAgICB0b2tlbi51c2VybmFtZSA9IHByb2ZpbGUudXNlcm5hbWU7XG4gICAgICAgIHRva2VuLmF2YXRhciA9IHByb2ZpbGUuYXZhdGFyXG4gICAgICAgICAgPyBgaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXZhdGFycy8ke3Byb2ZpbGUuaWR9LyR7cHJvZmlsZS5hdmF0YXJ9LnBuZ2BcbiAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgLy8gQ2hlY2sgcm9sZXMgdmlhIGJvdFxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJvbGVDaGVjayA9IGF3YWl0IGhhc1JlcXVpcmVkUm9sZShwcm9maWxlLmlkKTtcbiAgICAgICAgICB0b2tlbi5pc01lbWJlciA9IHJvbGVDaGVjay5pc01lbWJlcjtcbiAgICAgICAgICB0b2tlbi5oYXNSZXF1aXJlZFJvbGUgPSByb2xlQ2hlY2suaGFzUm9sZTtcbiAgICAgICAgICB0b2tlbi5kaXNjb3JkTmljayA9IHJvbGVDaGVjay5uaWNrO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1JvbGUgY2hlY2sgZmFpbGVkOicsIGVycm9yKTtcbiAgICAgICAgICB0b2tlbi5pc01lbWJlciA9IGZhbHNlO1xuICAgICAgICAgIHRva2VuLmhhc1JlcXVpcmVkUm9sZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIHNlc3Npb24udXNlci5kaXNjb3JkSWQgPSB0b2tlbi5kaXNjb3JkSWQ7XG4gICAgICBzZXNzaW9uLnVzZXIudXNlcm5hbWUgPSB0b2tlbi51c2VybmFtZTtcbiAgICAgIHNlc3Npb24udXNlci5hdmF0YXIgPSB0b2tlbi5hdmF0YXI7XG4gICAgICBzZXNzaW9uLnVzZXIuaXNNZW1iZXIgPSB0b2tlbi5pc01lbWJlcjtcbiAgICAgIHNlc3Npb24udXNlci5oYXNSZXF1aXJlZFJvbGUgPSB0b2tlbi5oYXNSZXF1aXJlZFJvbGU7XG4gICAgICBzZXNzaW9uLnVzZXIuZGlzY29yZE5pY2sgPSB0b2tlbi5kaXNjb3JkTmljaztcbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gIH0sXG5cbiAgcGFnZXM6IHtcbiAgICBzaWduSW46ICcvY291cnNlcycsIC8vIFJlZGlyZWN0IHRvIGNvdXJzZXMgcGFnZSBmb3IgbG9naW5cbiAgfSxcblxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxuICAgIG1heEFnZTogNyAqIDI0ICogNjAgKiA2MCwgLy8gNyBkYXlzXG4gIH0sXG59O1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJEaXNjb3JkUHJvdmlkZXIiLCJoYXNSZXF1aXJlZFJvbGUiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkRJU0NPUkRfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiRElTQ09SRF9DTElFTlRfU0VDUkVUIiwiYXV0aG9yaXphdGlvbiIsInBhcmFtcyIsInNjb3BlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJhY2NvdW50IiwicHJvZmlsZSIsImRpc2NvcmRJZCIsImlkIiwidXNlcm5hbWUiLCJhdmF0YXIiLCJyb2xlQ2hlY2siLCJpc01lbWJlciIsImhhc1JvbGUiLCJkaXNjb3JkTmljayIsIm5pY2siLCJlcnJvciIsImNvbnNvbGUiLCJzZXNzaW9uIiwidXNlciIsInBhZ2VzIiwic2lnbkluIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./src/lib/discord.js":
/*!****************************!*\
  !*** ./src/lib/discord.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   exchangeCode: () => (/* binding */ exchangeCode),\n/* harmony export */   getDiscordAuthUrl: () => (/* binding */ getDiscordAuthUrl),\n/* harmony export */   getDiscordUser: () => (/* binding */ getDiscordUser),\n/* harmony export */   getGuildMember: () => (/* binding */ getGuildMember),\n/* harmony export */   hasRequiredRole: () => (/* binding */ hasRequiredRole)\n/* harmony export */ });\n// ═══════════════════════════════════════════════\n// Discord OAuth2 + Role Verification\n// ═══════════════════════════════════════════════\n// Handles Discord login flow and guild role checking.\n// Used to gate the Courses page behind Discord membership.\nconst DISCORD_API = \"https://discord.com/api/v10\";\n// ── Get OAuth2 Authorization URL ────────────\nfunction getDiscordAuthUrl() {\n    const params = new URLSearchParams({\n        client_id: process.env.DISCORD_CLIENT_ID,\n        redirect_uri: `${\"http://localhost:3000\"}/api/auth/discord/callback`,\n        response_type: \"code\",\n        scope: \"identify guilds guilds.members.read\"\n    });\n    return `https://discord.com/oauth2/authorize?${params}`;\n}\n// ── Exchange Code for Token ─────────────────\nasync function exchangeCode(code) {\n    const res = await fetch(`${DISCORD_API}/oauth2/token`, {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/x-www-form-urlencoded\"\n        },\n        body: new URLSearchParams({\n            client_id: process.env.DISCORD_CLIENT_ID,\n            client_secret: process.env.DISCORD_CLIENT_SECRET,\n            grant_type: \"authorization_code\",\n            code,\n            redirect_uri: `${\"http://localhost:3000\"}/api/auth/discord/callback`\n        })\n    });\n    if (!res.ok) throw new Error(\"Failed to exchange Discord code\");\n    return res.json();\n}\n// ── Get Discord User ────────────────────────\nasync function getDiscordUser(accessToken) {\n    const res = await fetch(`${DISCORD_API}/users/@me`, {\n        headers: {\n            Authorization: `Bearer ${accessToken}`\n        }\n    });\n    if (!res.ok) throw new Error(\"Failed to fetch Discord user\");\n    return res.json();\n}\n// ── Check Guild Membership via Bot ──────────\n// Uses your bot token to check if user is in your server\n// and what roles they have.\nasync function getGuildMember(userId) {\n    const guildId = process.env.DISCORD_GUILD_ID;\n    const res = await fetch(`${DISCORD_API}/guilds/${guildId}/members/${userId}`, {\n        headers: {\n            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`\n        }\n    });\n    if (res.status === 404) return null; // Not in guild\n    if (!res.ok) throw new Error(\"Failed to check guild membership\");\n    return res.json();\n}\n// ── Verify Required Role ────────────────────\nasync function hasRequiredRole(userId) {\n    const member = await getGuildMember(userId);\n    if (!member) return {\n        isMember: false,\n        hasRole: false\n    };\n    const requiredRoleId = process.env.DISCORD_REQUIRED_ROLE_ID;\n    const hasRole = member.roles.includes(requiredRoleId);\n    return {\n        isMember: true,\n        hasRole,\n        roles: member.roles,\n        nick: member.nick\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2Rpc2NvcmQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxrREFBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLGtEQUFrRDtBQUNsRCxzREFBc0Q7QUFDdEQsMkRBQTJEO0FBRTNELE1BQU1BLGNBQWM7QUFFcEIsK0NBQStDO0FBQ3hDLFNBQVNDO0lBQ2QsTUFBTUMsU0FBUyxJQUFJQyxnQkFBZ0I7UUFDakNDLFdBQVdDLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCO1FBQ3hDQyxjQUFjLENBQUMsRUFBRUgsdUJBQStCLENBQUMsMEJBQTBCLENBQUM7UUFDNUVLLGVBQWU7UUFDZkMsT0FBTztJQUNUO0lBQ0EsT0FBTyxDQUFDLHFDQUFxQyxFQUFFVCxPQUFPLENBQUM7QUFDekQ7QUFFQSwrQ0FBK0M7QUFDeEMsZUFBZVUsYUFBYUMsSUFBSTtJQUNyQyxNQUFNQyxNQUFNLE1BQU1DLE1BQU0sQ0FBQyxFQUFFZixZQUFZLGFBQWEsQ0FBQyxFQUFFO1FBQ3JEZ0IsUUFBUTtRQUNSQyxTQUFTO1lBQUUsZ0JBQWdCO1FBQW9DO1FBQy9EQyxNQUFNLElBQUlmLGdCQUFnQjtZQUN4QkMsV0FBV0MsUUFBUUMsR0FBRyxDQUFDQyxpQkFBaUI7WUFDeENZLGVBQWVkLFFBQVFDLEdBQUcsQ0FBQ2MscUJBQXFCO1lBQ2hEQyxZQUFZO1lBQ1pSO1lBQ0FMLGNBQWMsQ0FBQyxFQUFFSCx1QkFBK0IsQ0FBQywwQkFBMEIsQ0FBQztRQUM5RTtJQUNGO0lBRUEsSUFBSSxDQUFDUyxJQUFJUSxFQUFFLEVBQUUsTUFBTSxJQUFJQyxNQUFNO0lBQzdCLE9BQU9ULElBQUlVLElBQUk7QUFDakI7QUFFQSwrQ0FBK0M7QUFDeEMsZUFBZUMsZUFBZUMsV0FBVztJQUM5QyxNQUFNWixNQUFNLE1BQU1DLE1BQU0sQ0FBQyxFQUFFZixZQUFZLFVBQVUsQ0FBQyxFQUFFO1FBQ2xEaUIsU0FBUztZQUFFVSxlQUFlLENBQUMsT0FBTyxFQUFFRCxZQUFZLENBQUM7UUFBQztJQUNwRDtJQUVBLElBQUksQ0FBQ1osSUFBSVEsRUFBRSxFQUFFLE1BQU0sSUFBSUMsTUFBTTtJQUM3QixPQUFPVCxJQUFJVSxJQUFJO0FBQ2pCO0FBRUEsK0NBQStDO0FBQy9DLHlEQUF5RDtBQUN6RCw0QkFBNEI7QUFDckIsZUFBZUksZUFBZUMsTUFBTTtJQUN6QyxNQUFNQyxVQUFVekIsUUFBUUMsR0FBRyxDQUFDeUIsZ0JBQWdCO0lBQzVDLE1BQU1qQixNQUFNLE1BQU1DLE1BQU0sQ0FBQyxFQUFFZixZQUFZLFFBQVEsRUFBRThCLFFBQVEsU0FBUyxFQUFFRCxPQUFPLENBQUMsRUFBRTtRQUM1RVosU0FBUztZQUFFVSxlQUFlLENBQUMsSUFBSSxFQUFFdEIsUUFBUUMsR0FBRyxDQUFDMEIsaUJBQWlCLENBQUMsQ0FBQztRQUFDO0lBQ25FO0lBRUEsSUFBSWxCLElBQUltQixNQUFNLEtBQUssS0FBSyxPQUFPLE1BQU0sZUFBZTtJQUNwRCxJQUFJLENBQUNuQixJQUFJUSxFQUFFLEVBQUUsTUFBTSxJQUFJQyxNQUFNO0lBQzdCLE9BQU9ULElBQUlVLElBQUk7QUFDakI7QUFFQSwrQ0FBK0M7QUFDeEMsZUFBZVUsZ0JBQWdCTCxNQUFNO0lBQzFDLE1BQU1NLFNBQVMsTUFBTVAsZUFBZUM7SUFDcEMsSUFBSSxDQUFDTSxRQUFRLE9BQU87UUFBRUMsVUFBVTtRQUFPQyxTQUFTO0lBQU07SUFFdEQsTUFBTUMsaUJBQWlCakMsUUFBUUMsR0FBRyxDQUFDaUMsd0JBQXdCO0lBQzNELE1BQU1GLFVBQVVGLE9BQU9LLEtBQUssQ0FBQ0MsUUFBUSxDQUFDSDtJQUV0QyxPQUFPO1FBQ0xGLFVBQVU7UUFDVkM7UUFDQUcsT0FBT0wsT0FBT0ssS0FBSztRQUNuQkUsTUFBTVAsT0FBT08sSUFBSTtJQUNuQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmVlZGxla3ZsdC13ZWJzaXRlLy4vc3JjL2xpYi9kaXNjb3JkLmpzPzQyZTYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXG4vLyBEaXNjb3JkIE9BdXRoMiArIFJvbGUgVmVyaWZpY2F0aW9uXG4vLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcbi8vIEhhbmRsZXMgRGlzY29yZCBsb2dpbiBmbG93IGFuZCBndWlsZCByb2xlIGNoZWNraW5nLlxuLy8gVXNlZCB0byBnYXRlIHRoZSBDb3Vyc2VzIHBhZ2UgYmVoaW5kIERpc2NvcmQgbWVtYmVyc2hpcC5cblxuY29uc3QgRElTQ09SRF9BUEkgPSAnaHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvdjEwJztcblxuLy8g4pSA4pSAIEdldCBPQXV0aDIgQXV0aG9yaXphdGlvbiBVUkwg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzY29yZEF1dGhVcmwoKSB7XG4gIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgIGNsaWVudF9pZDogcHJvY2Vzcy5lbnYuRElTQ09SRF9DTElFTlRfSUQsXG4gICAgcmVkaXJlY3RfdXJpOiBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUFBfVVJMfS9hcGkvYXV0aC9kaXNjb3JkL2NhbGxiYWNrYCxcbiAgICByZXNwb25zZV90eXBlOiAnY29kZScsXG4gICAgc2NvcGU6ICdpZGVudGlmeSBndWlsZHMgZ3VpbGRzLm1lbWJlcnMucmVhZCcsXG4gIH0pO1xuICByZXR1cm4gYGh0dHBzOi8vZGlzY29yZC5jb20vb2F1dGgyL2F1dGhvcml6ZT8ke3BhcmFtc31gO1xufVxuXG4vLyDilIDilIAgRXhjaGFuZ2UgQ29kZSBmb3IgVG9rZW4g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhjaGFuZ2VDb2RlKGNvZGUpIHtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7RElTQ09SRF9BUEl9L29hdXRoMi90b2tlbmAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9LFxuICAgIGJvZHk6IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgY2xpZW50X2lkOiBwcm9jZXNzLmVudi5ESVNDT1JEX0NMSUVOVF9JRCxcbiAgICAgIGNsaWVudF9zZWNyZXQ6IHByb2Nlc3MuZW52LkRJU0NPUkRfQ0xJRU5UX1NFQ1JFVCxcbiAgICAgIGdyYW50X3R5cGU6ICdhdXRob3JpemF0aW9uX2NvZGUnLFxuICAgICAgY29kZSxcbiAgICAgIHJlZGlyZWN0X3VyaTogYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBQX1VSTH0vYXBpL2F1dGgvZGlzY29yZC9jYWxsYmFja2AsXG4gICAgfSksXG4gIH0pO1xuXG4gIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBleGNoYW5nZSBEaXNjb3JkIGNvZGUnKTtcbiAgcmV0dXJuIHJlcy5qc29uKCk7XG59XG5cbi8vIOKUgOKUgCBHZXQgRGlzY29yZCBVc2VyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERpc2NvcmRVc2VyKGFjY2Vzc1Rva2VuKSB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0RJU0NPUkRfQVBJfS91c2Vycy9AbWVgLCB7XG4gICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCB9LFxuICB9KTtcblxuICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggRGlzY29yZCB1c2VyJyk7XG4gIHJldHVybiByZXMuanNvbigpO1xufVxuXG4vLyDilIDilIAgQ2hlY2sgR3VpbGQgTWVtYmVyc2hpcCB2aWEgQm90IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gVXNlcyB5b3VyIGJvdCB0b2tlbiB0byBjaGVjayBpZiB1c2VyIGlzIGluIHlvdXIgc2VydmVyXG4vLyBhbmQgd2hhdCByb2xlcyB0aGV5IGhhdmUuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0R3VpbGRNZW1iZXIodXNlcklkKSB7XG4gIGNvbnN0IGd1aWxkSWQgPSBwcm9jZXNzLmVudi5ESVNDT1JEX0dVSUxEX0lEO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtESVNDT1JEX0FQSX0vZ3VpbGRzLyR7Z3VpbGRJZH0vbWVtYmVycy8ke3VzZXJJZH1gLCB7XG4gICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBgQm90ICR7cHJvY2Vzcy5lbnYuRElTQ09SRF9CT1RfVE9LRU59YCB9LFxuICB9KTtcblxuICBpZiAocmVzLnN0YXR1cyA9PT0gNDA0KSByZXR1cm4gbnVsbDsgLy8gTm90IGluIGd1aWxkXG4gIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBjaGVjayBndWlsZCBtZW1iZXJzaGlwJyk7XG4gIHJldHVybiByZXMuanNvbigpO1xufVxuXG4vLyDilIDilIAgVmVyaWZ5IFJlcXVpcmVkIFJvbGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFzUmVxdWlyZWRSb2xlKHVzZXJJZCkge1xuICBjb25zdCBtZW1iZXIgPSBhd2FpdCBnZXRHdWlsZE1lbWJlcih1c2VySWQpO1xuICBpZiAoIW1lbWJlcikgcmV0dXJuIHsgaXNNZW1iZXI6IGZhbHNlLCBoYXNSb2xlOiBmYWxzZSB9O1xuXG4gIGNvbnN0IHJlcXVpcmVkUm9sZUlkID0gcHJvY2Vzcy5lbnYuRElTQ09SRF9SRVFVSVJFRF9ST0xFX0lEO1xuICBjb25zdCBoYXNSb2xlID0gbWVtYmVyLnJvbGVzLmluY2x1ZGVzKHJlcXVpcmVkUm9sZUlkKTtcblxuICByZXR1cm4ge1xuICAgIGlzTWVtYmVyOiB0cnVlLFxuICAgIGhhc1JvbGUsXG4gICAgcm9sZXM6IG1lbWJlci5yb2xlcyxcbiAgICBuaWNrOiBtZW1iZXIubmljayxcbiAgfTtcbn1cbiJdLCJuYW1lcyI6WyJESVNDT1JEX0FQSSIsImdldERpc2NvcmRBdXRoVXJsIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiY2xpZW50X2lkIiwicHJvY2VzcyIsImVudiIsIkRJU0NPUkRfQ0xJRU5UX0lEIiwicmVkaXJlY3RfdXJpIiwiTkVYVF9QVUJMSUNfQVBQX1VSTCIsInJlc3BvbnNlX3R5cGUiLCJzY29wZSIsImV4Y2hhbmdlQ29kZSIsImNvZGUiLCJyZXMiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiY2xpZW50X3NlY3JldCIsIkRJU0NPUkRfQ0xJRU5UX1NFQ1JFVCIsImdyYW50X3R5cGUiLCJvayIsIkVycm9yIiwianNvbiIsImdldERpc2NvcmRVc2VyIiwiYWNjZXNzVG9rZW4iLCJBdXRob3JpemF0aW9uIiwiZ2V0R3VpbGRNZW1iZXIiLCJ1c2VySWQiLCJndWlsZElkIiwiRElTQ09SRF9HVUlMRF9JRCIsIkRJU0NPUkRfQk9UX1RPS0VOIiwic3RhdHVzIiwiaGFzUmVxdWlyZWRSb2xlIiwibWVtYmVyIiwiaXNNZW1iZXIiLCJoYXNSb2xlIiwicmVxdWlyZWRSb2xlSWQiLCJESVNDT1JEX1JFUVVJUkVEX1JPTEVfSUQiLCJyb2xlcyIsImluY2x1ZGVzIiwibmljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/discord.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=%2FUsers%2Fsk3tch%2FDocuments%2FGitHub%2Fneedlekvlt-website%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsk3tch%2FDocuments%2FGitHub%2Fneedlekvlt-website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();