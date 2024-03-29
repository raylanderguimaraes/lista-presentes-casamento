import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function MainLayout({ children }) {
  return (
    <div className="  bg-custom-gradient min-h-screen">
      <Header />
      <div className="pt-14">{children}</div>
      <Footer />
    </div>
  );
}
