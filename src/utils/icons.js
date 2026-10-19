import { createIcons, icons as lucideIcons } from 'lucide';

export const hydrateIcons = (root) => {
    createIcons({ root, icons: lucideIcons, attrs: { 'stroke-width': 2 } });
};
