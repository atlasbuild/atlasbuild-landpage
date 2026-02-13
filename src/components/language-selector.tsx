"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";
import { useHasMounted } from "@/hooks/use-has-mounted";

const languages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useHasMounted();

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    router.push(newPathname);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  if (!mounted) {
    return (
      <div className="glass inline-flex h-9 w-[140px] items-center gap-2 rounded-md px-3 text-sm">
        <Languages className="h-4 w-4" />
        <span>
          {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="glass w-[140px]">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <SelectValue>
            <span>
              {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
            </span>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent className="glass-strong">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
