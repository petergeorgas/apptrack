import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import client from "../apollo/client";
import "../styles/globals.css";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider>
				<Head>
					<title>apptrack</title>

					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />
					<meta property="og:title" content="apptrack" key="title" />
					<meta
						property="og:image"
						content="https://firebasestorage.googleapis.com/v0/b/application-tracker-5027c.appspot.com/o/og.svg?alt=media&token=fac22ee8-52c1-41ea-a4c0-ac5a443839c1"
					/>
					<meta property="og:site_name" content="apptrack" />
					<meta
						property="og:description"
						content="Track your job applications here."
					/>
				</Head>
				<ColorModeScript initialColorMode={theme.config.initialColorModes} />
				<Component {...pageProps} />
			</ChakraProvider>
		</ApolloProvider>
	);
}

export default MyApp;
