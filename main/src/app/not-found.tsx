// not-found.tsx
import NotFoundContent from "./components/NotFoundContent";

export const metadata = {
  title: "404: Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
