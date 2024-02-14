export function CopySimbol() {
  return <div className="text-xl">&copy;</div>;
}
export default function Footer() {
  return (
    <div className=" flex items-center py-2 justify-center font-playFair">
      <CopySimbol />
      <h2>
        Desenvolvido por{" "}
        <a href="https://www.instagram.com/ray_prog/" target="_blank">
          Raylander Guimarães, 2024
        </a>
      </h2>
    </div>
  );
}
