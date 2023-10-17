import "/styles/globals.css";

// Components
import Nav from "/components/Nav";
import Provider from "/components/Provider";
export const metadata = {
  title: "Promot Duniya",
  discription:
    "Discover & Share the best Prompts. Save Time with PromotDuniya!",
};
const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>

        <Provider>
        <div className="main">
          <div className="gradient" />
          </div>
            <main className="app">
              <Nav />
                {children}
            </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
