import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import client from "../apollo/client";
import "../styles/globals.css";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider>
				<ColorModeScript initialColorMode={theme.config.initialColorModes} />
				<Component {...pageProps} />
			</ChakraProvider>
		</ApolloProvider>
	);
}

export default MyApp;
