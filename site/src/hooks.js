import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useDocumentHead(title, description) {
  useEffect(() => {
    const suffix = "SmartMe";
    document.title = title ? `${title} — ${suffix}` : `${suffix} — Walking audiobooks for curious minds`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');

    if (description && metaDesc) metaDesc.setAttribute("content", description);
    if (title && ogTitle) ogTitle.setAttribute("content", title);
    if (description && ogDesc) ogDesc.setAttribute("content", description);
  }, [title, description]);
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
