import { createRouter, createWebHistory } from 'vue-router';
import BooksPage from './pages/BooksPage.vue';
import AuthorsPage from './pages/AuthorsPage.vue';
import WelcomePage from './pages/WelcomePage.vue';
import MyBooksPage from './pages/MyBooksPage.vue';

const routes = [
  { path: '/library', component: BooksPage },
  { path: '/authors', component: AuthorsPage },
  { path: '/my-books', component: MyBooksPage },
  { path: '', component: WelcomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
