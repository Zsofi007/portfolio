/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Shown on landing pages (e.g. "Alex's computer"). */
  readonly VITE_DEVELOPER_NAME?: string;
  readonly VITE_PREVIEW_SHOWCASE_URL?: string;
  readonly VITE_APP_SHOWCASE_URL?: string;
  readonly VITE_REPO_SHOWCASE_URL?: string;
  readonly VITE_PREVIEW_LAB_URL?: string;
  readonly VITE_APP_LAB_URL?: string;
  readonly VITE_REPO_LAB_URL?: string;
  readonly VITE_RESUME_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
