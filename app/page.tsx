import Home from "@/app/pages/Home";

export default function Page() {
  return (
    <>
      <link rel="preload" href="/images/macbook-poster.webp" as="image" type="image/webp" media="(min-width: 768px)" />
      <Home />
    </>
  );
}
