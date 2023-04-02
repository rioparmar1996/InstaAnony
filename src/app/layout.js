import "./globals.css";

export const metadata = {
	title: "InstaAnony",
	description: "InstaAnony for insta stories for ppl",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
