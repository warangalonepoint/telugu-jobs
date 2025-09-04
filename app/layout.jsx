export const metadata = {
  title: "Telugu Jobs — AP & Telangana",
  description: "Latest jobs across Andhra Pradesh and Telangana."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Inter, system-ui, Arial", margin: 0 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
