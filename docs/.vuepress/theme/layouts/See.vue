<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="pt-[20px] w-full sm:w-[var(--content-width)] my-0 mx-auto">
          <Icon icon="AppstoreTwotone" :iconSize="25" text="关于我" :textSize="20" class="dark:hover:text-[#fff] ml-[10px]" />
          <div class="w-full flex flex-wrap my-[10px]"></div>
          <BlogItem v-for="(item, index) in blogData" :page="item.info" :position="index % 2 == 0 ? 'left' : 'right'" :key="index" />
          <Pagination :pageTotal="pages.pageTotal" :pageNumber="pages.pageNumber" :pageSize="pages.pageSize" @click="getBack"> </Pagination>
        </div>
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogCategory } from 'vuepress-plugin-blog2/lib/client'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import BlogItem from '../components/Blog/BlogItem.vue'
import { useRandomColor } from '../utils/useColor'
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isMobile } from '../utils'
const categoryMap = useBlogCategory('category')
const route = useRoute()
const router = useRouter()
const pages = reactive({
  pageTotal: categoryMap.value.currentItems?.length || 0,
  pageNumber: 1,
  pageSize: 10
})
const blogData = computed(() => categoryMap.value.currentItems?.slice((pages.pageNumber - 1) * pages.pageSize, pages.pageNumber * pages.pageSize))
const getBack = (value: { page: number; pageSize: number }) => {
  const { page, pageSize } = value
  pages.pageNumber = page
  pages.pageSize = pageSize
}
watch(
  route,
  (newVal) => {
    if (newVal.path == '/category/') {
      const key = Object.keys(categoryMap.value.map)[0]
      router.push(categoryMap.value.map[key])
    }
  },
  { immediate: true }
)
</script>
<style scoped>
.router-link-exact-active {
  background: #3eaf7c;
}
</style>
