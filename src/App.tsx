import { Global, keyframes } from "@emotion/react"
import tw, { css, GlobalStyles } from "twin.macro"
import FiraCodeFont from "~/assets/FiraCode-Regular.woff2"
import logo from "~/assets/logo.svg"

const globalStyle = css`
	@font-face {
		font-family: Fira Code;
		src: local("Fira Code"), url(${FiraCodeFont}) format("woff2");
	}
	body {
		margin: 0;
		overflow: hidden;
		position: relative;
	}
	#root {
		${tw`h-screen relative bg-gray-900 overflow-hidden`}
		font-family: Roboto, 微軟正黑體, Microsoft JhengHei, Helvetica Neue, Helvetica, Arial, PingFang TC, 黑體-繁,
				Heiti TC, 蘋果儷中黑, Apple LiGothic Medium, sans-serif;
	}
	#modal-root {
		${tw`absolute left-0 right-0 top-0`}
		bottom: 100%;
	}
`

const spin = keyframes`
	to {
		transform: rotate(360deg);
	}
`

export default function App() {
	return (
		<>
			<GlobalStyles />
			<Global styles={globalStyle} />
			<div tw="h-full grid place-items-center">
				<header tw="flex-auto flex flex-col items-center justify-center font-size[calc(10px + 2vmin)]">
					<img
						src={logo}
						alt="logo"
						tw="pointer-events-none"
						css={css`
							height: 40vmin;
							animation: ${spin} 60s linear infinite;
						`}
					/>
					<code tw="text-indigo-400">Bundle with rollup.js</code>
					<a
						href="https://reactjs.org"
						rel="noopener noreferrer"
						tw="transition py-3 color[#3289a1] hover:(color[#02dddd])"
					>
						Learn React
					</a>
				</header>
			</div>
		</>
	)
}
