import { createRouter, createWebHistory } from 'vue-router';
import BooksPage from './pages/BooksPage.vue';
import AuthorsPage from './pages/AuthorsPage.vue';
import WelcomePage from './pages/WelcomePage.vue';

const routes = [
  { path: '/library', component: BooksPage },
  { path: '/authors', component: AuthorsPage },
  { path: '/my-books', component: AuthorsPage },
  { path: '', component: WelcomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
