# Themes & Internationalization

Support for dark/light themes and multiple languages.

## Dark/Light Mode

### Usage

```typescript
import { useThemeStore } from './stores/themeStore';

const { theme, toggleTheme } = useThemeStore();

// Toggle theme
toggleTheme();

// Set specific theme
setTheme('dark'); // or 'light'
```

### Theme Store

```typescript
interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
```

### Persistence

Theme preference is saved to local storage and persists across sessions.

### Implementation

TailwindCSS dark mode classes are applied to the root element:

```typescript
useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [theme]);
```

### Styling

Use Tailwind's dark mode modifier:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

## Internationalization (i18n)

Worlder supports multiple languages using i18next.

### Supported Languages

- **English (en)** - Default
- **Bahasa Indonesia (id)**

### Usage

```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Translate text
<h1>{t('auth.login')}</h1>

// Change language
i18n.changeLanguage('id'); // or 'en'
```

### Translation Files

Located in `src/locales/`:

**en.json**
```json
{
  "auth": {
    "login": "Login",
    "register": "Register"
  }
}
```

**id.json**
```json
{
  "auth": {
    "login": "Masuk",
    "register": "Daftar"
  }
}
```

### Adding New Languages

1. Create `src/locales/[lang].json`
2. Add translations following the structure
3. Import in `src/i18n.ts`:

```typescript
import newLang from './locales/newLang.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id },
    newLang: { translation: newLang },
  },
});
```

### Language Persistence

Selected language is saved to local storage:

```typescript
const LANGUAGE_STORAGE_KEY = 'worlder_language';
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});
```

### Language Toggle Component

```typescript
const toggleLanguage = () => {
  const newLang = i18n.language === 'en' ? 'id' : 'en';
  i18n.changeLanguage(newLang);
};
```

## Best Practices

### Theme

- Always provide both light and dark variants
- Test components in both themes
- Use semantic color names

### i18n

- Keep translation keys organized
- Use descriptive key names
- Provide fallback text
- Test all languages
