import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client";
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
