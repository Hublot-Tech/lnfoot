import Link from "next/link";
import React from "react";

interface SectionTitleProps {
  title: string;
  pageRef?: string;
}
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  pageRef = "/",
}) => {
  return (
    <div className="section-title">
      <h3 className="header-2">{title}</h3>
      <kbd className="ghost-btn">
        <Link href={pageRef}>Voir Plus &gt;</Link>
      </kbd>
    </div>
  );
};
