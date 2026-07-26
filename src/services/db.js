import Dexie from 'dexie';

export const db = new Dexie('Biblia360DB');

db.version(1).stores({
  bible_translations: 'abbrev, name', // Primary key: abbrev
  harpa_hymns: 'number, title', // Primary key: number
  ebd_lessons: 'id, title' // Primary key: id
});

// Helper functions to manage quotas
export const checkBibleQuota = async () => {
  const count = await db.bible_translations.count();
  return count >= 2;
};

export const checkEbdQuota = async () => {
  const count = await db.ebd_lessons.count();
  return count >= 1;
};
