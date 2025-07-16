'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname (assuming /[locale]/... structure)
  const match = pathname.match(/^\/(\w+)(\/|$)/);
  const currentLocale = match ? match[1] : 'en';

  function changeLanguage(newLocale: string) {
    if (newLocale === currentLocale) return;
    // Replace the locale in the pathname
    const newPath = pathname.replace(/^\/(\w+)(\/|$)/, `/${newLocale}$2`);
    router.push(newPath);
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={() => changeLanguage('en')} disabled={currentLocale === 'en'}>
        English
      </button>
      <button
        onClick={() => changeLanguage('vi')}
        disabled={currentLocale === 'vi'}
        style={{ marginLeft: 8 }}>
        Vietnamese
      </button>
    </div>
  );
}
