import "twin.macro"
import styledComponent from "@emotion/styled"
import { css as cssProperty } from "@emotion/react"

declare module "twin.macro" {
	const css: typeof cssProperty
	const styled: typeof styledComponent
}

declare module "react" {
	interface DOMAttributes {
		/**
		 * short css prop
		 *
		 * **twin.macro**
		 */
		cs?: string

		/**
		 * tw prop
		 *
		 * **twin.macro**
		 */
		tw?: string
	}
}

declare global {
	namespace JSX {
		interface IntrinsicAttributes {
			/**
			 * tw prop
			 *
			 * **twin.macro**
			 */
			tw?: string

			/**
			 * short css prop
			 *
			 * **twin.macro**
			 */
			cs?: string
		}
	}
}
