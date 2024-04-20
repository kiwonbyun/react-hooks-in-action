import { Suspense } from "react";
import { useQuery } from "react-query";

export default function Avatar({ src, alt, fallbackSrc, ...props }) {
  return (
    <div className="user-avatar">
      <Suspense fallback={<img src={fallbackSrc} alt="Fallback Avatar" />}>
        <Img src={src} alt={alt} {...props} />
      </Suspense>
    </div>
  );
}

function Img({ src, alt, ...props }) {
  const { data: imageObj } = useQuery(
    src,
    () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    },
    { suspense: true }
  );

  return <img src={imageObj?.src} alt={alt} {...props} />;
}
