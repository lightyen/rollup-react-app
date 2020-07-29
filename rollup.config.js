// https://github.com/rollup/awesome
import json from "@rollup/plugin-json"
import yaml from "@rollup/plugin-yaml"
import image from "@rollup/plugin-image"
import url from "@rollup/plugin-url"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import alias from "@rollup/plugin-alias"

import postcss from "rollup-plugin-postcss"
import typescript from "typescript"
import ts from "rollup-plugin-ts"
import injectProcessEnv from "rollup-plugin-inject-process-env"
import html from "@rollup/plugin-html"
import progress from "rollup-plugin-progress"
import cleaner from "rollup-plugin-cleaner"
import path from "path"

// dev
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"

// prod
import copy from "rollup-plugin-copy"
import { terser } from "rollup-plugin-terser"
import visualizer from "rollup-plugin-visualizer"
import sizes from "rollup-plugin-sizes"

const cwd = process.cwd()
const isProd = process.env.NODE_ENV === "production"

const makeHtmlAttributes = attributes => {
	if (!attributes) {
		return ""
	}
	const keys = Object.keys(attributes)
	return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), "")
}

const template = ({ attributes, files, meta, publicPath, title }) => {
	const scripts = (files.js || [])
		.map(({ fileName }) => {
			const attrs = makeHtmlAttributes(attributes.script)
			return `<script src="${publicPath}${fileName}"${attrs}></script>`
		})
		.join("\n")

	const links = (files.css || [])
		.map(({ fileName }) => {
			const attrs = makeHtmlAttributes(attributes.link)
			return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`
		})
		.join("\n")

	const metas = meta
		.map(input => {
			const attrs = makeHtmlAttributes(input)
			return `<meta${attrs}>`
		})
		.join("\n")

	return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
	<title>${title}</title>
	<link rel="icon" href="/favicon.ico">
    ${links}
  </head>
  <body>
    <div id="root"></div>
    <div id="modal-root"></div>
    ${scripts}
  </body>
</html>`
}

export default {
	input: "src/index.tsx",
	output: {
		dir: path.resolve(cwd, "build"),
		format: "esm",
		sourcemap: true,
		entryFileNames: isProd ? "[name]-[hash].js" : "[name].js",
		plugins: isProd ? [terser()] : [],
	},
	plugins: [
		progress(),
		alias({
			entries: [{ find: /^~\/(.*)/, replacement: "./$1" }],
			customResolver: nodeResolve({
				browser: true,
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			}),
		}),
		nodeResolve({
			browser: true,
			extensions: [".js", ".jsx", ".ts", ".tsx"],
		}),
		commonjs(),
		json(),
		yaml(),
		postcss({
			extract: isProd,
			minimize: isProd,
			extensions: [".css"],
			config: { path: path.resolve(cwd, "postcss.config.js") },
		}),
		url({
			include: ["**/*.woff", "**/*.woff2", "**/*.ttf", "**/*.otf", "**/*.eot"],
			limit: 8192,
		}),
		image(),
		ts({
			typescript,
			transpiler: "babel",
			cwd: path.resolve(cwd, "src"),
			exclude: "node_modules/**",
		}),
		babel({
			babelHelpers: "runtime",
			skipPreflightCheck: true,
			extensions: [".js", ".jsx"],
			exclude: "node_modules/**",
		}),
		injectProcessEnv({
			NODE_ENV: process.env.NODE_ENV,
		}),
		html({
			template,
			title: "React App",
			attributes: {
				link: { name: "rel", content: "stylesheet" },
			},
			meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
		}),
		cleaner({ targets: [path.resolve(cwd, "build")] }),
		...(isProd
			? [
					sizes(),
					visualizer({ open: true, template: "treemap" }),
					copy({
						targets: [{ src: "src/assets/favicon.ico", dest: "build" }],
					}),
			  ]
			: [
					serve({
						open: true,
						historyApiFallback: true,
						contentBase: path.resolve(cwd, "build"),
						favicon: path.resolve(cwd, "src/assets/favicon.ico"),
					}),
					livereload({ delay: 2000 }),
			  ]),
	],
}