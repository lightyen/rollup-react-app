import babel from "@rollup/plugin-babel"
import commonjs from "rollup-plugin-commonjs-alternate"
import static_files from "rollup-plugin-static-files"
import { terser } from "rollup-plugin-terser"
import refresh from "rollup-plugin-react-refresh"
import tsPathsResolve from "rollup-plugin-ts-paths-resolve"
import replace from "@rollup/plugin-replace"
import json from "@rollup/plugin-json"
import yaml from "@rollup/plugin-yaml"
import image from "@rollup/plugin-image"
import url from "@rollup/plugin-url"
import clean from "rollup-plugin-cleaner"

let config = {
	input: "src/index.tsx",
	output: {
		dir: "build",
		format: "esm",
		sourcemap: true,
		entryFileNames: "[name].[hash].js",
		assetFileNames: "[name].[hash][extname]",
	},
	plugins: [
		clean({ targets: ["./build"] }),
		babel({
			babelHelpers: "runtime",
			extensions: [".js", ".jsx", ".ts", ".tsx"],
			exclude: "node_modules/**",
		}),
		commonjs({
			define: {
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			},
		}),
		tsPathsResolve(),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		  }),
		json(),
		yaml(),
		url({
			include: ["**/*.woff", "**/*.woff2", "**/*.ttf", "**/*.otf", "**/*.eot"],
			limit: 8192,
		}),
		image(),
	],
}

if (process.env.NODE_ENV === "production") {
	config.plugins = config.plugins.concat([
		static_files({
			include: ["./public"],
		}),
		terser(),
	])
} else {
	config.plugins = config.plugins.concat([refresh()])
}

export default config
