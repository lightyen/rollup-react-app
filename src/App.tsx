import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"
import tw from "twin.macro"

import logo from "~/assets/logo.svg"
import FiraCodeFont from "~/assets/FiraCode-Regular.woff2"

import "tailwindcss/dist/base.css"

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

const Home = styled.div`
	height: 100%;
	display: grid;
	place-items: center;
`

const Header = styled.header`
	font-size: calc(10px + 2vmin);
	${tw`flex-auto flex flex-col items-center justify-center`}
`

const Logo = styled.img`
	height: 40vmin;
	animation: ${spin} 60s linear infinite;
	${tw`pointer-events-none`}
`

const Code = styled.code`
	${tw`text-indigo-500`}
`

const HomeLink = styled.a`
	transition: color 200ms ease;
	${tw`no-underline py-3`}
	:focus,:hover {
		color: #02dddd;
		${tw`underline`}
	}
	color: #3289a1;
`

export default () => {
	return (
		<React.StrictMode>
			<Global styles={globalStyle} />
			<Home>
				<Header>
					<Logo src={logo} alt="logo" />
					<Code>Bundle with rollup.js</Code>
					<HomeLink href="https://reactjs.org" rel="noopener noreferrer">
						Learn React
					</HomeLink>
				</Header>
			</Home>
		</React.StrictMode>
	)
}
