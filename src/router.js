import { createRouter, createWebHistory } from 'vue-router';
import BooksPage from './pages/BooksPage.vue';
import AuthorsPage from './pages/AuthorsPage.vue';

const routes = [
  { path: '/library', component: BooksPage },
  { path: '/authors', component: AuthorsPage },
  { path: '/my-books', component: AuthorsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
